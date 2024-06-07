'use client';

import React from 'react';
import { Contracts } from '../tools/InitContracts';
import { ReadFunction } from '../tools/CallFunction';

function City({ account }) {
  const getCity = ReadFunction(
    Contracts().dsesCenterContract,
    'getCity',
    account,
  );
  let Profile;

  let cityName = getCity?.[0];
  let population = getCity?.[1].toString();
  let numberOfIndustries = getCity?.[2].toString();
  let attorneyName = getCity?.[3];
  let attorneySurname = getCity?.[4];
  let attorneyEmail = getCity?.[5];
  let telephone = getCity?.[6].toString();
  let physicalAddress = getCity?.[7];

  Profile = [
    {
      inputName: 'City name',
      inputValue: cityName,
    },
    {
      inputName: 'Population',
      inputValue: population,
    },
    {
      inputName: 'Number of industries',
      inputValue: numberOfIndustries,
    },
    {
      inputName: 'Attorney Name',
      inputValue: attorneyName,
    },
    {
      inputName: 'Attorney Surname',
      inputValue: attorneySurname,
    },
    {
      inputName: 'Attorney Email',
      inputValue: attorneyEmail,
    },
    {
      inputName: 'Attorney Telephone',
      inputValue: telephone,
    },
    {
      inputName: 'Physical Address',
      inputValue: physicalAddress,
    },
  ];

  console.log('PROFILE:', Profile);

  return (
    <div>
      <div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">City Informations</h2>
          <div>
            {cityName && account ? (
              Profile.map((item, key) => (
                <div className="p-2">
                  <p className=" text-gray-600  font-bold ">{item.inputName}</p>
                  <p className="text-gray-600  ">{item.inputValue}</p>
                </div>
              ))
            ) : (
              <h2 className="text-l text-red-600 font-semibold mb-4">
                City doesn't exist
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default City;
