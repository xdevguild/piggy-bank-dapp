import { LoginMethodsEnum } from '@useelven/core';

export const getLoginMethodName = (loginMethod: LoginMethodsEnum) => {
  if (loginMethod === LoginMethodsEnum.walletconnect) return 'xPortal';
  if (loginMethod === LoginMethodsEnum.wallet) return 'web wallet';
  return loginMethod;
};
