 import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchInput from './search-input'
 
 const Navbar = () => {
   return (
    <nav className='flex items-center justify-between h-full w-full'>
        <div className='flex gap-3 items-center shrink-0 pr-6'>
            <Link href="/">
                <Image src="/vercel.svg" alt='logo' width={36} height={36} />
            </Link>
            <h3 className='text-xl'>
                Docs
            </h3>

        </div>
        <SearchInput />
        
        
    </nav>
   )
 }
 
 export default Navbar
 