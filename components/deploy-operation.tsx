'use client';

import { useLogin, useScDeploy } from '@useelven/core';
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import { TransactionPending } from './transaction-pending';
import { SmartContractAddress } from './smart-contract-address';
import { PleaseConnectYourWallet } from './connect-wallet';
import { getScErrorMessage } from '@/lib/get-sc-error';
import { TxPending } from '@/components/tx-pending';
import { getParamFromUrl } from '@/lib/get-param-from-url';

const SC_SOURCE = process.env.NEXT_PUBLIC_PIGGY_BANK_SC_SOURCE;
const TX_ID = 'deployTx';

export const DeployOperation = () => {
  const { isLoggedIn, isLoggingIn } = useLogin();
  const { deploy, transaction, scAddress, pending, txResult, error } =
    useScDeploy({ id: TX_ID });

  const handleDeploy = async () => {
    if (!SC_SOURCE)
      throw new Error(
        'Set the Piggy Bank smart contract source in .env.local!'
      );

    deploy({
      source: SC_SOURCE,
    });
  };

  useEffect(() => {
    if (scAddress && txResult?.hash) {
      // For usage in following operations
      window.localStorage.setItem('piggyBankSmartContract', scAddress);
    }
  }, [scAddress, txResult?.hash]);

  const scErrorMessage = getScErrorMessage(txResult);

  const ref = useRef<HTMLDivElement>(null);

  // Scroll to the element when redirected from web wallet
  useEffect(() => {
    const isDeployTx = getParamFromUrl('ongoingTx') === TX_ID;
    if (isDeployTx && ref) {
      ref.current?.scrollIntoView();
    }
  }, []);

  return (
    <div className="text-sm" ref={ref}>
      <PleaseConnectYourWallet
        isLoggedIn={isLoggedIn}
        isLoggingIn={isLoggingIn}
      />
      <Button
        onClick={handleDeploy}
        className="mt-5 ml-3"
        disabled={!isLoggedIn || pending}
      >
        {pending ? <TxPending /> : 'Deploy Piggy Bank smart contract'}
      </Button>
      <TransactionPending transaction={transaction} pending={pending} />
      {(error || scErrorMessage) && (
        <div className="text-xs font-semibold text-destructive mt-3">
          {error || scErrorMessage}
        </div>
      )}
      {scAddress && txResult?.hash && !scErrorMessage && !error && (
        <SmartContractAddress />
      )}
    </div>
  );
};
