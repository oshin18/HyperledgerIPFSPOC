# Gravitas Assignment

Gravitas Assignment is a POC for the defined use case and is implemented using Node.js, MongoDB, Hyperledger Fabric and IPFS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

* [Node.js 8.X](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com/download-center)
* [IPFS](https://docs.ipfs.io/introduction/install/)


## Database Setup

You need to change the Company Seed in the config folder in the relevant json file. Please enter the hyperledger code in the code entry. This step needs to be done before starting the server as the company registration is done at the time when you first start the server. 

If you already started the server then you need to drop the user table from the database to re-register the Company.

## Start Server

Start the development server:
`npm start`
Start the server in debug mode:
`npm run debug`

Server is running at http://localhost:5000
For Swagger documentation, go to http://localhost:5000/api-docs


## Running the tests

For running tests : 


```
npm test
```

NOTE: Test cases are implemented.

## Running lint

Verifying code style and practices.

`npm run lint`

Fix Lint issues

`npm run lint-fix`

This will verify that all code matches the lint guidelines.

## Considerations And Assumptions

1. We are considering only one contract per Vendor.

2. Company can register any number of Vendors and Customers.

3. Company can raise a contract with a vendor.

4. Vendor can accept or reject a contract.

5. Vendor can share his contract with one of the customers.