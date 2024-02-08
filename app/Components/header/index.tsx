'use client'

import Image from "next/image"
import Link from "next/link"
import { NavItem } from "./nav-item"
import { motion } from "framer-motion";

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Projetos',
    href: '/projects'
  }
]

export const Header = () => {
  return (
    <motion.header
      className='absolute top-0 w-full z-10 h-24 flex items-center justify-center'
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.5 }}

    >
      <div className='container flex items-center justify-between'>
        <Link href="/">
          <Image
            width={100}
            height={100}
            src="/logorfs3.png"
            alt="logo"
            className="w-full h-auto"
          />
        </Link>

        <nav className='flex items-center gap-4 sm:gap-10 text-xl md:text-2xl'>
          {NAV_ITEMS.map(item => (
            <NavItem {...item} key={item.label} />
          ))}

        </nav>
      </div>
    </motion.header>
  )
}
