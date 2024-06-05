import { ethers,utils, Contract, Wallet} from "ethers";
//import { Contract } from '@ethersproject/contracts'
import {ChainId, useEthers, useSigner } from "@usedapp/core";
import { ReadFunction } from "./CallFunction";

const DSESCenterAbi=require("../../../../constants/DSESCenter")
const CityCitizenAbi=require("../../../../constants/CityCitizen")
const CityIndustryAbi=require("../../../../constants/CityIndustry")
const PollutionTokenAbi=require("../../../../constants/PollutionToken")
const PollutionNftAbi=require("../../../../constants/PollutionNft")
const TradeTokenAbi=require("../../../../constants/TradeToken")
//const CTAbi=require("../../../../constants/ChainlinkToolsabi")
const LTAbi=require("../../../../constants/LinkTokenabi")


const networkMapping=require("../../../../constants/NetworkMapping")
export function Contracts(){
const { chainId, account } = useEthers()
let signer=useSigner()



//const chainId=31337
console.log("Actual chain idssss prima:", chainId)
const chainIdString=chainId?.toString();
console.log("Actual chain idssss dopo:", chainIdString);
const DSESCenterAddress = chainId in networkMapping ? networkMapping[chainIdString]["DSESCenter"][0] : null//PROVA A DICHIARARLI DIRETTAMENTE DOVE SONO NECESSARI INVECE DI DICHIARARRLI IN QUESTO SCRIPT APPARTE PER RISOLVERE PROBLEMA DEL NOT DEFINED
const CityCitizenAddress = chainId in networkMapping ? networkMapping[chainIdString]["CityCitizen"][0]: null
//const CityIndustryAddress = chainId in networkMapping ? networkMapping[chainIdString]["CityIndustry"][0]: null
const PollutionTokenAddress = chainId in networkMapping ? networkMapping[chainIdString]["PollutionToken"][0]: null
const PollutionNftAddress = chainId in networkMapping ? networkMapping[chainIdString]["PollutionNft"][0]: null
const TradeTokenAddress = chainId in networkMapping ? networkMapping[chainIdString]["TradeToken"][0]: null

const InterfaceDSESCenter = new utils.Interface(DSESCenterAbi);
const InterfaceCityCitizen = new utils.Interface(CityCitizenAbi);
//const InterfaceCityIndustry = new utils.Interface(CityIndustryAbi);
const InterfacePollutionToken = new utils.Interface(PollutionTokenAbi);
const InterfacePollutionNft = new utils.Interface(PollutionNftAbi);
const InterfaceTradeToken = new utils.Interface(TradeTokenAbi);
const InterfaceLT = new utils.Interface(LTAbi);
/*
const citizen=ReadFunction(CityCitizenAddress!=null ? new Contract(CityCitizenAddress, InterfaceCityCitizen,signer):undefined, 'getCitizen', account)

if(citizen){
    console.log("citizen:",citizen)
    const pk=getPrivateKey(citizen)
    signer= new Wallet(pk,signer.provider)
}
//const InstanceDSESCenter = new Contract("0x041B7E8C4a5038A05c8106E39062530b647a8556", InterfaceDSESCenter);
*/
const InstanceDSESCenter = DSESCenterAddress!=null ? new Contract(DSESCenterAddress, InterfaceDSESCenter):undefined;
const InstanceCityCitizen = CityCitizenAddress!=null ? new Contract(CityCitizenAddress, InterfaceCityCitizen):undefined;
//const InstanceCityIndustry = CityIndustryAddress!=null ? new Contract(CityIndustryAddress, InterfaceCityIndustry,signer):undefined;
const InstancePollutionToken = PollutionTokenAddress!=null ? new Contract(PollutionTokenAddress, InterfacePollutionToken):undefined;
const InstancePollutionNft = PollutionNftAddress!=null ? new Contract(PollutionNftAddress, InterfacePollutionNft):undefined;
const InstanceTradeToken = TradeTokenAddress!=null ? new Contract(TradeTokenAddress, InterfaceTradeToken):undefined;
console.log("Initcontracts pt:", InstancePollutionToken)
const InstanceLT = new Contract("0x779877A7B0D9E8603169DdbD7836e478b4624789", InterfaceLT);
console.log("Contratto address:", InstanceDSESCenter.address)
console.log("Contratto addresspt:", InstancePollutionToken.address)
console.log("Contratto instanceDsesCenter:", InstanceDSESCenter.address)
console.log("Contratto td:", InstanceTradeToken.address)


return{
    dsesCenterContract:InstanceDSESCenter,
    cityCitizenContract:InstanceCityCitizen,
    //cityIndustryContract:InstanceCityIndustry,
    ltContract:InstanceLT,
    pollutionTokenContract:InstancePollutionToken,
    pollutionNftContract:InstancePollutionNft,
    interfaceCityCitizen: InterfaceCityCitizen,
    cityCitizenAddress:CityCitizenAddress,
    tradeTokenContract: InstanceTradeToken
}
}

