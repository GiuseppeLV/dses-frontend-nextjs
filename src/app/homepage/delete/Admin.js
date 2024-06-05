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
StateAddressKey:z.custom(isAddress, "Invalid Address"),
})
export default function Admin(){
const {account}= useEthers()
const [sendDelete,statusDelete]=WriteFunction(Contracts().dsesCenterContract,'deleteState',' deleting state')
const { toast } = useToast()
  // 1. Define your form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      StateAddressKey:""
    },
  })

  async function onSubmit(values){
    await sendDelete(values.StateAddressKey)

  }

    return(
      <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
        control={form.control}
        name="StateAddressKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State Address Key</FormLabel>
            <FormControl>
              <Input placeholder="address" {...field} />
            </FormControl>
            <FormDescription>Insert state address to delete.</FormDescription>
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