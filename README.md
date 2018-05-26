# Vivatech LebonCoin 2017 Deamon
> Deamon that watches a smart contract and executes an IOT command

## Requirements

- Raspberry PI
- Servo
- Raspbian OS
- Node

## Deployment

1) Clone this repository
2) Run `npm install`
3) Install PM2 `npm i -g pm2`
4) Start the deamon `pm2 start .`
5) Autostart deamon on starup `pm2 startup`

Note: you will have to compile the contracts on an OS that is not linux due to it not supporting solc.
