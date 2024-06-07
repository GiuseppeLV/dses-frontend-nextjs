'use client';

import React from 'react';
import { useEthers } from '@usedapp/core';
import { Contracts } from '../tools/InitContracts';
import SendState from './State';
import { ReadFunction } from '../tools/CallFunction';

export default function RolePage() {
  const { account } = useEthers();
  const state = ReadFunction(
    Contracts().dsesCenterContract,
    'checkExistingState',
    account,
  );
  return (
    <div>
      <div>{state ? <SendState account={account} /> : null}</div>
    </div>
  );
}
