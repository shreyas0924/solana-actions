import { PublicKey } from "@solana/web3.js";

export const DEFAULT_VALIDATOR_VOTE_PUBKEY: PublicKey = new PublicKey(
  "5ZWgXcyqrrNpQHCme5SdC5hCeYb2o3fEJhF7Gok3bTVN"
);

export const DEFAULT_STAKE_AMOUNT: number = 1.0;

export const siteConfig = {
  name: "Solana Actions and Blinks",
  description: "",
  url: "https://",
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/shreyas0924",
    github: "https://github.com/shreyas0924/solana-actions",
    docs: "https://solana.com/docs/advanced/actions",
  },
};
