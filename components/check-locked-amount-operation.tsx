'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  SCQueryType,
  useAccount,
  useLoggingIn,
  useScQuery,
} from '@useelven/core';
import { Button } from '@/components/ui/button';
import { useScAddressFromStorage } from '@/hooks/use-sc-address-from-storage';
import { Address, TokenTransfer } from '@multiversx/sdk-core';
import { SmartContractAddress } from '@/components/smart-contract-address';

export const GetLockedAmount = () => {
  const { address } = useAccount();
  const { scAddress } = useScAddressFromStorage();
  const { data, error } = useScQuery<string>({
    type: SCQueryType.NUMBER,
    payload: {
      scAddress,
      funcName: 'getLockedAmount',
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

  if (data === undefined) {
    return null;
  }

  return (
    <div className="text-xs font-semibold">
      Your locked amount is:
      <br />
      {TokenTransfer.egldFromBigInteger(data).toPrettyString()}
    </div>
  );
};

export const CheckLockedAmountOperation = () => {
  const { pending, loggedIn } = useLoggingIn();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="sm:mt-5" disabled={pending || !loggedIn}>
          Check locked amount
        </Button>
      </DialogTrigger>
      <DialogContent forceMount className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Check locked amount</DialogTitle>
          <DialogDescription>
            You are calling a smart contract and check the Piggy&apos;s
            deposited and locked amount on smart contract.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="text-xs mb-6">
            <SmartContractAddress />
          </div>
          <GetLockedAmount />
        </div>
      </DialogContent>
    </Dialog>
  );
};
