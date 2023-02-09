'use client'

import { useContext } from 'react'
import { WalletContext } from '@/providers/WalletProvider'

const useWallet = () => {

  return useContext(WalletContext)
}

export default useWallet
