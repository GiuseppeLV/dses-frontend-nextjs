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
import State from "../profile/State"
import Admin from "../add/Admin"
const formSchema = z.object({
StateAddressKey:z.custom(isAddress, "Invalid Address")
})
export default function ModifyState({account}){
const [showForm,setShowForm]=useState(false)
const [stateAddress,setStateAddress]=useState(0)
const isStateExistent=ReadFunction(Contracts().dsesCenterContract,'checkExistingState',stateAddress)
const { toast } = useToast()
console.log("indirizzo:", stateAddress)
  // 1. Define your form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      StateAddressKey:""
    },
  })



  async function onSubmitKey(values){
    console.log("ONSubmit")
    console.log("State address key", values.StateAddressKey)

    setStateAddress(values.StateAddressKey)
    setShowForm(true)
  }


    return(
      <div>
     <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitKey)} className="space-y-8">
    <FormField
        control={form.control}
        name="StateAddressKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State Address</FormLabel>
            <FormControl>
              <Input placeholder="StateAddressKey" {...field} />
            </FormControl>
            <FormDescription>State address key to modify </FormDescription>
            <FormMessage />
          </FormItem>
        )}/>
        <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
        {showForm ?(<div>{isStateExistent?(
    <div>
      
    <div>
    <State account={stateAddress}/>
    </div>
      <div>
     <Admin isModify={true} transactionName="modify state"/>
</div>
</div>
):<p className="text-l text-red-600 font-semibold mb-4 pt-4">State doesn't exist</p>}</div>):null}
</div>)}
