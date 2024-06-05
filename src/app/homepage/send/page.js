'use client'

import React from "react";
import { useEthers} from "@usedapp/core";
import { Contracts } from "../tools/InitContracts";
import SendState from "./State";
import { ReadFunction } from "../tools/CallFunction";

export default function RolePage() {
  const { account } = useEthers();
  //const admin=ReadFunction(Contracts().dsesCenterContract,'checkExistingAdmin', account)
  const state=ReadFunction(Contracts().dsesCenterContract,'checkExistingState', account)
  //const city=ReadFunction(Contracts().dsesCenterContract,'checkExistingCity', account)
  //const citizen=ReadFunction(Contracts().cityCitizenContract,'checkExistingCitizen', account)

  return (
    <div>
        <div>      
      {state?<SendState account={account}/>:null}     
    </div>
    </div>
  )
}
