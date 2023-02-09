'use client'

const useMetamask = () => {
  if (typeof window == 'undefined') return

  return window.ethereum
}

export default useMetamask
