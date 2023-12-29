'use client';

import {
  SCQueryType,
  useAccount,
  useConfig,
  useLoggingIn,
  useScQuery,
  useTransaction,
} from '@useelven/core';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useScAddressFromStorage } from '@/hooks/use-sc-address-from-storage';
import { FormEvent, useEffect, useState } from 'react';
import { SmartContractAddress } from '@/components/smart-contract-address';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { shortenHash } from '@/lib/shorten-hash';
import {
  Address,
  ContractCallPayloadBuilder,
  ContractFunction,
  TokenTransfer,
} from '@multiversx/sdk-core';
import { PleaseConnectYourWallet } from '@/components/connect-wallet';
import { getScErrorMessage } from '@/lib/get-sc-error';
import { getParamFromUrl } from '@/lib/get-param-from-url';
import { TxPending } from '@/components/tx-pending';

const CheckThePiggy = () => {
  const { address } = useAccount();
  const { scAddress } = useScAddressFromStorage();
  const { data, error } = useScQuery<string>({
    type: SCQueryType.NUMBER,
    payload: {
      scAddress,
      funcName: 'getLockTime',
      args: [new Address(address).hex()],
    },
    autoInit: Boolean(scAddress),
  });

  if (error) {
    return (
      <div className="text-xs font-semibold">
        Your smart contract looks broken. Check the smart contract or deploy a
        new one. Try again.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-xs font-semibold">
        You don&apos;t have a Piggy, create one first! The transaction will
        fail.
      </div>
    );
  }

  return null;
};

const TX_ID = 'depositTx';

const Content = () => {
  const { explorerAddress } = useConfig();
  const { scAddress } = useScAddressFromStorage();

  const { triggerTx, pending, transaction, error, txResult } = useTransaction({
    id: TX_ID,
  });
  const [amount, setAmount] = useState('');

  const deposit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (amount) {
      const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('addAmount'))
        .build();

      triggerTx({
        address: scAddress,
        gasLimit: 3_000_000,
        data,
        value: TokenTransfer.egldFromAmount(amount),
      });
    }
  };

  const txHash = transaction?.getHash().toString();

  const scErrorMessage = getScErrorMessage(txResult);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-1">Deposit EGLD</DialogTitle>
        <DialogDescription>
          Send and lock EGLD on your Piggy Bank smart contract.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="text-xs mb-6">
          <SmartContractAddress />
        </div>
        <Label className="mb-2 text-xs">Amount</Label>
        <form onSubmit={deposit} noValidate id="deposit-form">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Provide EGLD amount. 1 = 1 EGLD"
          />
        </form>
        <div className="text-xs">
          {txHash && (
            <div className="break-all font-semibold mt-3">
              Tx hash:{' '}
              <a
                href={`${explorerAddress}/transactions/${txHash}`}
                target="_blank"
                className="underline"
              >
                {shortenHash(txHash, 10)}
              </a>
            </div>
          )}
          {error ||
            (scErrorMessage && (
              <div className="font-semibold text-destructive mt-3">
                {error || scErrorMessage}
              </div>
            ))}
          {txResult?.hash && !error && !scErrorMessage && (
            <div className="font-semibold mt-3">
              Success! You&apos;ve send and locked EGLD!
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          form="deposit-form"
          disabled={
            pending || !amount || Boolean(txResult?.hash) || Boolean(error)
          }
        >
          {pending ? <TxPending /> : 'Deposit'}
        </Button>
      </DialogFooter>
    </>
  );
};

export const DepositOperation = () => {
  const { pending, loggedIn } = useLoggingIn();
  const [open, setOpen] = useState(false);

  // Handle dialog when back from web wallet
  useEffect(() => {
    const isDepositTx = getParamFromUrl('ongoingTx') === TX_ID;
    if (isDepositTx) {
      setOpen(true);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center mt-5">
        <PleaseConnectYourWallet isLoggedIn={loggedIn} isLoggingIn={pending} />
        <DialogTrigger asChild>
          <Button className="ml-3" disabled={pending || !loggedIn}>
            Deposit EGLD
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent forceMount className="sm:max-w-[425px]">
        <Content />
        <CheckThePiggy />
      </DialogContent>
    </Dialog>
  );
};
