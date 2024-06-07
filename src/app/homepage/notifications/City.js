'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BellIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLogs } from '@usedapp/core';
import { Contracts } from '../tools/InitContracts';
import Link from 'next/link';
export default function CityNotification() {
  const logs = useLogs(
    {
      contract: Contracts().cityCitizenContract,
      event: 'NoTokenCitizen',
      args: [],
    },
    {
      fromBlock: 0,
      toBlock: 'latest',
    },
  );

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative" variant="outline" size="icon">
            <BellIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {logs?.value?.map((item, key) => (
            <Link
              href={`/homepage/notifications/citizen/${key}?address=${item.data[0]}`}
            >
              <DropdownMenuItem
                key={key}
                className="py-2 px-3 cursor-pointer hover:bg-neutral-50 transition flex items-start gap-2"
              >
                <div className={`h-3 w-3 rounded-full my-1 `}></div>
                <div>
                  <p className="text-[14px] font-bold bg-red-600">
                    No token citizen
                  </p>
                  <p>Address:{item.data[0]}</p>
                  <p className="text-xs text-neutral-500">
                    {getDate(item.data[1])}
                  </p>
                </div>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function getDate(timestamp) {
  const date = new Date(parseInt(timestamp) * 1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
}
