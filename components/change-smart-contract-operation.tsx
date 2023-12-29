'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useLoggingIn } from '@useelven/core';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SmartContractAddress } from '@/components/smart-contract-address';
import { useState } from 'react';

export const Content = () => {
  const [value, setValue] = useState('');
  const [done, setDone] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  const changeSmartContract = () => {
    if (window?.localStorage) {
      window.localStorage.setItem('piggyBankSmartContract', value);
      setNewAddress(value);
      setValue('');
      setDone(true);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="text-xs mb-6">
          <SmartContractAddress address={newAddress} />
        </div>
        <Label className="mb-2 text-xs">New smart contract address</Label>
        <Input
          type="text"
          className="w-auto"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Put a smart contract address here"
        />
      </div>
      <DialogFooter>
        {done && (
          <div className="text-xs font-semibold">
            Success! You&apos;ve set a new smart contract.
          </div>
        )}
        <Button onClick={changeSmartContract} disabled={done}>
          Change!
        </Button>
      </DialogFooter>
    </>
  );
};

export const ChangeSmartContractOperation = () => {
  const { pending } = useLoggingIn();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5" disabled={pending}>
          Change the smart contract
        </Button>
      </DialogTrigger>
      <DialogContent forceMount className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change the smart contract</DialogTitle>
          <DialogDescription>
            Change the Piggy Bank smart contract currently saved in the local
            storage. It is used in all operations here and remembered whenever
            you deploy a new one. Here you can manually change it.
          </DialogDescription>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
};
