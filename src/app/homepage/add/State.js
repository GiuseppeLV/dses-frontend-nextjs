"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
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
import { ReadFunction, WriteFunction, ReadFunctionNoArgs } from "../tools/CallFunction"
import { useEthers } from "@usedapp/core"
import { useEffect, useState } from "react"
import { TransactionStatus } from "../tools/TransactionStatus"
import { Contracts } from "../tools/InitContracts"
import { isAddress } from "ethers/lib/utils"



const formSchema = z.object({
  CityName: z.string().min(2, {
    message: "CityName must be at least 2 characters.",
  }),
  Population: z.coerce.number({invalid_type_error:"It must be a number"}).int({message:"It must be an integer"}).min(1,"City must have at least 1 person"),
  NumberOfIndustries: z.coerce.number({invalid_type_error:"It must be a number"}).int({message:"It must be an integer"}),
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
  CityAddressKey:z.custom(isAddress, "Invalid Address")
})

const fieldList=["CityName","Population","NumberOfIndustries", "AttorneyName", "AttorneySurname","AttorneyEmail", "Telephone", "PhysicalAddress", "CityAddressKey"]
export default function State({isModify=false, transactionName='adding a new city'}) {
  const [transactionStatus, setTransactionStatus] = useState('');
  const [sendAddCity, stateAddCity]=WriteFunction(Contracts().dsesCenterContract,'addCity',transactionName)

  useEffect(()=>{
    setTransactionStatus(stateAddCity);
  },[stateAddCity])
  const {toast}=useToast()

  // 1. Define your form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CityName: "",
      Population: 0,
      NumberOfIndustries: 0,
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
    await sendAddCity(values.CityName,
      values.Population,
      values.NumberOfIndustries,
      values.CityAddressKey,
      values.AttorneyName,
      values.AttorneySurname,
      values.AttorneyEmail,
      values.Telephone,
      values.PhysicalAddress,
      isModify)

      toast({
        title: values.CityName+" added successfully",
        description: "Address:" + values.CityAddressKey,
      })
    
  }



  return (
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
      </div>
  )
}
