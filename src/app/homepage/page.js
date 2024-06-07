'use client';

import React from 'react';
import {
  Sepolia,
  useEthers,
  useTokenBalance,
  useLogs,
  useCall,
} from '@usedapp/core';
import Admin from './roles/Admin';
import { Contracts } from './tools/InitContracts';
import State from './roles/State';
import { ReadFunction } from './tools/CallFunction';
import City from './roles/City';
import Citizen from './roles/Citizen';
export default function RolePage() {
  const { active, account } = useEthers();

  return (
    <div>
      {account ? (
        <div>
          {ReadFunction(
            Contracts().dsesCenterContract,
            'checkExistingAdmin',
            account,
          ) ? (
            <Admin />
          ) : null}
          {ReadFunction(
            Contracts().dsesCenterContract,
            'checkExistingState',
            account,
          ) ? (
            <State />
          ) : null}
          {ReadFunction(
            Contracts().dsesCenterContract,
            'checkExistingCity',
            account,
          ) ? (
            <City />
          ) : null}
          {ReadFunction(
            Contracts().cityCitizenContract,
            'checkExistingCitizen',
            account,
          ) ? (
            <Citizen />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
