# [Weave](#) - Connecting Web3, One Thread at a Time. ! 
## Powered by <img src="https://www.mtpelerin.com/images/rate-calculator/flag-gho.svg" alt="GHO Logo" width="35"/> GHO Token.

At Weave, we believe in the power of networking as a way create limitless amount of possibilities that WEB3 brings to the world.

Our **interactive map** is designed to help people meet each other at IRL Events, to make events visible to everyone and rewards active users with a integrated leaderboard.

## Getting started

Install dependencies

```bash
pnpm i
```

Copy `.env.example` to `.env.local` and set the NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, NEXT_PUBLIC_INFURA_ID and SESSION_SECRET.

To get a WalletConnect project ID, go to [https://cloud.walletconnect.com/sign-in](https://cloud.walletconnect.com/sign-in)
Here also the link for Infura : [https://app.infura.io/](https://app.infura.io/)

To generate a random session secret, you can use openssl

```bash
openssl rand -base64 32
```
