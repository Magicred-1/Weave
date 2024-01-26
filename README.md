<a href="https://weave-three.vercel.app"><img src ="./public/banner.png" alt="Weave Logo" width="100%"/></a>

# [Weave](#) - Connecting Web3, One Thread at a Time. !
## Powered by <img src="https://www.mtpelerin.com/images/rate-calculator/flag-gho.svg" alt="GHO Logo" width="35"/> GHO Token.

🏆 🏊 Family Pool Prize Winner

At Weave, we believe in the power of networking as a way create limitless amount of possibilities that WEB3 brings to the world.

Our **interactive map** is designed to help people meet each other at IRL Events, to make events visible to everyone and rewards active users with a integrated leaderboard.

# Preview

The app is deployed on Vercel and can be accessed at [https://weave-three.vercel.com](https://www.weave-three.vercel.com)

## Getting started

Install dependencies

```bash
pnpm i
```

Copy `.env.example` to `.env.local` and set the NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, NEXT_PUBLIC_INFURA_ID, SESSION_SECRET, NEXT_PUBLIC_CONTRACT_ADDRESS, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_SECRET, NEXT_PUBLIC_PINATA_API_KEY.

To get a WalletConnect project ID, go to [https://cloud.walletconnect.com/sign-in](https://cloud.walletconnect.com/sign-in)
Here also the link for Infura : [https://app.infura.io/](https://app.infura.io/)

To generate a random session secret, you can use openssl

```bash
openssl rand -base64 32
```

## Deployed Contracts

| CONTRACTS              | ADDRESSES                                  |
|------------------------|--------------------------------------------|
| Weave Contract         | 0x5f856baB0F63a833b311fC9d853a14c8762d583d |
| Leaderboard Contract   | 0x39545602B72Bd4a74FE1f4AF755c15C71C9780F0 |
| Vault Contract         | 0x6a6C3b42e1af8BCd9adD11DFaDb9ab8445497914 |
| Event Factory Contract | 0x815257a8A46F2dE5F812DC3232CC0C0c24A7252a |
| Event Contract         | X                                          |

## Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Leaflet](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Wagmi](https://wagmi.io/)
- [ConnectKit SDK](https://docs.family.co/connectkit)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [IPFS](https://ipfs.io/)
- [INFURA](https://infura.io/)
- [Pinata SDK](https://www.pinata.cloud/)
- [mui v5](https://mui.com/)
- [Radix UI](https://www.radix-ui.com/)

## Contributing

Weave is an open source project. We are happy to receive your contributions to the project.

## License

Weave is [MIT licensed](./LICENSE).

## Authors

- [Magicred-1](https://github.com/Magicred-1/)
- [Sakshi](https://github.com/SakshiShah29)
