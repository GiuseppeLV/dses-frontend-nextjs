import React from 'react';
import { Contracts } from '../tools/InitContracts';
import { useCall, useEthers } from '@usedapp/core';
import { ReadFunction } from '../tools/CallFunction';
import { TransactionStatus } from '../tools/TransactionStatus';
import { useEffect, useState } from 'react';
import { Wallet, ethers } from 'ethers';
import { useSigner } from '@usedapp/core';

function Citizen() {
  const { account, chainId, library } = useEthers();
  const [transactionStatus, setTransactionStatus] = useState('');
  const [check, setCheck] = useState(0);
  const [citWallet, setCitWallet] = useState('');
  const signer = useSigner();
  const getCitizen = ReadFunction(
    Contracts().cityCitizenContract,
    'getCitizen',
    account,
  );
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Interval chiamato!');
      sendRequestSensor();
      setCheck(check + 1);
      console.log('Interval chiamato!', id);
    }, 10000);

    return () => clearInterval(interval);
  }, [check]);
  let id = getCitizen?.[7].toString();
  let wallet;
  let pK;

  console.log('identificativo:', id);
  getPhraseCall().then((result) => {
    setCitWallet(result);
  });

  const sendRequestSensor = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/sampling', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response) {
        const responseJson = await response.json();
        const value = responseJson['data'];
        if (value != 0) {
          let reducedValue = value / 200;
          await consumePollutionToken(
            ethers.utils.parseUnits(reducedValue.toString(), 18),
          );
        }
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch('http://localhost:3001/sampling');
      if (!response.ok) {
        throw new Error('Error during request');
      }
      const responseData = await response.json();
      console.log('Response data:', responseData);
    } catch (error) {
      console.error('Error during get request:', error);
    }
  };
  async function getPhraseCall() {
    let result;
    try {
      const response = await fetch('/api', { method: 'get' });
      return (result = await response.json());
    } catch (error) {
      console.error('Error fetching data:', error);
      return (result = 'Error on fetching');
    }
  }

  const rootWallet = citWallet
    ? ethers.utils.HDNode.fromMnemonic(citWallet)
    : null;
  if (id && rootWallet != null) {
    const childWallet = rootWallet.derivePath(`m/44'/60'/0'/0/${id}`);
    pK = childWallet.privateKey;
    wallet = new ethers.Wallet(childWallet.privateKey, library);
  }

  let contractPK = new ethers.Contract(
    Contracts().cityCitizenContract.address,
    Contracts().cityCitizenContract.interface,
    signer,
  );

  contractPK = contractPK.connect(wallet);

  async function consumePollutionToken(value) {
    const tx = await contractPK.consumePTFromCitizen(value);
    console.log('Loading transaction...');
    const receipt = await tx.wait();
    console.log('Transaction complete...');
  }

  return (
    <div>
      <div>ID:{account ? id : 'null'} </div>
      <div>
        <TransactionStatus transactionStatus={transactionStatus} />
      </div>
      <p>{check}</p>
    </div>
  );
}

export default Citizen;
