import { useEffect, useState } from 'react';

export const useScAddressFromStorage = () => {
  const [scAddress, setScAddress] = useState<string>();

  useEffect(() => {
    const scAddressFromStorage = window.localStorage.getItem(
      'piggyBankSmartContract'
    );
    if (scAddressFromStorage) {
      setScAddress(scAddressFromStorage);
    }
  }, []);

  return {
    scAddress,
  };
};
