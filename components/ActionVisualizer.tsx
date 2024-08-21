"use client";

import { Action, Blink, useAction } from "@dialectlabs/blinks";
import { useEffect, useState } from "react";
import "@dialectlabs/blinks/index.css";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";

type ActionVisualizerProps = {
  url: string;
};

export function ActionVisualizer({ url }: ActionVisualizerProps) {
  const [actionState, setactionState] = useState<Action | null>(null);

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
    <Blink
      action={actionState as Action}
      websiteText={new URL(url).hostname}
      stylePreset="x-dark"
    />
  ) : null;
}
