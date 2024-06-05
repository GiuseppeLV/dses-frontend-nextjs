'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ReadFunction } from "@/app/homepage/tools/CallFunction";
import { useEthers } from "@usedapp/core";
import CityNotification from "@/app/homepage/notifications/City";
import StateNotification from "@/app/homepage/notifications/State";
import { Contracts } from "@/app/homepage/tools/InitContracts";
export default function Header() {
  const {account}=useEthers()
  const city=ReadFunction(Contracts().dsesCenterContract,'checkExistingCity', account)
  const state=ReadFunction(Contracts().dsesCenterContract,'checkExistingState', account)
  
  return (
  <div className="w-full grid grid-cols-1 gap-4 p-4 border-b">
    {city?<CityNotification/>:null}
    {state?<StateNotification/>:null}
  </div>);
}