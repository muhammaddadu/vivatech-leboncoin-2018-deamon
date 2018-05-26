# Vivatech LebonCoin 2018 Deamon
> Deamon that watches a smart contract and executes IoT commands

## Requirements

- Raspberry Pi
- Servo
- Raspbian OS
- Node.js

## Deployment

1) Clone this repository
2) Run `npm install`
3) Install PM2 `npm i -g pm2`
4) Start the deamon `pm2 start .`
5) Autostart deamon on starup `pm2 startup`

Note: you will have to compile the contracts on an OS that is not linux due to it not supporting solc.

## Testing

The smart contracts in solidity are bundled with tests. You can run them with [Truffle](http://truffleframework.com).
