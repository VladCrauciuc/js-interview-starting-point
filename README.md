# Javascript Interview Starting Point

This repo will serve as a starting point for your code challenge. Feel free to change anything in order to complete it: Add modules, other tests, new packages etc.

## Steps

- Fork this repo
- Clone your fork
- Finish the exercise
- Push your best work

## Commands

```
yarn run start  # Run the main script
         dev    # Start development mode
         test   # Test the code
```

## Tools

- Write modern JS with [babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- Test your code with [jest](https://www.npmjs.com/package/jest)

---

Good luck!

## Overview

You have been hired by a company that builds an app for coffee addicts. You are
responsible for taking the user’s location and returning a list of the three closest coffee shops.

## Input

The coffee shop list comes from an API defined in: https://api-challenge.agilefreaks.com/swagger/index.html?url=/v1/docs.json#/

It also requires a token, given by the same API.

The response of this API may fail occasionally. The program should handle the different responses.

Your program will be executed directly from the command line and will be provided two arguments in the following order: `<user x coordinate> <user y coordinate>`, such as

```
yarn start <user x coordinate> <user y coordinate>
```

## Usage

```
yarn start <user x coordinate> <user y coordinate>
```

Validation will only accept two valid number inputs; less or more than two numbers, strings, arrays will fail and return a warning. Number inputs with commas will have it replaced with decimal point and pass.

```
yarn test
```

Test provided for token fetch/failure, full shop list fetch/failure, array of closest shops being passed to the main function, and error catching.
Coverage report is also provided upon testing.
