'use client'

import Image from 'next/image'
import React from 'react'
import { clsx } from 'clsx'
import useWallet from '@/hooks/useWallet'

const Card = () => {
  const { account, chainId, connect, disconnect, active } = useWallet()

  return (
    <div className='w-full max-w-[600px] p-[1.5rem] rounded-lg bg-white shadow-2xl flex flex-col gap-[1.5rem]'>
      <div className='flex justify-between items-center [&>p]:text-neutral-500 [&>p]:text-sm'>
        <p>Connected: <span className={clsx([
          'text-lg text-neutral-700',
          active ? 'text-green-700' : 'text-neutral-800'
        ])}>{ active ? 'Yes' : 'No' }</span></p>
        <p className={clsx([
          'text-sm text-neutral-500 uppercase tracking-tight',
          !chainId && 'hidden'
        ])}>Chain ID: { chainId }</p>
      </div>
      <div className={clsx([
        'whitespace-nowrap text-neutral-500 text-sm',
        !account && 'hidden'
      ])}><p className='overflow-hidden text-ellipsis'>Account: <span className='text-lg text-neutral-700'>{ account }</span></p></div>

      <div className='flex items-center gap-[0.3rem] [&>button]:flex-1 [&>button]:h-[70px]'>
        <button
          className={clsx([
            'bg-gradient-to-r from-orange-200 to-blue-200 flex justify-center items-center hover:from-orange-400 hover:to-blue-500',
            'rounded-md px-4 py-2 text-white shadow-sm',
            'active:ring-2 active:ring-offset-2',
            'group',
            account && 'hidden'
          ])}
          onClick={() => connect(1)}
        >
          <p className='absolute text-3xl font-bold opacity-0 group-hover:opacity-30'>ETHEREUM</p>
          <Image src={'/eth.png'} alt={'ethereum-icon'} width='30' height='30' className='z-10' /></button>
        <button
          className={clsx([
            'relative bg-gradient-to-r from-orange-200 to-blue-200 flex justify-center items-center hover:from-orange-400 hover:to-blue-500',
            'rounded-md px-4 py-2 text-white shadow-sm',
            'active:ring-2 active:ring-offset-2',
            'group',
            account && 'hidden'
          ])}
          onClick={() => connect(56)}
        >
          <p className='absolute text-5xl font-bold opacity-0 group-hover:opacity-30'>BSC</p>
          <Image src={'/bsc.png'} alt={'ethereum-icon'} width='30' height='30' className='z-10' />
        </button>
        <button
          className={clsx([
            'relative bg-gradient-to-r from-orange-200 to-blue-200 flex justify-center items-center hover:from-orange-400 hover:to-blue-500',
            'rounded-md px-4 py-2 text-white shadow-sm',
            'active:ring-2 active:ring-offset-2',
            'group',
            account && 'hidden'
          ])}
          onClick={() => connect(137)}
        >
          <p className='absolute text-4xl font-bold opacity-0 group-hover:opacity-30'>Polygon</p>
          <Image src={'/polygon.png'} alt={'polygon-icon'} width='30' height='30' className='z-10' />
        </button>
      </div>

      <div className={clsx([
        !account && 'hidden',
        'flex flex-col gap-[1rem]'
      ])}>
        <button
          className={clsx([
            'bg-gradient-to-r from-red-500 to-orange-400',
            'rounded-md px-4 py-2 text-white shadow-sm',
            'active:ring-2 active:ring-offset-2',
          ])}
          onClick={disconnect}
        >
          Disconnect</button>
        <button
          className={clsx([
            'bg-transparent outline outline-orange-500',
            'rounded-md px-4 py-2 text-orange-600 shadow-sm',
            'active:ring-2 active:ring-offset-2',
          ])}
          onClick={() => connect(chainId == 1 ? 56 : 1)}
        >
          Switch to {chainId == 1 ? 'BSC' : 'Ethereum'}</button>
      </div>
    </div>
  )
}

export default Card
