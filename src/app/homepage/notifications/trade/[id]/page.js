'use client'
import { redirect, useSearchParams } from "next/navigation";
import { ReadFunction, WriteFunction } from "../../../tools/CallFunction";
import { Contracts } from "../../../tools/InitContracts";
import Citizen from "../../../profile/Citizen"
import { TransactionStatus } from "@/app/homepage/tools/TransactionStatus";
import { Button } from "@/components/ui/button";
import { useEthers, useSigner } from "@usedapp/core";
import { ReadFunctionNoArgs } from "../../../tools/CallFunction";
import { utils } from "ethers";
import { useRouter } from 'next/navigation'

export default function Notification(){
     const {account}=useEthers();
     const signer=useSigner()
     const searchParams=useSearchParams()
     const router = useRouter()
     const [sendResponse,statusResponse]=WriteFunction(Contracts().tradeTokenContract,'endTrade', 'response to trade')
     const tradeId=searchParams.get('id')
     let getTrade=ReadFunction(Contracts().tradeTokenContract,'getTradeById',tradeId,account)
     const getRate=ReadFunctionNoArgs(Contracts().pollutionTokenContract,'getPTtoEthRate')


    let getSender=getTrade?.[0]
    let getPT=getTrade?.[2].toString();
     console.log("amount poll:",getTrade)

    async function handleClick(){
        await sendResponse(tradeId,account,true,{ value: utils.parseEther(((getRate*getTrade[2].toString())/10**18).toString()) })
        router.push('/homepage/send')
    }

    async function handleClickDecline(){
        await sendResponse(tradeId,account,false)
        router.push('/homepage/send')
    }
    return(
        <div>
        <p className="text-[20px] font-bold underline">Trade offer:</p>
     
        <p>Sender:{getSender}</p>
        <p>Amount of Pollution Token offered:{getPT}</p>
        <p>ETH to pay:{getPT*getRate/10**18}</p>
        <div className="flex space-x-4 pt-5">
  
        <Button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"onClick={handleClick}>Accept</Button>

        <Button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"onClick={handleClickDecline}>Decline</Button>
        </div>
        <div>
        <TransactionStatus transactionStatus={statusResponse}/>
        </div> 

        </div>
    )

}