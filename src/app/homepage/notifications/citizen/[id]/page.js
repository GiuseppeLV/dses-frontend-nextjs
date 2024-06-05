'use client'
import { useSearchParams } from "next/navigation";
import { ReadFunction } from "../../../tools/CallFunction";
import { Contracts } from "../../../tools/InitContracts";
import Citizen from "../../../profile/Citizen"
export default function Notification(){
     const searchParams=useSearchParams()
     const citAddress= searchParams.get('address')
     console.log("Citizenaddr:", citAddress)


    return(
        <div>
        <p className="text-[16px] font-bold bg-red-600">Citizen without token:</p>
        <Citizen account={citAddress}/>
        </div>
    )

}