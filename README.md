# Zenvia API Functions Repository

This repository contains various functions designed to interact with the Zenvia API. These functions aim to simplify the process of fetching and manipulating data from the Zenvia platform, making it easier for developers to integrate Zenvia's services into their applications.

## Project Description

The Zenvia API Functions Repository is a collection of useful functions to interact with the Zenvia API. This repository is intended to help developers integrate Zenvia's communication services more efficiently. 
The initial function implemented in this repository is designed to fetch prospects within a specified date range.

## Installation

To use the functions in this repository, you will need to have Node.js and npm installed on your machine. You can clone the repository and install the necessary dependencies using the following commands:

```bash
git clone https://github.com/yourusername/zenvia-api-functions.git
cd zenvia-api-functions
npm install
```

## Functions

### getProspects

* The Zenvia API `getProspects` returns a filterable list of prospects. 
* The API has a limitation to get all data, only retrieving the last 31 days of data. 
* The function `fetchAllData` generates a cycle to fetch data and, when finished, it creates a JSON file with all the data.
