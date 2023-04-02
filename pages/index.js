import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [menu, setMenu] = useState([])

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        includeIngredients: inputValue,
        type: 'main course',
        fillIngredients: true,
        sort: 'min-missing-ingredients',
        number: '5',
      },
      headers: {
        'X-API-Key': process.env.SPOONACULAR_API,
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error(error);
  }
    setMenu(response.data.results.map((result) => ({ title: result.title, position: result.id })))
  }

  const handleMenuClick = async (position) => {
    try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${position}/ingredientWidget.json`, {
      headers: {
        'X-API-Key': process.env.SPOONACULAR_API,
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error(error);
  }
    setMenu(response.data.ingredients.map((ingredient) => ingredient.name))
  }

  return (
    <>
      <Head>
        <title>foodlite</title>
        <meta name="description" content="What's for dinner?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <div className={styles.description}>
            <p> Random ingredients? Use them!</p>
            <div> By{' '} <Link href="https://tectrainguy.xyz">tectrainguy</Link> </div>
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Ingredients list (comma separated)" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={styles.forminput} />
          <button type="submit" className={styles.formbutton}>Find Recipes</button>
        </form>
        <div>
          {menu.map((item, index) => (
            <div key={index} className={styles.menuitem} onClick={() => handleMenuClick(item.position)}>
              {item.title}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
