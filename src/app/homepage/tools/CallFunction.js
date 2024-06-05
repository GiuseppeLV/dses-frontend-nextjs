import React from 'react';
import { Contracts } from './InitContracts';
import { useCall,useEthers , useContractFunction,useSendTransaction} from '@usedapp/core';
// Definizione del componente
export function ReadFunction(Contract, method, ...args) { 
      
        const {value,error} = useCall({
          contract: Contract,
          method: method,
          args: args
        }) ?? {};

        console.log("Value:",  value?.[0].toString())

        //console.log("Value da",method,":",value)       
        return value?.[0]
}


export function ReadFunctionNoArgs(Contract, method) {
  const {value,error} = useCall({
    contract: Contract,
    method: method,
    args: []
  }) ?? {};

  console.log("Value:",  value?.[0].toString())

  //console.log("Value da",method,":",value)       
  return value?.[0]
}
export function WriteFunction(Contract, method, _transactionName){
const { send,state} = useContractFunction(
    Contract,
    method,
    {transactionName: _transactionName}
  );
  return [send, state]
}