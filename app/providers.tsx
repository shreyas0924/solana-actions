"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import "@solana/wallet-adapter-react-ui/styles.css";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

  if (!mounted) {
    return null;
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col">
              <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                  <MainNav />
                  <nav className="flex items-center gap-2">
                    <Link target="_blank" href={siteConfig.links.docs}>
                      <Button>Read the Docs</Button>
                    </Link>
                    <WalletMultiButton />
                    <ModeToggle />
                  </nav>
                </div>
              </header>
              <div
                className={cn(
                  "before:absolute z-[-1] before:h-[300px] before:w-full before:translate-x-1/4 before:translate-y-52 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-5 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"
                )}
              ></div>
              <main className={"flex-1 space-y-10 max-w-screen-xl mx-auto"}>
                {children}
              </main>
            </div>
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
