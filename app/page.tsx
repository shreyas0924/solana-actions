import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CoinsIcon,
  FileTextIcon,
  ImageIcon,
  ShieldIcon,
  WalletIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/constants";

const actionCards: Array<{
  title: string;
  href: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}> = [
  {
    title: "On-chain Memo",
    href: "/memo",
    description: "Send a simple message on-chain using an SPL Memo.",
    icon: <FileTextIcon className="size-12" />,
  },
  {
    title: "Staking SOL",
    href: "/stake",
    description:
      "Help secure the Solana network by staking SOL to a validator.",
    icon: <ShieldIcon className="size-12" />,
  },
  {
    title: "Transfer Native SOL",
    href: "/transfer",
    description: "Easily transfer native SOL to any other Solana wallet.",
    icon: <WalletIcon className="size-12" />,
  },
  // {
  //   title: "Transfer SPL Tokens",
  //   href: "/transfer-spl",
  //   description: "Easily transfer SPL tokens to any other Solana wallet.",
  //   icon: <CoinsIcon className="size-12" />,
  // },
  // {
  //   title: "Mint an NFT",
  //   href: "/mint-nft",
  //   description:
  //     "Allow anyone to claim a digital collectible from a Collection.",
  //   icon: <ImageIcon className="size-12" />,
  // },
];

export default async function Pages() {
  return (
    <section
      id="features"
      className={
        "container space-y-12  py-8 dark:bg-transparent md:py-12 lg:py-24"
      }
    >
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {actionCards.map((item, key) => (
          <Link key={key} href={item.href} className="group">
            <Card className="group-hover:border-primary">
              <CardHeader>
                <CardTitle className="space-y-3">
                  {item.icon}
                  <span className="block font-bold group-hover:text-pretty">
                    {item.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
