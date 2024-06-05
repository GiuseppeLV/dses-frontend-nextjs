'use client'

import React from "react";
import { useEthers} from "@usedapp/core";
import Admin from "./Admin";
import { Contracts } from "../tools/InitContracts";
import State from "./State";
import { ReadFunction } from "../tools/CallFunction";
import City from "./City";
export default function RolePage() {
  const { account } = useEthers();
  const admin=ReadFunction(Contracts().dsesCenterContract,'checkExistingAdmin', account)
  const state=ReadFunction(Contracts().dsesCenterContract,'checkExistingState', account)
  const city=ReadFunction(Contracts().dsesCenterContract,'checkExistingCity', account)
  return (
    <div>
        <div>  
      {admin?<Admin/>:null} 
      {state?<State/>:null} 
      {city?<City/>:null} 
      </div>
    </div>
  )
}
