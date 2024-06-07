import { ethers, utils, Contract, Wallet } from 'ethers';
//import { Contract } from '@ethersproject/contracts'
import { ChainId, useEthers, useSigner } from '@usedapp/core';

const DSESCenterAbi = require('../../../../constants/DSESCenter');
const CityCitizenAbi = require('../../../../constants/CityCitizen');
const CityIndustryAbi = require('../../../../constants/CityIndustry');
const PollutionTokenAbi = require('../../../../constants/PollutionToken');
const PollutionNftAbi = require('../../../../constants/PollutionNft');
const TradeTokenAbi = require('../../../../constants/TradeToken');

const networkMapping = require('../../../../constants/NetworkMapping');
export function Contracts() {
  const { chainId, account } = useEthers();

  const chainIdString = chainId?.toString();
  const DSESCenterAddress =
    chainId in networkMapping
      ? networkMapping[chainIdString]['DSESCenter'][0]
      : null;

  const CityCitizenAddress =
    chainId in networkMapping
      ? networkMapping[chainIdString]['CityCitizen'][0]
      : null;

  //const CityIndustryAddress = chainId in networkMapping ? networkMapping[chainIdString]["CityIndustry"][0]: null
  const PollutionTokenAddress =
    chainId in networkMapping
      ? networkMapping[chainIdString]['PollutionToken'][0]
      : null;

  const PollutionNftAddress =
    chainId in networkMapping
      ? networkMapping[chainIdString]['PollutionNft'][0]
      : null;

  const TradeTokenAddress =
    chainId in networkMapping
      ? networkMapping[chainIdString]['TradeToken'][0]
      : null;

  const InterfaceDSESCenter = new utils.Interface(DSESCenterAbi);
  const InterfaceCityCitizen = new utils.Interface(CityCitizenAbi);
  //const InterfaceCityIndustry = new utils.Interface(CityIndustryAbi);
  const InterfacePollutionToken = new utils.Interface(PollutionTokenAbi);
  const InterfacePollutionNft = new utils.Interface(PollutionNftAbi);
  const InterfaceTradeToken = new utils.Interface(TradeTokenAbi);

  const InstanceDSESCenter =
    DSESCenterAddress != null
      ? new Contract(DSESCenterAddress, InterfaceDSESCenter)
      : undefined;

  const InstanceCityCitizen =
    CityCitizenAddress != null
      ? new Contract(CityCitizenAddress, InterfaceCityCitizen)
      : undefined;

  //const InstanceCityIndustry = CityIndustryAddress!=null ? new Contract(CityIndustryAddress, InterfaceCityIndustry,signer):undefined;
  const InstancePollutionToken =
    PollutionTokenAddress != null
      ? new Contract(PollutionTokenAddress, InterfacePollutionToken)
      : undefined;

  const InstancePollutionNft =
    PollutionNftAddress != null
      ? new Contract(PollutionNftAddress, InterfacePollutionNft)
      : undefined;

  const InstanceTradeToken =
    TradeTokenAddress != null
      ? new Contract(TradeTokenAddress, InterfaceTradeToken)
      : undefined;

  return {
    dsesCenterContract: InstanceDSESCenter,
    cityCitizenContract: InstanceCityCitizen,
    //cityIndustryContract:InstanceCityIndustry,
    pollutionTokenContract: InstancePollutionToken,
    pollutionNftContract: InstancePollutionNft,
    interfaceCityCitizen: InterfaceCityCitizen,
    cityCitizenAddress: CityCitizenAddress,
    tradeTokenContract: InstanceTradeToken,
  };
}
