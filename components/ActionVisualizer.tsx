"use client";

import { Action, Blink, useAction } from "@dialectlabs/blinks";
import { useEffect, useState } from "react";
import "@dialectlabs/blinks/index.css";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { useTheme } from "next-themes";

type ActionVisualizerProps = {
  url: string;
};

export function ActionVisualizer({ url }: ActionVisualizerProps) {
  const [actionState, setactionState] = useState<Action | null>(null);
  const { theme } = useTheme();
  //Devnet only for now
  const { adapter } = useActionSolanaWalletAdapter(
    process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
  );
  const { action } = useAction({
    url,
    adapter,
  });

  useEffect(() => {
    setactionState(action);
  }, [action]);
  return actionState ? (
    <div className="md:w-1/2 w-full mx-auto">
      <Blink
        action={actionState as Action}
        websiteText={new URL(url).hostname}
        stylePreset={theme === "dark" ? "x-dark" : "x-light"}
      />
    </div>
  ) : (
    <div>{`Loading....`}</div>
  );
}
