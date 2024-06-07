'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
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
import {
  ReadFunction,
  WriteFunction,
  ReadFunctionNoArgs,
} from '../tools/CallFunction';
import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { TransactionStatus } from '../tools/TransactionStatus';
import { Contracts } from '../tools/InitContracts';
import { isAddress, ethers } from 'ethers';
import { useSigner } from '@usedapp/core';

const formSchema = z.object({
  CitizenName: z.string().min(2, {
    message: 'CitizenName must be at least 2 characters.',
  }),
  CitizenSurname: z.string().min(2, {
    message: 'CitizenSurname must be at least 2 characters.',
  }),
  CitizenEmail: z.string().email('Please enter a valid email address'),
  CitizenDateOfBirth: z
    .string()
    .date('Please enter a date in the format YYYY-MM-DD'),
  Telephone: z.coerce
    .number({ invalid_type_error: 'It must be a number' })
    .min(7, 'Please enter a valid phone number'),
  PhysicalAddress: z.string().min(2, {
    message: 'Physical address must be at least 2 characters.',
  }),
});

const fieldList = [
  'CitizenName',
  'CitizenSurname',
  'CitizenEmail',
  'CitizenDateOfBirth',
  'Telephone',
  'PhysicalAddress',
];
export default function City({
  isModify = false,
  citizenAddress = 0,
  transactionName = 'adding a new citizen',
}) {
  const [transactionStatus, setTransactionStatus] = useState('');
  const [sendAddCitizen, stateAddCitizen] = WriteFunction(
    Contracts().cityCitizenContract,
    'addCitizen',
    transactionName,
  );
  const [showKey, setShowKey] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const signer = useSigner();

  useEffect(() => {
    setTransactionStatus(stateAddCitizen);
  }, [stateAddCitizen]);
  const getUserCount = ReadFunctionNoArgs(
    Contracts().pollutionTokenContract,
    'getUserCount',
  );
  let userCount = getUserCount?.toString();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CitizenName: '',
      CitizenSurname: '',
      CitizenEmail: '',
      CitizenDateOfBirth: '',
      Telephone: '',
      PhysicalAddress: '',
    },
  });
  let contratto = new ethers.Contract(
    Contracts().cityCitizenContract.address,
    Contracts().cityCitizenContract.interface,
    signer,
  );
  let contractIn = contratto.connect(signer);
  const { toast } = useToast();
  async function getAddress() {
    const rootWallet = ethers.utils.HDNode.fromMnemonic(
      await getMnemonicData(),
    );
    let id = parseInt(userCount) + 1;
    console.log('PATHcit:', `m/44'/60'/0'/0/${id}`);
    let childWallet = rootWallet.derivePath(`m/44'/60'/0'/0/${id}`); //+1 because in the addCitizen function in the CityCitizen contract, first the id is incresed and then read and stored in the citizen struct

    if (isModify) {
      console.log('OK');
      try {
        const citizen = await contractIn.getCitizen(citizenAddress);
        console.log('nano:', citizen);
        id = citizen?.[7].toString();
        childWallet = rootWallet.derivePath(`m/44'/60'/0'/0/${id}`);
      } catch (error) {
        console.error('Error during getCitizen:', error);
      }
    }
    return [id, childWallet];
  }

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const currentDate = new Date();
    const timestampInMilliseconds = currentDate.getTime();
    const timestamp = Math.floor(timestampInMilliseconds / 1000); //in seconds
    console.log('Valori:', values.CitizenDateOfBirth);
    const [id, wallet] = await getAddress();
    console.log('ID:', id, 'ADDRESS:', wallet);
    await sendAddCitizen(
      values.CitizenName,
      wallet.address,
      timestamp,
      values.CitizenSurname,
      values.CitizenEmail,
      values.CitizenDateOfBirth,
      values.Telephone,
      values.PhysicalAddress,
      isModify,
    );

    setPrivateKey(wallet.privateKey);
    toast({
      title:
        values.CitizenName +
        ' ' +
        values.CitizenSurname +
        ' added successfully',
      description: 'Address:' + wallet.address,
    });
  }
  const getMnemonicData = async () => {
    const res = await fetch('/api', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let response = await res.json();
    console.log('responsejs', response);
    return response;
  };

  function handleStatusKey() {
    if (!showKey) {
      setShowKey(true);
    } else {
      setShowKey(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fieldList.map((item) => (
            <FormField
              control={form.control}
              name={item}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item}</FormLabel>
                  <FormControl>
                    <Input placeholder={item} {...field} />
                  </FormControl>
                  <FormDescription>This is {item} display.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div>
        <TransactionStatus transactionStatus={transactionStatus} />
      </div>
      <div>
        {privateKey ? (
          <Button className="bg-red-500" onClick={handleStatusKey}>
            Click to show private key
          </Button>
        ) : null}
        {showKey ? (
          <span className="bg-transparent border-2 border-gray-700 dark:border-gray-200 px-3 py-2 rounded-md">
            {privateKey}
          </span>
        ) : null}
      </div>
    </div>
  );
}
