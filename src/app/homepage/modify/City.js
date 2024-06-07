'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ReadFunction, WriteFunction } from '../tools/CallFunction';
import { Contracts } from '../tools/InitContracts';
import { useState } from 'react';
import SearchForCitizen from '../search/Citizen/page';
import City from '../add/City';
export default function ModifyCitizen({ account }) {
  const [citizenAddress, setCitizenAddress] = useState(0);
  let isCitizenExistent = ReadFunction(
    Contracts().cityCitizenContract,
    'checkExistingCitizenOfACity',
    citizenAddress,
    account,
  );

  const handleKeyFromChild = (key) => {
    setCitizenAddress(key);
  };

  return (
    <div>
      <div>
        <SearchForCitizen handleSearchAddress={handleKeyFromChild} />
      </div>
      <div>
        {isCitizenExistent ? (
          <City
            isModify={true}
            citizenAddress={citizenAddress}
            transactionName="modify citizen"
          />
        ) : null}
      </div>
    </div>
  );
}
