import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>foodlite</title>
        <meta name="description" content="What's for dinner?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Random ingredients? Use them!
          </p>
          <div>
              By{' '}
              <Link href="https://tectrainguy.xyz">tectrainguy</Link>
            
          </div>
        </div>

        
      </main>
    </>
  )
}
