import React from 'react';
import { Contracts } from './InitContracts';
import {
  useCall,
  useEthers,
  useContractFunction,
  useSendTransaction,
} from '@usedapp/core';

export function ReadFunction(Contract, method, ...args) {
  const { value, error } =
    useCall({
      contract: Contract,
      method: method,
      args: args,
    }) ?? {};

  return value?.[0];
}

export function ReadFunctionNoArgs(Contract, method) {
  const { value, error } =
    useCall({
      contract: Contract,
      method: method,
      args: [],
    }) ?? {};

  return value?.[0];
}
export function WriteFunction(Contract, method, _transactionName) {
  const { send, state } = useContractFunction(Contract, method, {
    transactionName: _transactionName,
  });
  return [send, state];
}
