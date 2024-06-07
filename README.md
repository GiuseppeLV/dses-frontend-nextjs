## Introduction
This is the front-end project for DSES, you can find the back-end in https://github.com/GiuseppeLV/dses-backend-hardhat.

**The Decentralized System for Environmental Sustainability (DSES)** was created as a blockchain system to incentivize the population to reduce the amount of CO2, especially in the sectors relating to transport and industry. The incentive is given by the presence of NFTs which are attributed to citizens or industries that consume a quantity of CO2 below a certain threshold. The measurement takes place through tokens defined within a contract that implements the ERC-20 and defines the "Pollution Tokens". These are distributed by States/Nations and Cities to the relevant Citizens or Industries and indicate the maximum CO2 production limit for that specific entity.
Using CO2 sensors, sampling of carbon dioxide is carried out inside public transport exhausts (i.e. cars or buses) or industries. The result is converted into Pollution Tokens which will be deducted from the account of the entity that produced CO2. 
PollutionTokens can be also traded for ETH. In DSES is the State responsable for that action.

## Installation
First of all clone the repository locally: ```git clone https://github.com/GiuseppeLV/dses-frontend-nextjs.git``` then install dependencies with by running ```npm install``` or ```yarn install```.

## Running the server

First, run the development server:

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

Use [MetaMask](https://metamask.io/download/) to interact with the dApp.

## Architecture

Here is presented main elements of DSES front-end

```plaintext
root/
├── src/
│   ├── api/
│   │   └── route.js => GET function used to obtain mnemonic phrase from the .env
│   │      
│   ├── homepage/ => this is the main route. It contains all the routes.
│   │   └── add/ => contains components to add new entities to the dApp.
│   │       ├── Admin.js => admin adding state
│   │       ├── City.js => city adding citizen
│   │       ├── State.js => state adding city
│   │       └── page.js => this will render one of the above components if you are, respectively, an Admin, a State or a City.
│   │   └── delete/ => contains components to delete entities from the dApp. The composition is similar to the add/ folder.
│   |   └── history/ => transactions history. Common to State,Admin and City.
│   │ 
│   │ 
│   │ 
│   │ 
│   │ 
│   │ 
│   │ 
│   │ 
│   │ 
│   ├── styles/
│   │   └── main.css
│   └── index.js
├── constants/
│   ├── X.json => Contracts ABIs
│   └── NetworkMapping.json => Contracts Addresses
|   
|   
├── .gitignore
├── package.json
└── README.md

## License
[MIT](https://choosealicense.com/licenses/mit/)
