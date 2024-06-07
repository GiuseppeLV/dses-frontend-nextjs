import { ReadFunction, ReadFunctionNoArgs } from './CallFunction';
import { Contracts } from './InitContracts';

export default function GetCurrency({ ptAmount = 1 }) {
  let currencyConverted = ReadFunctionNoArgs(
    Contracts().pollutionTokenContract,
    'getPTtoEthRate',
  );

  return (
    <div>
      <p className="text-l text-blue-500 underline">
        {ptAmount} PT is equivalent to{' '}
        {(currencyConverted * ptAmount) / 10 ** 18}ETH
      </p>
    </div>
  );
}
