import { ITransactionOnNetwork } from '@multiversx/sdk-core';

export const getScErrorMessage = (txResult: ITransactionOnNetwork | null) => {
  const errorEvent = txResult?.logs.events.filter(
    (event) => event.identifier === 'signalError'
  )?.[0];
  if (errorEvent?.topics[1]) {
    return errorEvent.topics[1].toString();
  }
  return '';
};
