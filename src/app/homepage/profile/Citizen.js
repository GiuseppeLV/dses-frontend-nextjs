'use client';

import React from 'react';
import { Contracts } from '../tools/InitContracts';
import { ReadFunction } from '../tools/CallFunction';

function Citizen({ account }) {
  const getCitizen = ReadFunction(
    Contracts().cityCitizenContract,
    'getCitizen',
    account,
  );
  let Profile;

  let citizenName = getCitizen?.[0];
  let citizenSurname = getCitizen?.[2];
  let citizenBirthday = getCitizen?.[4];
  let citizenEmail = getCitizen?.[3];
  let telephone = getCitizen?.[5].toString();
  let physicalAddress = getCitizen?.[6];
  let id = getCitizen?.[7].toString();

  Profile = [
    {
      inputName: 'Citizen name',
      inputValue: citizenName,
    },
    {
      inputName: 'Citizen surname',
      inputValue: citizenSurname,
    },
    {
      inputName: 'Citizen birthday',
      inputValue: citizenBirthday,
    },
    {
      inputName: 'Citizen Email',
      inputValue: citizenEmail,
    },
    {
      inputName: 'Telephone',
      inputValue: telephone,
    },
    {
      inputName: 'Physical Address',
      inputValue: physicalAddress,
    },
    {
      inputName: 'ID',
      inputValue: id,
    },
  ];

  return (
    <div>
      <div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Citizen Informations</h2>
          <div>
            {citizenName && account ? (
              Profile.map((item, key) => (
                <div className="p-2">
                  <p className=" text-gray-600  font-bold ">{item.inputName}</p>
                  <p className="text-gray-600  ">{item.inputValue}</p>
                </div>
              ))
            ) : (
              <h2 className="text-l text-red-600 font-semibold mb-4">
                Citizen doesn't exist
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Citizen;
