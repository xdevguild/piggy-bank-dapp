'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ContractFunction,
  ContractCallPayloadBuilder,
  U64Value,
  Address,
} from '@multiversx/sdk-core';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { format, getUnixTime } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { SmartContractAddress } from './smart-contract-address';
import {
  SCQueryType,
  useAccount,
  useConfig,
  useLoggingIn,
  useScQuery,
  useTransaction,
} from '@useelven/core';
import { useScAddressFromStorage } from '@/hooks/use-sc-address-from-storage';
import { shortenHash } from '@/lib/shorten-hash';
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
    return null;
  }

  return (
    <div className="text-xs font-semibold">
      <hr className="mb-3" />
      You already have one Piggy. If you want, you can deploy a new smart
      contract and create a new Piggy! The transaction will fail.
    </div>
  );
};

const TX_ID = 'createTx';

const Content = () => {
  const { explorerAddress } = useConfig();
  const { scAddress } = useScAddressFromStorage();

  const { triggerTx, pending, transaction, error, txResult } = useTransaction({
    id: TX_ID,
  });
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('00:00');

  const createPiggy = () => {
    if (date && scAddress) {
      const unixTime = getUnixTime(new Date(`${date.toDateString()}, ${time}`));

      if (unixTime) {
        const data = new ContractCallPayloadBuilder()
          .setFunction(new ContractFunction('createPiggy'))
          .setArgs([new U64Value(unixTime)])
          .build();

        triggerTx({
          address: scAddress,
          gasLimit: 14000000,
          data,
        });
      }
    }
  };

  const txHash = transaction?.getHash().toString();

  const scErrorMessage = getScErrorMessage(txResult);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-1">Create a Piggy Bank</DialogTitle>
        <DialogDescription>
          Initialize a Piggy Bank with a chosen date in the future. You
          won&apos;t be able to take your deposited EGLD before that date.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="text-xs mb-6">
          <SmartContractAddress />
        </div>
        <Label className="mb-2 text-xs">Lock time date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                <span>
                  {format(date, 'PPP')},{' '}
                  {format(new Date(`${date.toDateString()}, ${time}`), 'p')}
                </span>
              ) : (
                <span>Pick the date and time</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={[{ before: new Date() }, new Date()]}
            />
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Pick the time"
            />
          </PopoverContent>
        </Popover>
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
              Success! You created a Piggy. Now you can deposit some EGLD!
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          disabled={
            pending || !date || Boolean(txResult?.hash) || Boolean(error)
          }
          onClick={createPiggy}
        >
          {pending ? <TxPending /> : 'Create!'}
        </Button>
      </DialogFooter>
    </>
  );
};

export const CreatePiggyOperation = () => {
  const { pending, loggedIn } = useLoggingIn();
  const [open, setOpen] = useState(false);

  // Handle dialog when back from web wallet
  useEffect(() => {
    const isCreateTx = getParamFromUrl('ongoingTx') === TX_ID;
    if (isCreateTx) {
      setOpen(true);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center mt-5">
        <PleaseConnectYourWallet isLoggedIn={loggedIn} isLoggingIn={pending} />
        <DialogTrigger asChild>
          <Button className="ml-3" disabled={pending || !loggedIn}>
            Create a Piggy Bank
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
