'use client'

import React from 'react';
import { Contracts } from '../tools/InitContracts';
import { useEthers} from '@usedapp/core';
import { ReadFunction } from '../tools/CallFunction';


// Definizione del componente
function State({account}) {
  //const {account,chainId}=useEthers()
  const getState=ReadFunction(Contracts().dsesCenterContract,'getState',account)
  console.log("statenameee:")
  let Profile;

    let stateName=getState?.[0]
    let iso=getState?.[1]
    let numberOfCities=getState?.[2].toString()
    let attorneyName=getState?.[3]
    let attorneySurname=getState?.[4]
    let attorneyEmail=getState?.[5]
    let telephone=getState?.[6].toString()
    let physicalAddress=getState?.[7]
    console.log("statename:",stateName)
   
    Profile=[{
        inputName:"State name",
        inputValue:stateName
    },
    {
        inputName:"ISO",
        inputValue:iso
    },
    {
        inputName:"Number of cities",
        inputValue:numberOfCities
    },
    {
        inputName:"Attorney Name",
        inputValue:attorneyName
    },
    {
        inputName:"Attorney Surname",
        inputValue:attorneySurname
    },
    {
        inputName:"Attorney Email",
        inputValue:attorneyEmail
    },
    {
        inputName:"Attorney Telephone",
        inputValue:telephone
    },
    {
        inputName:"Physical Address",
        inputValue:physicalAddress
    }]

   console.log("PROFILE:", Profile)
  

  return (<div>
    <div>
         <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">User Informations</h2>
      <div>
      {stateName && account?(Profile.map((item, key) => (       
         <div className="p-2">
             <p  className=" text-gray-600  font-bold ">{item.inputName}</p>
             <p  className="text-gray-600  ">{item.inputValue}</p>
        </div>
          ))):<h2 className="text-l text-red-600 font-semibold mb-4">User doesn't exist</h2>}
        </div>
   
    </div>
    </div>
    </div>)
}



export default State;


