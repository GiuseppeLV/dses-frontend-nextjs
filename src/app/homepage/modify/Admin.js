'use client';

import { ReadFunction, WriteFunction } from '../tools/CallFunction';
import { Contracts } from '../tools/InitContracts';
import { useState } from 'react';
import SearchForState from '../search/State/page';
import Admin from '../add/Admin';
export default function ModifyState({ account }) {
  const [StateAddress, setStateAddress] = useState(0);
  let isStateExistent = ReadFunction(
    Contracts().dsesCenterContract,
    'checkExistingState',
    StateAddress,
  );
  const handleKeyFromChild = (key) => {
    setStateAddress(key);
  };

  console.log('State address:', StateAddress);

  return (
    <div>
      <div>
        <SearchForState handleSearchAddress={handleKeyFromChild} />
      </div>
      <div>
        {isStateExistent ? (
          <Admin
            isModify={true}
            transactionName="modify State"
            stateAddress={StateAddress}
          />
        ) : null}
      </div>
    </div>
  );
}
