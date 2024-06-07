'use client';

import { z } from 'zod';
import { ReadFunction, WriteFunction } from '../tools/CallFunction';
import { Contracts } from '../tools/InitContracts';

import { useState } from 'react';
import State from '../add/State';
import SearchForCity from '../search/City/page';

export default function ModifyCity({ account }) {
  const [cityAddress, setCityAddress] = useState(0);
  let isCityExistent = ReadFunction(
    Contracts().dsesCenterContract,
    'checkExistingCityOfAState',
    cityAddress,
    account,
  );

  const handleKeyFromChild = (key) => {
    setCityAddress(key);
  };

  return (
    <div>
      <div>
        <SearchForCity handleSearchAddress={handleKeyFromChild} />
      </div>
      <div>
        {isCityExistent ? (
          <State
            isModify={true}
            transactionName="modify city"
            cityAddress={cityAddress}
          />
        ) : null}
      </div>
    </div>
  );
}
