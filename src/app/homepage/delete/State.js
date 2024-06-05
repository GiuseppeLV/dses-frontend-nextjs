"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ReadFunction, WriteFunction } from "../tools/CallFunction"
import { Contracts } from "../tools/InitContracts"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { TransactionStatus } from "../tools/TransactionStatus"
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
import { useEthers } from "@usedapp/core"
const formSchema = z.object({
CityAddressKey:z.custom(isAddress, "Invalid Address"),
})
export default function State(){
const {account}= useEthers()
const [sendDelete,statusDelete]=WriteFunction(Contracts().dsesCenterContract,'deleteCity',' deleting City')
const { toast } = useToast()
  // 1. Define your form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CityAddressKey:""
    },
  })

  async function onSubmit(values){
    await sendDelete(values.CityAddressKey)
  }

    return(
      <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
        control={form.control}
        name="CityAddressKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City Address Key</FormLabel>
            <FormControl>
              <Input placeholder="address" {...field} />
            </FormControl>
            <FormDescription>Insert City address to delete.</FormDescription>
            <FormMessage />
          </FormItem>
        )}/>
        <Button type="submit">Submit</Button>
        </form>
      </Form>

<div>
<TransactionStatus transactionStatus={statusDelete}/>
</div> 
</div>
);
}