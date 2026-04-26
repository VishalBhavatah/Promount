/**
 * Service to handle Zoho CRM Integration via API v8
 * Implements full OAuth2 flow with Token Management
 */

const ZOHO_CONFIG = {
  clientId: '1000.3F7B8LX1P0QFVYX61GY32NFUXPHHRI',
  clientSecret: '02c4d1a8b56df6ced2af200b9ae77cae9952178926',
  authUrl: 'https://accounts.zoho.com/oauth/v8/auth',
  tokenUrl: 'https://accounts.zoho.com/oauth/v8/token',
  scope: 'ZohoCRM.modules.ALL',
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '',
  // Initial default, usually updated by token response
  apiBaseUrl: 'https://www.zohoapis.com'
};

const STORAGE_KEY = 'zoho_crm_v8_tokens';

// --- Token Management ---

/**
 * Stores token data securely in localStorage with expiration calculation
 */
const storeTokens = (tokenData) => {
  try {
    const dataToStore = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token, // Crucial: Keep if provided
      api_domain: tokenData.api_domain || ZOHO_CONFIG.apiBaseUrl,
      token_type: tokenData.token_type,
      expires_in: tokenData.expires_in,
      // Calculate absolute expiration time (buffer of 60s for safety)
      expires_at: Date.now() + ((tokenData.expires_in - 60) * 1000)
    };
    
    // If we already have a refresh token and the new data doesn't have one (sometimes happens on refresh), keep the old one
    const existing = getStoredTokens();
    if (existing && existing.refresh_token && !dataToStore.refresh_token) {
      dataToStore.refresh_token = existing.refresh_token;
    }

    // Simple Base64 encoding for basic obfuscation
    const jsonStr = JSON.stringify(dataToStore);
    localStorage.setItem(STORAGE_KEY, btoa(jsonStr));
    return dataToStore;
  } catch (error) {
    console.error('Failed to store Zoho tokens:', error);
    return null;
  }
};

/**
 * Retrieves and decodes stored tokens
 */
const getStoredTokens = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(atob(stored));
  } catch (error) {
    console.error('Failed to retrieve Zoho tokens:', error);
    return null;
  }
};

// --- OAuth2 Flow Functions ---

/**
 * Generates the authorization URL for user login
 */
export const getAuthorizationUrl = () => {
  const params = new URLSearchParams({
    scope: ZOHO_CONFIG.scope,
    client_id: ZOHO_CONFIG.clientId,
    response_type: 'code',
    access_type: 'offline', // Essential for getting a refresh_token
    redirect_uri: ZOHO_CONFIG.redirectUri,
    prompt: 'consent'
  });
  return `${ZOHO_CONFIG.authUrl}?${params.toString()}`;
};

/**
 * Exchanges authorization code for access/refresh tokens
 * @param {string} code - The code received from Zoho redirect
 */
export const exchangeAuthCodeForToken = async (code) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: ZOHO_CONFIG.clientId,
    client_secret: ZOHO_CONFIG.clientSecret,
    redirect_uri: ZOHO_CONFIG.redirectUri,
    code: code
  });

  try {
    const response = await fetch(ZOHO_CONFIG.tokenUrl, {
      method: 'POST',
      body: params
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(`Zoho Auth Error: ${data.error}`);
    }

    return storeTokens(data);
  } catch (error) {
    console.error('Token exchange failed:', error);
    throw error;
  }
};

/**
 * Refreshes the access token using the stored refresh token
 */
export const refreshAccessToken = async () => {
  const tokens = getStoredTokens();
  if (!tokens || !tokens.refresh_token) {
    throw new Error('No refresh token available. Please authenticate via OAuth first.');
  }

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: ZOHO_CONFIG.clientId,
    client_secret: ZOHO_CONFIG.clientSecret,
    refresh_token: tokens.refresh_token
  });

  try {
    const response = await fetch(ZOHO_CONFIG.tokenUrl, {
      method: 'POST',
      body: params
    });

    const data = await response.json();

    if (data.error) {
      // If refresh token is invalid (e.g., revoked), we might need to clear storage
      if (data.error === 'invalid_token') {
        localStorage.removeItem(STORAGE_KEY);
      }
      throw new Error(`Token Refresh Error: ${data.error}`);
    }

    return storeTokens(data);
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};

/**
 * Gets a valid access token, refreshing if necessary
 */
const getValidAccessToken = async () => {
  const tokens = getStoredTokens();
  
  if (!tokens) {
    throw new Error('No authentication tokens found. Admin login required.');
  }

  // Check if expired
  if (Date.now() >= tokens.expires_at) {
    console.log('Zoho Token expired, refreshing...');
    const newTokens = await refreshAccessToken();
    return newTokens.access_token;
  }

  return tokens.access_token;
};

// --- CRM API Operations ---

/**
 * Creates a Lead in Zoho CRM
 * @param {Object} contactData - { firstName, lastName, email, phone, message }
 */
export const sendContactToZohoCRM = async (contactData) => {
  console.log(contactData);
  try {
    const accessToken = await getValidAccessToken();
    const tokens = getStoredTokens(); // Need this for api_domain
    const apiDomain = tokens?.api_domain || ZOHO_CONFIG.apiBaseUrl;

    // Zoho CRM API v8 Leads Endpoint
    const endpoint = `${apiDomain}/crm/v8/Leads`;

    const leadRecord = {
      Last_Name: contactData.lastName,
      First_Name: contactData.firstName,
      Email: contactData.email,
      Phone: contactData.phone,
      Description: contactData.message,
      Lead_Source: 'Web Contact Form',
      Status: 'New Lead'
    };

    const payload = {
      data: [leadRecord]
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    // Handle API-level errors
    if (!response.ok) {
      console.error('Zoho API Error Response:', result);
      throw new Error(result.message || 'Failed to create lead in Zoho CRM');
    }

    // Check specific Zoho success/error structure
    // success response: { data: [ { code: "SUCCESS", status: "success", ... } ] }
    if (result.data && result.data[0] && result.data[0].status === 'success') {
      return {
        success: true,
        id: result.data[0].details.id,
        message: 'Lead created successfully'
      };
    } else {
      console.warn('Zoho API Warning:', result);
      throw new Error('Lead creation returned unexpected status.');
    }

  } catch (error) {
    console.error('sendContactToZohoCRM Failed:', error);
    // Retrowing specifically to let the UI know it failed
    throw error;
  }
};