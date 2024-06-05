
'use client'
import { ethers,utils } from "ethers";
import { Sepolia, useEthers, useTokenBalance, useCall, useContractFunction,ChainId, useNotifications } from "@usedapp/core";
import { Contract } from '@ethersproject/contracts'
import { Contracts } from "../tools/InitContracts";
import { TransactionStatus } from "../tools/TransactionStatus"
import { useEffect,useState } from "react";
import { ReadFunction, WriteFunction } from "../tools/CallFunction";
import { Button } from "../../../components/ui/button";
const PTcontractAddresses=require("../../../../constants/PTcontractAddresses")

export default function City() {
  const { notifications } = useNotifications()

  return (
    <div className="global">
<p>HomePage City</p>
<div>{notifications.length !== 0 && (
        <table>
          <th>Type</th>
          <th>Date</th>
          {notifications.map((notification) => {
            return (
              <tr>
                <td><h3>{notification.type}</h3></td>
                <td>{new Date(notification.submittedAt).toDateString()}</td>
              </tr>
            )
          })}
        </table>
      )}
    </div>
    </div>

   
  );
}
