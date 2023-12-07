'use client';
import React, { useEffect, useMemo } from "react";
import { HypercertClient, HypercertClientConfig } from "@hypercerts-org/sdk";
import { BrowserProvider } from "ethers"
import { WalletClient, useWalletClient, useNetwork } from "wagmi";
import { DEFAULT_CHAIN_ID, 
    
    OVERRIDE_CHAIN_NAME,
    OVERRIDE_GRAPH_URL,
    CONTRACT_ADDRESS,
    UNSAFE_FORCE_OVERRIDE_CONFIG, } from "@/lib/config";


const clientConfig: Partial<HypercertClientConfig> = {
    chainId: BigInt(DEFAULT_CHAIN_ID || 5)
};

// function loadOverridingConfig(clientConfig: Partial<HypercertClientConfig>) {
      
//     if (OVERRIDE_GRAPH_URL) {
//       clientConfig.graphUrl = OVERRIDE_GRAPH_URL;
//     }
  
//     if (CONTRACT_ADDRESS) {
//       clientConfig.contractAddress = CONTRACT_ADDRESS;
//     }
  
//     if (UNSAFE_FORCE_OVERRIDE_CONFIG) {
//       clientConfig.unsafeForceOverrideConfig = UNSAFE_FORCE_OVERRIDE_CONFIG;
//     }
//   }
//   loadOverridingConfig(clientConfig);

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
          chainId: BigInt(chain.id),
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