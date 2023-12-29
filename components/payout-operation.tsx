'use client';

import { useLogin, useTransaction } from '@useelven/core';
import { Button } from './ui/button';
import { TransactionPending } from './transaction-pending';
import { PleaseConnectYourWallet } from './connect-wallet';
import {
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';
import { useScAddressFromStorage } from '@/hooks/use-sc-address-from-storage';
import { getScErrorMessage } from '@/lib/get-sc-error';
import { TxPending } from '@/components/tx-pending';
import { useEffect, useRef } from 'react';
import { getParamFromUrl } from '@/lib/get-param-from-url';

const TX_ID = 'payoutTx';

export const PayoutOperation = () => {
  const { isLoggedIn, isLoggingIn } = useLogin();
  const { scAddress } = useScAddressFromStorage();
  const { triggerTx, pending, transaction, error, txResult } = useTransaction({
    id: TX_ID,
  });

  const payout = async () => {
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('payOut'))
      .build();

    triggerTx({
      address: scAddress,
      gasLimit: 14000000,
      data,
    });
  };

  const scErrorMessage = getScErrorMessage(txResult);

  const ref = useRef<HTMLDivElement>(null);

  // Scroll to the element when redirected from web wallet
  useEffect(() => {
    const isPayoutTx = getParamFromUrl('ongoingTx') === TX_ID;
    if (isPayoutTx && ref) {
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
        onClick={payout}
        className="mt-5 ml-3"
        disabled={!isLoggedIn || pending}
      >
        {pending ? <TxPending /> : 'Payout'}
      </Button>
      <TransactionPending transaction={transaction} pending={pending} />
      {(error || scErrorMessage) && (
        <div className="text-xs font-semibold text-destructive mt-3">
          {error || scErrorMessage}
        </div>
      )}
      {txResult?.hash && !scErrorMessage && !error && (
        <div>Success! Payout is done. The EGLDs are on your wallet.</div>
      )}
    </div>
  );
};
