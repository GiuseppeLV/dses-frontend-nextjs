# Decentralized System for Environmental Sustainability

## Introduction
This is the front-end project for DSES, you can find the back-end in https://github.com/GiuseppeLV/dses-backend-hardhat.

**The Decentralized System for Environmental Sustainability (DSES)** was created as a blockchain system to incentivize the population to reduce the amount of CO2, especially in the sectors relating to transport and industry. The incentive is given by the presence of NFTs which are attributed to citizens or industries that consume a quantity of CO2 below a certain threshold. The measurement takes place through tokens defined within a contract that implements the ERC-20 and defines the "Pollution Tokens". These are distributed by States/Nations and Cities to the relevant Citizens or Industries and indicate the maximum CO2 production limit for that specific entity.
Using CO2 sensors, sampling of carbon dioxide is carried out inside public transport exhausts (i.e. cars or buses) or industries. The result is converted into Pollution Tokens which will be deducted from the account of the entity that produced CO2 (in our case, the Citizen).
PollutionTokens can be also traded for ETH. In DSES is the State responsable for that action.

### Actors
 •**Admin** : is the one who has the main task of deploying, making changes to contracts and adding new states. 

 •**State** : the participating nation. It has the task of adding new cities to the dApp or removing them. It can also make token transfers to other states that request them.

 •**City** : the participating city. It has the task of adding new Citizens to the dApp or removing them. Each citizen will be assigned a new private key for the creation of a new wallet. 

 •**Citizen** :the participating citizen. It will use the private key provided by the City to create a new wallet and access the dApp. It is the only entity capable of obtaining NFTs. Consume Pollution Token every time data is produced from the CO2 sensor.

## Installation
First of all clone the repository locally: ```git clone https://github.com/GiuseppeLV/dses-frontend-nextjs.git``` then install dependencies with by running ```npm install``` or ```yarn install```.

## Running the server

If you want to run a node locally (```yarn hardhat node``` from the back-end), please remove commented code from ```src/app/homepage/config.js``` and add ```Hardhat``` item in the ```networks``` list, so that Hardhat network can be recognized correctly. Also, add an rpcUrl of your choice to interact with Sepolia, you can use something like Infura or Alchemy.
Also config a correct ```.env``` file.

Now, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000)

Use [MetaMask](https://metamask.io/download/) to interact with the dApp

To run a sensor, just run the nodeSensor.js script using Node.js and
the command:
```bash 
node nodeSensor.js
```
I used an Arduino Uno board with an HC-SR04 sensor just for testing values as a Citizen, 
feel free to use other sensors to test or a real CO2 sensor. The arduinoSensor.ino
contains script for sampling using HC-SR04 sensor. This has to be uploaded to the board.

## Architecture

Here are presented only the main elements of DSES front-end

```plaintext
root/
├── src/
│    │
│    ├──app
│    │   ├── api/
│    │   │   └── route.js => GET function used to obtain mnemonic phrase from the .env
│    │   │      
│    │   ├── homepage/ => this is the main route. It contains all the routes.
│    │   │   ├── add/ => contains components to add new entities to the dApp.
│    │   │   │   ├── Admin.js => admin adding state
│    │   │   │   ├── City.js => city adding citizen. It contains some methods for HDWallet and BIP44,
│    │   │   │   │              these generate a wallet for a Citizen using an ID (a random number, generate with Math.rand). Mnemonic
│    │   │   │   │              phrase is recovered from the .env file.                            
│    │   │   │   ├── State.js => state adding city
│    │   │   │   └── page.js => this will render one of the above components if you are, respectively, 
│    │   │   │                   an Admin, a State or a City. Other pages.js in some other route paths 
│    │   │   │                   have a similar function.
│    │   │   ├── delete/ => contains components to delete entities from the dApp. The composition is 
│    │   │   │              similar to the add/ folder.
│    │   |   ├── history/ => transactions history. Common to State,Admin and City.
│    │   |   │
│    │   │   ├── modify/ => route path path path used to change any states, citizens or cities by, 
│    │   │   │              respectively, an Admin, City or States
│    │   │   ├── nfts/ => this shows nfts possessed by a Citizen
│    │   │   │
│    │   │   ├── notifications/ => shows notifications into a Bell icon 
│    │   │   │   ├── City.js => shows notifications for NoTokenCitizen event, so if a citizen finished his PollutionToken
│    │   │   │   ├── State.js => shows notifications for a receiving trades instances (TradeToken.sol contract)
│    │   │   │   ├── citizen/ [id] => a notification instance of NoTokenCitizen for a City. This will show up the citizen profile.
│    │   │   │   └── trade/ [id] => a trade instance of a trade made by a State for another State.
│    │   │   │ 
│    │   │   ├── profile/ => user profile route. Files are also used as components for other route paths.
│    │   │   │ 
│    │   │   ├── roles/ => contains components for the homepage route path for each of the entities. Each component contains some random code just to show something, only the Citizen.js one is the most important one.
│    │   │   │   │          
│    │   │   │   └── Citizen.js => contains methods for consuming Pollution Tokens using a sensor. To do so, it's important to
│    │   │   │                     recover the private key from the HDWallet using mnemonic phrase and the citizen's ID.     
│    │   │   │                     It's critical to run the nodeSensor.js script to sample values ​​from the sensor.
│    │   │   │   
│    │   │   ├── search/ => route path that contains other sub-route paths, used to make a search by address
│    │   │   │              of a State, City, Citizen. Components are also use by other route paths in the project
│    │   │   │
│    │   │   ├── send/ => used by States to send trade requests for Pollution Tokens, requesting ETH.
│    │   │   │
│    │   │   ├── tools/ => contains functions used several times by other components
│    │   │   │   ├── CallFunction.js => contains useDapp methods for making transactions and reading from the blockchain.
│    │   │   │   ├── InitContracts.js => creates Contracts instances.
│    │   │   │   └── TransactionsStatus.js => component used to show ongoing transaction status.
│    │   │   │
│    │   ├── config.js => used to set configurations for connecting to a provider
│    │   ├── Wallet.js => component used to connect to a provider and interact with the blockchain
│    ├──components => a folder containing some of the persistent component in a page, like Header, Sidebar, Userinfo.
│    │  └──ui => a folder containing shadcn components.
├── constants/
│   ├── X.json => Contracts ABIs (where X is one of the entities)
│   └── NetworkMapping.json => Contracts Addresses
|   
├── nodeSensor.js => running a node with Node.js to send values to this frontend. It's important to setup the correct serial port
├── arduinoSensor.ino => example script for Arduino Uno board with HC-SR04  
├── .gitignore
├── package.json
└── README.md
```

## Useful links
Here are some links used in frontend: <br>
    - [Next.js App Router](https://nextjs.org/docs/app) <br>
    - [useDapp docs](https://usedapp-docs.netlify.app/docs) <br>
    - [ethers v5.7](https://docs.ethers.org/v5/) <br>
    - [bip 44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) <br>
    - [shadcn ui](https://ui.shadcn.com/) <br>

## License
[MIT](https://choosealicense.com/licenses/mit/)
