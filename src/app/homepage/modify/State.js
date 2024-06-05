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
import City from "../profile/City"
import State from "../add/State"
const formSchema = z.object({
CityAddressKey:z.custom(isAddress, "Invalid Address")
})
export default function ModifyCity({account}){
const [showForm,setShowForm]=useState(false)
const [cityAddress,setCityAddress]=useState(0)
const isCityExistent=ReadFunction(Contracts().dsesCenterContract,'checkExistingCity', cityAddress)
const { toast } = useToast()
console.log("indirizzo:", cityAddress)
  // 1. Define your form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CityAddressKey:""
    },
  })

  async function onSubmitKey(values){
    console.log("ONSubmit")
    console.log("State address key", values.CityAddressKey)

    setCityAddress(values.CityAddressKey)
    setShowForm(true)
  }


    return(
        <div>
     <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitKey)} className="space-y-8">
    <FormField
        control={form.control}
        name="CityAddressKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City Address</FormLabel>
            <FormControl>
              <Input placeholder="CityAddressKey" {...field} />
            </FormControl>
            <FormDescription>City address key to modify </FormDescription>
            <FormMessage />
          </FormItem>
        )}/>
        <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
        {showForm?(<div>{isCityExistent?(
    <div>
      
    <div>
    <City account={cityAddress}/>
    </div>
      <div>
     <State isModify={true} transactionName="modify city"/>
</div>
</div>
):<p className="text-l text-red-600 font-semibold mb-4 pt-4">City doesn't exist</p>}</div>):null}
</div>)}
