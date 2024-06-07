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
import State from '../../profile/State';
import { useSigner } from '@usedapp/core';
const formSchema = z.object({
  stateAddressKey: z.custom(isAddress, 'Invalid Address'),
});

export default function SearchForState({ handleSearchAddress = 0 }) {
  const [showForm, setShowForm] = useState(false);
  const [stateAddress, setStateAddress] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stateAddressKey: '',
    },
  });

  async function onSubmitKey(values) {
    setShowForm(true);
    setStateAddress(values.stateAddressKey);
    if (handleSearchAddress != 0) {
      handleSearchAddress(values.stateAddressKey);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitKey)} className="space-y-8">
          <FormField
            control={form.control}
            name="stateAddressKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State Address</FormLabel>
                <FormControl>
                  <Input placeholder="stateAddressKey" {...field} />
                </FormControl>
                <FormDescription>Insert state address key</FormDescription>
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
            <State account={stateAddress} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
