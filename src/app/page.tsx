"use client"
import { useState, useEffect } from "react"
import {
  HypercertClient,
  type Claim,
  type HypercertMetadata,
} from "@hypercerts-org/sdk"
import { DEFAULT_CHAIN_ID } from "@/lib/config"
import { type ExecutionResult } from "graphql"
import { useSearchParams } from 'next/navigation'

type Maybe<T> = T | null

export default function Home() {
  const params = useSearchParams()
  const [certs, setCerts] = (
    useState<Maybe<Array<HypercertMetadata>>>(null)
  )
  const owner = params.get('owner')

  useEffect(() => {
    const load = async () => {
      try {
        if(!owner) return

        const chainId = (
          params.get('chainId') ? (
            Number(params.get('chainId'))
          ) : (
            DEFAULT_CHAIN_ID
          )
        )
        const client = new HypercertClient({ chain: { id: chainId } })
        const { data: { claims } } = (
          await client.indexer
          .claimsByOwner(owner) as ExecutionResult<Record<'claims', Array<Claim>>>
        )
        const certs = await Promise.all(
          claims.map(async ({ id, uri }: Claim): Promise<HypercertMetadata & { id: string }> => {
            if(!uri) {
              throw new Error(`No URI for claim "${id}".`)
            }
            return {
              id,
              ...(await client.storage.getMetadata(uri))
            }
          })
        )
        setCerts(certs)

        if(params.get('debug')) {
          console.debug({ owner, chainId, claims, certs })
        }
      } catch(error) {
        console.error(error)
      }
    }
    load()
  }, [owner, params])

  if(!owner) {
    return (
      <main>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '35dvh',
          }}
        >
          <input
            name="owner"
            placeholder="Owner"
            required
            style={{
              textAlign: 'center',
              padding: '1rem',
              width: 'min(80vw, 42em)',
            }}
          />
          <button
            style={{
              marginTop: '1rem',
              border: '1px solid gray',
              padding: '1rem',
            }}
          >
            Find Hypercerts For
          </button>
        </form>
      </main>
    )
  }

  if(!certs) {
    return (
      <main
        style={{
          marginTop: '35dvh',
          textAlign: 'center',
        }}
      >
        <h1>Loading…</h1>
      </main>
    )
  }

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {certs.map((cert) => (
        <article key={cert.id}>
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
              fontSize: '1.5rem',
            }}
          >
            {cert.name}
          </h2>
          <p
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
              fontSize: '1rem',
            }}
          >
            {cert.description}
          </p>
          <section
            style={{
              display: 'flex',
            }}
          >
            <img src={cert.image}/>
            {console.debug({ hyp: Object.values(cert.hypercert) })}
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'max-content 1fr',
                gap: '0.5rem',
              }}
            >
              {Object.values(cert.hypercert ?? {}).map((value) => (
                <li
                  key={value.name}
                  style={{
                    display: 'contents',
                  }}
                >
                  <span
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    {value.name}:
                  </span>
                  <span>{value.display_value}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>
      ))}
    </main>
  )
}
