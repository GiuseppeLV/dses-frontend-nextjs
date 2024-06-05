
'use client'
import { useTransactions } from "@usedapp/core"
import { ethers } from "ethers"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
export default function Citizen(){
    const { transactions } = useTransactions()
    function getFormattedDate(unixDate){
        console.log("unixDate:", unixDate)
        let date = new Date(unixDate);
        // Formatta la data nel formato "yyyy-mm-dd"
        let formattedDate = `${date.toDateString()} on ${date.toTimeString()}`;
        return formattedDate
    }
 
    console.log("Eccoci:", )
    
    //ethers.BigNumber.from(transaction.receipt.gasUsed.hex)?.toNumber()
    return(
        <div className="bg-white shadow-md rounded-lg p-4">
           {transactions.map((transaction,key) => (
            <Popover>
            <div>
            <span className=" text-gray-800  font-bold text-[20px]">{key}•</span>
            <PopoverTrigger><span  className="text-gray-700 font-bold text-[18px] ">Transaction hash: </span>
            <span  className="text-gray-600 font-bold" >{transaction.transaction.hash}</span></PopoverTrigger>
            <PopoverContent>
            <p><span  className="text-gray-700 font-bold text-[18px] ">Transaction:</span> <span className="text-gray-600 font-bold" >{transaction.transactionName}</span></p>
            <p><span  className="text-gray-700 font-bold text-[18px] ">Submitted at:</span> <span className="text-gray-600 font-bold" >{getFormattedDate(transaction.submittedAt)}</span></p>
            <p> <span  className="text-gray-700 font-bold text-[18px] ">Gas used:</span> <span className="text-gray-600 font-bold" >{parseInt(transaction.receipt.gasUsed.hex)}</span></p>
            </PopoverContent> 
            
            </div>
            </Popover>
        ))}
        </div>
    )
}