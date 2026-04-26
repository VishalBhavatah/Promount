import React from 'react';

// The Privacy Policy modal has been disabled as requested.
// This component now returns null to prevent it from rendering anywhere it might be imported,
// ensuring the modal is completely disabled globally. Users can still access the privacy policy via the /privacy page.
const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  return null;
};

export default PrivacyPolicyModal;