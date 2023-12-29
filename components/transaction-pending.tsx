import { Transaction } from '@multiversx/sdk-core';
import { useConfig } from '@useelven/core';

export const TransactionPending = ({
  transaction,
  pending,
}: {
  transaction: Transaction | null;
  pending: boolean;
}) => {
  const { explorerAddress } = useConfig();

  const hash = transaction?.getHash().toString();

  return (
    hash && (
      <div className="mt-3 break-all">
        Your deployment transaction hash {pending && '(still pending...)'}:
        <br />
        <a
          href={`${explorerAddress}/transactions/${transaction
            ?.getHash()
            .toString()}`}
          target="_blank"
          className="underline"
        >
          {hash}
        </a>
      </div>
    )
  );
};
