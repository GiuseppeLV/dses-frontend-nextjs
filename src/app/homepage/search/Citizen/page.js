'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { isAddress } from 'ethers/lib/utils';
import Citizen from '../../profile/Citizen';
import { useSigner } from '@usedapp/core';
const formSchema = z.object({
  citizenAddressKey: z.custom(isAddress, 'Invalid Address'),
});

export default function SearchForCitizen({ handleSearchAddress = 0 }) {
  const [showForm, setShowForm] = useState(false);
  const [citizenAddress, setCitizenAddress] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      citizenAddressKey: '',
    },
  });

  async function onSubmitKey(values) {
    setShowForm(true);
    setCitizenAddress(values.citizenAddressKey);
    if (handleSearchAddress != 0) {
      handleSearchAddress(values.citizenAddressKey);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitKey)} className="space-y-8">
          <FormField
            control={form.control}
            name="citizenAddressKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citizen Address</FormLabel>
                <FormControl>
                  <Input placeholder="citizenAddressKey" {...field} />
                </FormControl>
                <FormDescription>Insert citizen address key</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {showForm ? (
        <div>
          <div>
            <Citizen account={citizenAddress} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
