'use client'

import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import WalletProvider from '@/providers/WalletProvider'
import { Web3Provider } from '@ethersproject/providers'
import { createClient, configureChains, WagmiConfig } from 'wagmi'
import { mainnet, bsc, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const Providers: React.FC<{ children?: React.ReactNode }> = ({children}) => {

  const library = (provider: any) => {
    const lib = new Web3Provider(provider)
    lib.pollingInterval = 12000
    return lib
  }

  // create a configuration
  const {chains, provider, webSocketProvider} = configureChains(
    [ mainnet, bsc, polygon ],
    [ publicProvider() ]
  )

  // create a wagmi client
  const client = createClient({
    // enabling this will cause hydration error, for it to work, you must re-assign the connected status to another state for your app to listen
    autoConnect: false,
    provider,
    webSocketProvider
  })

  return (
    <>
      {/* Wrap your application with Wagmi Config Provider */ }
      <WagmiConfig client={ client }>
        <Web3ReactProvider getLibrary={ library }>
          <WalletProvider>
            { children }
          </WalletProvider>
        </Web3ReactProvider>
      </WagmiConfig>
    </>
  )
}

export default Providers
