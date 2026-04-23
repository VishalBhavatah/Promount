/**
 * Service to handle email notifications
 * 
 * INSTRUCTIONS FOR EMAIL SETUP:
 * For production, you should use Supabase Edge Functions, SendGrid, Resend, or a similar service.
 * 
 * Example with Supabase Edge Function:
 * 1. Create a function `supabase functions new send-contact-email`
 * 2. Deploy it `supabase functions deploy send-contact-email`
 * 3. Call it from here using `supabase.functions.invoke()`
 * 
 * For now, this service logs to console and returns a success promise to simulate behavior.
 */

export const sendContactEmail = async ({ firstName, lastName, email, phone, message }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real application, replace this with your actual email sending logic.
  // Example using fetch to a backend endpoint:
  /*
  const response = await fetch('https://your-api.com/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, phone, message, to: 'info@promountusa.com' })
  });
  
  if (!response.ok) throw new Error('Failed to send email');
  */

  const fullName = `${firstName} ${lastName}`.trim();

  console.log(`[Email Service] Sending email to info@promountusa.com`);
  console.log(`From: ${fullName} <${email}>`);
  console.log(`Phone: ${phone}`);
  console.log(`Message: ${message}`);

  return { success: true };
};