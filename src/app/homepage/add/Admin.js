"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { ReadFunction, WriteFunction } from "../tools/CallFunction"
import { useEthers } from "@usedapp/core"
import { useEffect, useState } from "react"
import { TransactionStatus } from "../tools/TransactionStatus"
import { Contracts } from "../tools/InitContracts"
import { isAddress } from "ethers/lib/utils"
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
  StateName: z.string().min(2, {
    message: "StateName must be at least 2 characters.",
  }),
  ISO:z.string().min(2, {
    message: "ISO must be at least 2 characters.",
  }),
  NumberOfCities: z.coerce.number({invalid_type_error:"It must be a number"}).int({message:"It must be an integer"}),
  AttorneyName: z.string().min(2, {
    message: "Attorney name must be at least 2 characters.",
  }),
  AttorneySurname: z.string().min(2, {
    message: "Attorney name must be at least 2 characters.",
  }),
  AttorneyEmail: z.string().email("Please enter a valid email address"),
  Telephone: z.coerce.number({invalid_type_error:"It must be a number"}).min(7,"Please enter a valid phone number"),
  PhysicalAddress: z.string().min(2, {
    message: "Physical address must be at least 2 characters.",
  }),
  StateAddressKey:z.custom(isAddress, "Invalid Address")
})

const fieldList=["StateName","ISO","NumberOfCities", "AttorneyName", "AttorneySurname","AttorneyEmail", "Telephone", "PhysicalAddress", "StateAddressKey"]
export default function Admin({isModify=false, transactionName='adding a new state'}) {
  const [transactionStatus, setTransactionStatus] = useState('');
  const [sendAddState, stateAddState]=WriteFunction(Contracts().dsesCenterContract,'addState',transactionName)
  useEffect(()=>{
    setTransactionStatus(stateAddState);
  },[stateAddState])
  console.log("IsModify:", isModify)
  const { toast } = useToast()
  // 1. Define your form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      StateName: "",
      ISO: "",
      NumberOfCities: 0,
      AttorneyName:"",
      AttorneySurname:"",
      AttorneyEmail:"",
      Telephone:"",
      PhysicalAddress:""
    },
  })


  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log("Valori:",values.AttorneyEmail)
    await sendAddState(values.StateName,
      values.ISO,
      values.StateAddressKey,
      values.NumberOfCities,
      values.AttorneyName,
      values.AttorneySurname,
      values.AttorneyEmail,
      values.Telephone,
      values.PhysicalAddress,
      isModify
    )
      toast({
          title: values.StateName+" added successfully",
          description: "Address:" + values.StateAddressKey,
        })
    
  }



  return (
    <div>
    {1+1?(
    <div>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {(fieldList.map((item) => (       
      <FormField
      control={form.control}
      name={item}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{item}</FormLabel>
          <FormControl>
            <Input placeholder={item} {...field} />
          </FormControl>
          <FormDescription>
            This is {item} display.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
   )))}
  
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      <div>
      <TransactionStatus transactionStatus={transactionStatus}/>
      </div> 
      </div>):null}</div>
  )
}
