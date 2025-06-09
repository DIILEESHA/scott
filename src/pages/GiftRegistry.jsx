import React from 'react';
import GiftRegistry from '../components/GiftRegistry';

const GiftRegistryPage = () => {
  // In a real app, you'd get this from your auth system
  const userId = 'guest'; // or 'admin' for admin users
  
  return (
    <div>
      <GiftRegistry userId={userId} />
    </div>
  );
};

export default GiftRegistryPage;