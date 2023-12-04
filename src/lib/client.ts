import { createPublicClient, http } from 'viem'
import { goerli } from 'viem/chains'

const publicClient = createPublicClient({
  chain: goerli,
  transport: http()
})

export default publicClient