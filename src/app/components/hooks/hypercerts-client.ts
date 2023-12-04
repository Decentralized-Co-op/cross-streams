import React, { useEffect, useMemo } from "react";
import { HypercertClient, HypercertClientConfig } from "@hypercerts-org/sdk";
import { BrowserProvider } from "ethers"
import { WalletClient, useWalletClient, useNetwork } from "wagmi";


const clientConfig: Partial<HypercertClientConfig> = {
    chainId: process.env.DEFAULT_CHAIN_ID || 5
}
const defaultClient = new HypercertClient(clientConfig);

const walletClientToSigner = (walletClient: WalletClient) => {
    const { account, chain, transport } = walletClient;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const provider = new BrowserProvider(transport, network);
    const signer = provider.getSigner(account.address);
    return signer;
  };

const useEthersSigner = ({ chainId }: { chainId?: number } = {}) => {
const { data: walletClient } = useWalletClient({ chainId });
return useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
);
};

export const useHypercertClient = () => {
    const { chain } = useNetwork();
    const signer = useEthersSigner({ chainId: chain?.id });
  
    const [client, setClient] = React.useState<HypercertClient>(defaultClient);
    const [isLoading, setIsLoading] = React.useState(false);
  
    useEffect(() => {
      if (chain?.id && signer) {
        setIsLoading(true);
  
        const config = {
          chainId: chain.id,
          operator: signer,
        };
        try {
          const client = new HypercertClient(config);
          setClient(client);
        } catch (e) {
          console.error(e);
        }
      }
  
      setIsLoading(false);
    }, [chain?.id, signer]);
  
    return { client, isLoading };
  };