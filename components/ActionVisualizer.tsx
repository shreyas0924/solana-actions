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
    "https://devnet.helius-rpc.com/?api-key=f51ac02d-ad2a-4a65-8874-dbbdf10182bd"
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
