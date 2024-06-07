'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  ReadFunction,
  ReadFunctionNoArgs,
  WriteFunction,
} from '../tools/CallFunction';
import { Contracts } from '../tools/InitContracts';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { TransactionStatus } from '../tools/TransactionStatus';
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
import State from '../profile/State';
import GetCurrency from '../tools/Currency';
const formSchema = z.object({
  PTAmount: z.coerce.number({ invalid_type_error: 'It must be a number' }),
  StateAddressKey: z.custom(isAddress, 'Invalid Address'),
});
export default function SendState({ account }) {
  const [sendTradeToken, statusTradeToken] = WriteFunction(
    Contracts().tradeTokenContract,
    'startTrade',
    ' starting a trade with a state',
  );

  const [showForm, setShowForm] = useState(false);
  const [currencyValue, setCurrencyValue] = useState(1);
  const [stateAddress, setStateAddress] = useState('');
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PTAmount: 0,
      StateAddressKey: '',
    },
  });

  async function onSubmit(values) {
    await sendTradeToken(values.PTAmount, values.StateAddressKey);
  }

  async function onSubmitKey(values) {
    console.log('State address key', values.StateAddressKey);
    setStateAddress(values.StateAddressKey);
    setShowForm(true);
  }

  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitKey)} className="space-y-8">
            <FormField
              control={form.control}
              name="StateAddressKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address of Destination State</FormLabel>
                  <FormControl>
                    <Input placeholder="StateAddressKey" {...field} />
                  </FormControl>
                  <FormDescription>
                    State address key destination{' '}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      {showForm ? (
        <div>
          <div>
            <State account={stateAddress} />
          </div>
          <div>
            {stateAddress != account ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="PTAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[18px] font-bold mt-8">
                          Amount to send
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="PTAmount"
                            onChangeCapture={(e) =>
                              setCurrencyValue(e.currentTarget.value)
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Insert PT amount to send to the State above{' '}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <GetCurrency ptAmount={currencyValue} />
                  <Button type="submit" className="bg bg-red-500">
                    Send
                  </Button>
                </form>
              </Form>
            ) : (
              <p className="text-l text-red-600 font-semibold mb-4 pt-4">
                You cannot trade with yourself
              </p>
            )}
            <div>
              <TransactionStatus transactionStatus={statusTradeToken} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
