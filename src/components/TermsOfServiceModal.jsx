import React from 'react';

// The Terms of Service modal has been disabled as requested.
// This component now returns null to prevent it from rendering anywhere it might be imported,
// ensuring the modal is completely disabled globally. Users can still access the terms via the /terms page.
const TermsOfServiceModal = ({ isOpen, onClose }) => {
  return null;
};

export default TermsOfServiceModal;