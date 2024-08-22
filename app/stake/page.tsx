"use client";
import "@dialectlabs/blinks/index.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SolanaQRCode } from "@/components/qr-code";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DevnetAlert } from "@/components/devnet-alert";
import { siteConfig } from "@/lib/constants";
import { ActionVisualizer } from "@/components/ActionVisualizer";

export default function Stake() {
  const apiPath = "/api/actions/stake";
  const [apiEndpoint, setApiEndpoint] = useState("");
  useEffect(() => {
    setApiEndpoint(new URL(apiPath, window.location.href).toString());

    return () => {
      setApiEndpoint(new URL(apiPath, window.location.href).toString());
    };
  }, []);

  return (
    <section
      id="action"
      className={
        "container space-y-12  py-8 dark:bg-transparent md:py-12 lg:py-24"
      }
    >
      <DevnetAlert />

      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Stake SOL
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          The following example demonstrates how to stake SOL to a validator
          using an Action and the SPL Stake program.
        </p>
      </div>

      <div className="flex gap-6 items-center">
        {/* <Card className="group-hover:border-primary max-w-[80vw] md:max-w-[400px] aspect-square rounded overflow-clip text-center flex items-center justify-center mx-auto">
          <SolanaQRCode
            url={apiPath}
            color="white"
            background="black"
            size={400}
            className="rounded-lg aspect-square [&>svg]:scale-75 md:[&>svg]:scale-100"
          />
        </Card> */}
        {apiEndpoint && <ActionVisualizer {...{ url: apiEndpoint }} />}
      </div>

      <Card className="group-hover:border-primary">
        <CardHeader>
          <CardTitle className="space-y-3">Action Endpoint</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            <Link
              href={apiEndpoint}
              target="_blank"
              className="underline hover:text-primary"
            >
              {apiEndpoint}
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
