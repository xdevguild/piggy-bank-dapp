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
import { fromUnixTime } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useScAddressFromStorage } from '@/hooks/use-sc-address-from-storage';
import { Address } from '@multiversx/sdk-core';
import { SmartContractAddress } from '@/components/smart-contract-address';
import { PleaseConnectYourWallet } from '@/components/connect-wallet';

export const GetLockTime = () => {
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

  const date = fromUnixTime(Number(data));
  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'medium',
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
        You don&apos;t have a Piggy, create one first!
      </div>
    );
  }

  return (
    <div className="text-xs font-semibold">
      You have locked your EGLD till:
      <br /> {formatter.format(date)}
    </div>
  );
};

export const CheckLockTimeOperation = () => {
  const { pending, loggedIn } = useLoggingIn();
  return (
    <Dialog>
      <div className="flex items-center mt-5 flex-col sm:flex-row">
        <PleaseConnectYourWallet isLoggedIn={loggedIn} isLoggingIn={pending} />
        <DialogTrigger asChild>
          <Button className="ml-3" disabled={pending || !loggedIn}>
            Check lock time
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent forceMount className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Check lock time</DialogTitle>
          <DialogDescription>
            You are calling a smart contract and check the Piggy&apos;s lock
            time saved in the storage.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="text-xs mb-6">
            <SmartContractAddress />
          </div>
          <GetLockTime />
        </div>
      </DialogContent>
    </Dialog>
  );
};
