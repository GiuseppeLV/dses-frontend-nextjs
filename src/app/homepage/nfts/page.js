'use client';

import React from 'react';
import { useEthers } from '@usedapp/core';
import { Contracts } from '../tools/InitContracts';
import { ReadFunction } from '../tools/CallFunction';
import Citizen from './Citizen';
export default function RolePage() {
  const { account } = useEthers();
  const citizen = ReadFunction(
    Contracts().cityCitizenContract,
    'checkExistingCitizen',
    account,
  );

  return (
    <div>
      <div>{citizen ? <Citizen /> : null}</div>
    </div>
  );
}
