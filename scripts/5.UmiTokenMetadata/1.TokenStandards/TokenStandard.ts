// https://developers.metaplex.com/token-metadata/token-standard#the-token-standard-field
export const Fungible = {
  name: "USD Coin",
  symbol: "USDC",
  description: "Fully reserved fiat-backed stablecoin created by Circle.",
  image: "https://www.circle.com/hs-fs/hubfs/sundaes/USDC.png?width=540&height=540&name=USDC.png",
};

export const FungibleAsset = {
  name: "SolanaGame Steel Sword",
  symbol: "SG-SS-1",
  description: "SolanaGame steel sword available after Level 4",
  image: "<https://arweave.net/26YdhY_eAzv26YdhY1uu9uiA3nmDZYwP8MwZAultcE?ext=jpeg>",
  animation_url: "<https://arweave.net/ZAultcE_eAzv26YdhY1uu9uiA3nmDZYwP8MwuiA3nm?ext=glb>",
  external_url: "<https://SolanaGame.io>",
  attributes: [
    {
      trait_type: "attack",
      value: "4",
    },
    {
      trait_type: "defense",
      value: "3",
    },
    {
      trait_type: "durability",
      value: "47",
    },
    {
      trait_type: "components",
      value: "iron: 10; carbon: 1; wood: 2",
    },
  ],
};

export const NonFungible = {
  name: "SolanaArtProject #1",
  description: "Generative art on Solana.",
  image: "https://arweave.net/ysO06edn023KqdO5QGe4ZECZGry1DO19vTgL86AF2Zc",
  animation_url: "https://arweave.net/aMZ8N-TiQkRkyMzAn3UOWCqMyvz42sjIeLUv4i3Aq2s",
  external_url: "https://example.com",
  symbol: "S-NFT",
  attributes: [
    {
      trait_type: "trait1",
      value: "value1",
    },
    {
      trait_type: "trait2",
      value: "value2",
    },
  ],
  properties: {
    files: [
      {
        uri: "https://www.arweave.net/abcd5678?ext=png",
        type: "image/png",
      },
      {
        uri: "https://watch.videodelivery.net/9876jkl",
        type: "unknown",
        cdn: true,
      },
      {
        uri: "https://www.arweave.net/efgh1234?ext=mp4",
        type: "video/mp4",
      },
    ],
    category: "video",

    // @deprecated
    // Do not use - may be removed in a future release.
    // Use on-chain data instead.
    collection: {
      name: "Solflare X NFT",
      family: "Solflare",
    },

    // @deprecated
    // Do not use - may be removed in a future release.
    // Use on-chain data instead.
    creators: [
      {
        address: "xEtQ9Fpv62qdc1GYfpNReMasVTe9YW5bHJwfVKqo72u",
        share: 100,
      },
    ],
  },
};

export const ProgramableNonFungible = {
  name: "SolanaArtProject #1",
  description: "Generative art on Solana.",
  image: "https://arweave.net/26YdhY_eAzv26YdhY1uu9uiA3nmDZYwP8MwZAultcE?ext=jpeg",
  animation_url: "https://arweave.net/ZAultcE_eAzv26YdhY1uu9uiA3nmDZYwP8MwuiA3nm?ext=glb",
  external_url: "https://example.com",
  attributes: [
    {
      trait_type: "trait1",
      value: "value1",
    },
    {
      trait_type: "trait2",
      value: "value2",
    },
  ],
  properties: {
    files: [
      {
        uri: "https://www.arweave.net/abcd5678?ext=png",
        type: "image/png",
      },
      {
        uri: "https://watch.videodelivery.net/9876jkl",
        type: "unknown",
        cdn: true,
      },
      {
        uri: "https://www.arweave.net/efgh1234?ext=mp4",
        type: "video/mp4",
      },
    ],
    category: "video",
  },
};
