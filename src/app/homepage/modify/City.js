"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ReadFunction, WriteFunction } from "../tools/CallFunction"
import { Contracts } from "../tools/InitContracts"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { TransactionStatus } from "../tools/TransactionStatus"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { isAddress } from "ethers/lib/utils"
import Citizen from "../profile/Citizen"
import City from "../add/City"
const formSchema = z.object({
citizenAddressKey:z.custom(isAddress, "Invalid Address")
})
export default function ModifyCitizen({account}){
const [showForm,setShowForm]=useState(false)
const [citizenAddress,setCitizenAddress]=useState(0)
const isCitizenExistent=ReadFunction(Contracts().cityCitizenContract,'checkExistingCitizen',citizenAddress)
const { toast } = useToast()
console.log("indirizzo:", citizenAddress)
  // 1. Define your form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      citizenAddressKey:""
    },
  })


  async function onSubmitKey(values){
    console.log("ONSubmit")
    console.log("State address key", values.citizenAddressKey)

    setCitizenAddress(values.citizenAddressKey)
    setShowForm(true)
  }


    return(
        <div>
     <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitKey)} className="space-y-8">
    <FormField
        control={form.control}
        name="citizenAddressKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address of Destination State</FormLabel>
            <FormControl>
              <Input placeholder="citizenAddressKey" {...field} />
            </FormControl>
            <FormDescription>State address key destination </FormDescription>
            <FormMessage />
          </FormItem>
        )}/>
        <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
        {showForm?(<div>{isCitizenExistent?(
    <div>
      
    <div>
    <Citizen account={citizenAddress}/>
    </div>
      <div>
     <City isModify={true} citizenAddress={citizenAddress} transactionName="modify citizen"/>
</div>
</div>
):<p className="text-l text-red-600 font-semibold mb-4 pt-4">Citizen doesn't exist</p>}</div>):null}
</div>)}
