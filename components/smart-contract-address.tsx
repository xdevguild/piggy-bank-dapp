import { useScAddressFromStorage } from '@/hooks/use-sc-address-from-storage';
import { useConfig } from '@useelven/core';

export const SmartContractAddress = ({ address }: { address?: string }) => {
  const { scAddress } = useScAddressFromStorage();
  const { explorerAddress } = useConfig();

  if (!scAddress && !address) return null;

  return (
    <div className="mt-3 break-all">
      Your Piggy Bank smart contract address:
      <br />
      <strong>
        {
          <a
            href={`${explorerAddress}/accounts/${address || scAddress}`}
            target="_blank"
            className="underline"
          >
            {address || scAddress}
          </a>
        }
      </strong>
    </div>
  );
};
