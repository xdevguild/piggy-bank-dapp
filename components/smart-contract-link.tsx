'use client';

import { useConfig } from '@useelven/core';
import { shortenHash } from '@/lib/shorten-hash';

export const SmartContractLink = ({ scAddress }: { scAddress: string }) => {
  const { explorerAddress } = useConfig();

  if (!scAddress) return null;

  return (
    <a
      href={`${explorerAddress}/address/${scAddress}`}
      target="_blank"
      className="underline"
    >
      {shortenHash(scAddress, 6)}
    </a>
  );
};
