'use client'
import { User,Home, Earth, Warehouse, PersonStanding, History, FileBadge2,Trash2,HandCoins,Plus, Replace, Search  } from "lucide-react"
import UserInfo from "./UserInfo"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import Link from "next/link"
import { ReadFunction } from "@/app/homepage/tools/CallFunction"
import { Contracts } from "@/app/homepage/tools/InitContracts"
import { useEthers } from "@usedapp/core"
import { useState, useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
export default function Sidebar(){
const {account}=useEthers()
  const admin=account?ReadFunction(Contracts().dsesCenterContract,'checkExistingAdmin', account):false
  const state=account?ReadFunction(Contracts().dsesCenterContract,'checkExistingState', account):false
  const city=account?ReadFunction(Contracts().dsesCenterContract,'checkExistingCity', account):false
  const citizen=account?ReadFunction(Contracts().cityCitizenContract,'checkExistingCitizen', account):false
  const [currentUser, setCurrentUser]=useState('')
  console.log("Admin:", admin)
  let currentRole;
  let crudOptions=["add","delete","update"]
  admin?currentRole="admin":(state?currentRole="state":(city?currentRole="city":(citizen?currentRole="citizen":"guest")))
  console.log("currentrole:", currentRole)
  let text
    const items=[
      {
        link:"/homepage/add",
        text:"Add",
        icon: <Plus/>,
        roles:["admin","state","city"],
    },
      {
        link:"/homepage/delete",
        text:"Delete",
        icon: <Trash2/>,
        roles:["admin","state","city"],
    },
    {
      link:"/homepage/modify",
      text:"Modify",
      icon: <Replace/>,
      roles:["admin","state","city"],
  },

    ]


    const searchItems=[
      {
        link:"/homepage/search/State",
        text:"State",
        icon: <Earth/>,
        roles:["admin","state","city", "citizen"],
    },
      {
        link:"/homepage/search/City",
        text:"City",
        icon: <Warehouse/>,
        roles:["admin","state","city","citizen"],
    },
    {
      link:"/homepage/search/Citizen",
      text:"Citizen",
      icon: <PersonStanding/>,
      roles:["admin","state","city", "citizen"],
  },

    ]
    const menuList=[
        {
            group:"General",
            items:[
              {
                link:"/homepage",
                text:"Home",
                icon:<Home/>,
                roles:["admin", "state", "city", "citizen"],
                isAccordion:false
              },
              {
                  link:"/homepage/profile",
                  text:"Profile",
                  icon: <User/>, //from https://lucide.dev/icons/user
                  roles:["state", "city", "citizen"],
                  isAccordion:false
              },
              {                
                link:"/homepage/history",
                text:"History",
                icon: <History/>,
                roles:["admin","state", "city"],
                isAccordion:false
              },

                {
                  link:"/homepage/nfts",
                  text:"NFTs",
                  icon: <FileBadge2/>,
                  roles:["citizen"],
                  isAccordion:false
                },
                {
                  text:"Search entity",
                  icon: <Search/>,
                  roles:["citizen", "city", "admin", "state"],
                  isAccordion:true,
                  objects: searchItems
                }

          ]
            
        },

        {
            group:"Operations",
            items:[
            
            {
              text:"State operations",
              icon: <Earth/>,
              roles:["admin"],
              isAccordion:true,
              objects: items
            },
            {
              text:"City operations",
              icon: <Warehouse/>,
              roles:["state"],
              isAccordion:true,
              objects: items
            },
            {
              text:"Citizen operations",
              icon: <PersonStanding/>,
              roles:["city"],
              isAccordion:true,
              objects:items
            },
            {
              link:"/homepage/send",
              text:"Sell PT",
              icon: <HandCoins/>,
              roles:["state"]  
          },

            ]
        }
    ]
    
    return (<div className="fixed flex flex-col gap-4 w-[300px] min-w-[300px] border-r min-h-screen p-4">
    <div>
      <UserInfo />
    </div>
    <div className="grow">
      <Command style={{ overflow: 'visible' }}>
        <CommandList style={{ overflow: 'visible' }}>
          {menuList.map((menu, key) => (
            <CommandGroup key={key} heading={menu.group}>
              {menu.items.map((option, optionKey) =>
              option.roles.includes(currentRole)?(
              option.isAccordion?(
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
              {option.icon}
              {option.text}
              </AccordionTrigger>
              {option.objects.map((object,objectKey)=> 
                  <AccordionContent>             
                  <Link key={objectKey} href={object.link} >
                  <span className="flex justify-between space-x-4">
                    {object.icon}
                    {object.text}
                  </span> 
                  </Link>
                  
                  </AccordionContent>)}
                </AccordionItem>
              </Accordion>
              
             
          ):
              <Link href={option.link} >
                <CommandItem key={optionKey} className="flex gap-2 cursor-pointer">
                  {option.icon}
                  {option.text}
                </CommandItem>
                </Link>):console.log("null")
              )}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>

    </div>
    <div>Settings / Notifications</div>
  </div>);
   
  }