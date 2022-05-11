# Introduction
The DeFiBasket-API is a collection of code used to generate the API available at [API link](https://defibasket.org/api/). This API is used by DeFiBasket's frontend and other peripheral applications, such as DeFi Llama adapter and [Baskboard](https://baskboard.vercel.app).

This project is not intended to be run separately, but to shine light on the code currently running in our servers. Our intention is to open source 100% of DeFiBasket's code in the near future, which include this API and many others, but there are some steps we need to undertake until then.

# Getting Started

## Pre-requisites
- "mongodb": "4.3",
- "next": "12",
- "react": "^17.0.2",
- "react-dom": "^17.0.2",
- "@sentry/nextjs": "^6.17.3",

## Project organisation
The folders and files in this projects mimics the overall organization of that of DeFiBasket's current frontend. We're only including files that are directly required to understand the formation of the data served by the APIs.

Calls to mongoDB require authentication with user/pass. This information is stored locally on each development environment for safety reasons.

# API Reference

### `GET` `/api/v1/get-tvl`

### Description

This method returns a JSON with key Total Value Locked (TVL) by network in USD. TVL for DeFi Basket is calculated as the sum of individual values for each asset of each basket in a given set of networks. 

The `network` field is an array of objects containing the network name and the TVL associated to it.

The `tvl` field is the sum of TVLs for all networks.

### Request

URL: `https://defibasket.org/api/v1/get-tvl`
Method: `GET`

### Response

Model:

 ```{
  "networks": [
    {
      "network": string
      "tvl": float
    }
  ],
  "tvl": float
}```

Example:

```{
  "networks": [
    {
      "network": "polygon",
      "tvl": 127618.04831480393
    }
  ],
  "tvl": 127618.04831480393
}```
  
# Database
DeFiBasket uses MongoDB in its backend to register and organize all interactions with its smart contracts. Currently we don't have a public access to it.

# Contacts
If you have any questions or want to contribute to this projects, please join us in our [`Discord`](https://discord.gg/5AVTGwkCEs).

# License
GPL 3.0