import { getLoginMethodName } from '@/lib/get-login-method-name';
import { useLoginInfo } from '@useelven/core';
import { Spinner } from '@/components/ui/spinner';

export const TxPending = () => {
  const { loginMethod } = useLoginInfo();
  return (
    <div className="flex gap-2 items-center">
      <Spinner size={18} />
      <span>
        Pending...
        <span className="text-xs">
          (Confirmation using {getLoginMethodName(loginMethod)})
        </span>
      </span>
    </div>
  );
};
