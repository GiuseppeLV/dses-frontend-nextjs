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
import City from '../../profile/City';
import { useSigner } from '@usedapp/core';
const formSchema = z.object({
  CityAddressKey: z.custom(isAddress, 'Invalid Address'),
});

export default function SearchForCity({ handleSearchAddress = 0 }) {
  const signer = useSigner();
  const [showForm, setShowForm] = useState(false);
  const [cityAddress, setCityAddress] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CityAddressKey: '',
    },
  });

  async function onSubmitKey(values) {
    setShowForm(true);
    setCityAddress(values.CityAddressKey);
    if (handleSearchAddress != 0) {
      handleSearchAddress(values.CityAddressKey);
    }
  }

  return (
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
                <FormDescription>Insert city address key</FormDescription>
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
            <City account={cityAddress} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
