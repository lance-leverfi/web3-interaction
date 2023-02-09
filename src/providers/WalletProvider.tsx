'use client'

import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Signer } from 'ethers'
import useMetamask from '@/hooks/useMetamask'
import web3 from 'web3'

type WalletContextType = {
  account: string | null | undefined,
  active: boolean
  chainId: number | undefined,
  connect: (chainId?: number) => void,
  disconnect: () => void,
  provider: Web3Provider | undefined,
  signer: Signer | undefined
}

export const WalletContext = React.createContext<WalletContextType>({} as WalletContextType)

const WalletProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { account, active, activate, library: provider, chainId, deactivate, error } = useWeb3React<Web3Provider>()
  const ethereum = useMetamask()

  // Created a custom connect function to handle different types of scenarios
  const connect = async (chainId: number = 1) => {
    if (typeof window === undefined || !ethereum) return

    console.log({ chainHex: web3.utils.toHex(chainId) })

    if (ethereum.networkVersion != String(chainId)) {
      // if it encounters an error with the code of 4902 (network not yet added), it means the network is not yet added to metamask, in that case, we will use wallet_addEthereumChain
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(chainId) }]
        })
      }
      catch (err: any) {
        if (err.code == 4902) {
          switch (chainId) {
            case 56: {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainName: 'Binance Smart Chain',
                  chainId: web3.utils.toHex(chainId),
                  nativeCurrency: { name: 'Binance Smart Chain', decimals: 18, symbol: 'BNB' },
                  rpcUrls: ['https://bsc-dataseed.binance.org/']
                }]
              })
            }
            case 137: {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainName: 'Polygon Network',
                  chainId: web3.utils.toHex(chainId),
                  nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                  rpcUrls: ['https://polygon-rpc.com/']
                }]
              })
            }
          }
        }
      }
    }

    const injected = new InjectedConnector({
      supportedChainIds: [ chainId ?? 1 ]
    })

    console.log({ injected })

    await activate(injected)
  }

  React.useEffect(() => {
    if (!error) return

    console.error('Error!!!!', { error })
  }, [error])

  const disconnect = async () => deactivate()
  return (
    <WalletContext.Provider value={{
      account,
      active,
      chainId,
      connect,
      disconnect,
      provider,
      signer: provider?.getSigner()
    }}>
      { children }
    </WalletContext.Provider>
  )
}

export default WalletProvider
