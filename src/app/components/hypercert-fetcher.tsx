'use client';
import { spawn } from "../../lib/common";
//import { DataProvider } from "@plasmicapp/loader-nextjs";
import qs from "qs";
import React, { ReactNode } from "react";
import { useHypercertClient } from "../components/hooks/hypercerts-client";
import { loadHypercert, Hypercert } from "../../lib/hypercert";


const DATAPROVIDER_NAME = "hypercertData";
const QUERYSTRING_SELECTOR = "claimId";

export interface HypercertFetcherProps {
  className?: string; // Plasmic CSS class
  variableName?: string; // Name to use in Plasmic data picker
  children?: ReactNode; // Show after done loading
  loading?: ReactNode; // Show during loading if !ignoreLoading
  ignoreLoading?: boolean; // Skip the loading visual
  useQueryString?: boolean; // Forces us to try the query string first
  byClaimId?: string; // Fetch by claimId
  byMetadataUri?: string; // Fetch by metadataUri; If both are specified, byMetadataUri will override the URI in the claim
}

export function HypercertFetcher(props: HypercertFetcherProps) {
  const {
    className,
    variableName,
    children,
    loading,
    ignoreLoading,
    useQueryString,
    byClaimId,
    byMetadataUri,
  } = props;
  const [data, setData] = React.useState<Hypercert | undefined>();
  const { client } = useHypercertClient();

  React.useEffect(() => {
    spawn(
      (async () => {
        const hashQueryString = window.location.hash.slice(
          window.location.hash.startsWith("#") ? 1 : 0,
        );
        const searchQueryString = window.location.search.slice(
          window.location.search.startsWith("?") ? 1 : 0,
        );
        const hashQuery = qs.parse(hashQueryString);
        const searchQuery = qs.parse(searchQueryString);

        const qClaimId = (hashQuery[QUERYSTRING_SELECTOR] ??
          searchQuery[QUERYSTRING_SELECTOR]) as string;

        const claimId = useQueryString
          ? qClaimId ?? byClaimId
          : byClaimId ?? qClaimId;

        const hypercert = await loadHypercert(client, {
          claimId: claimId,
          metadataUri: byMetadataUri,
          overrideMetadataUri: useQueryString && byMetadataUri !== undefined,
        });
        console.log(
          `Hypercert name='${hypercert.name}' claimId=${claimId}, metadataUri=${hypercert.metadataUri}: `,
          hypercert,
        );
        setData(hypercert);
      })(),
    );
  }, [useQueryString, byClaimId, byMetadataUri, client]); //added client due to eslint complaining-check with pro

  if (!ignoreLoading && !!loading && !data) {
    return <div className={className}> {loading} </div>;
  }

  return (
    <div className={className}>
    {data && (
      <>
        <h1>{data.name}</h1>
        <p>Total Units: {data.totalUnits.toString()}</p>
        <p>Metadata URI: {data.metadataUri}</p>
        {console.log(data)}
        <img src={data.metadata?.image}/>

      </>
    )}
    {children} 
  </div>
  );
}