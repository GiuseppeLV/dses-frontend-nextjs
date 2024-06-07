'use client';

import React from 'react';
import { useEthers } from '@usedapp/core';
import ModifyState from './Admin';
import { Contracts } from '../tools/InitContracts';
import ModifyCity from './State';
import { ReadFunction } from '../tools/CallFunction';
import ModifyCitizen from './City';
export default function RolePage() {
  const { account } = useEthers();
  const admin = ReadFunction(
    Contracts().dsesCenterContract,
    'checkExistingAdmin',
    account,
  );
  const state = ReadFunction(
    Contracts().dsesCenterContract,
    'checkExistingState',
    account,
  );
  const city = ReadFunction(
    Contracts().dsesCenterContract,
    'checkExistingCity',
    account,
  );
  return (
    <div>
      <div>
        {admin ? <ModifyState account={account} /> : null}
        {state ? <ModifyCity account={account} /> : null}
        {city ? <ModifyCitizen account={account} /> : null}
      </div>
    </div>
  );
}
