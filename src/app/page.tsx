import { clsx } from 'clsx'
import Card from '@/components/Card'

export default function Home() {
  return (
    <main className='max-w-[1440px] mx-auto flex flex-col px-[1.3rem] gap-[2rem] h-screen'>
      <header className='flex flex-grow-0 flex-shrink basis-auto items-center justify-center h-[77px]'>
        <h2 className='text-2xl font-bold text-neutral-600 tracking-tighter'>Web3 Basic Interaction</h2>
      </header>
      <section className='flex-grow flex-shrink basis-auto flex justify-center items-start mt-[2rem]'>
        <Card />
      </section>
    </main>
  )
}
