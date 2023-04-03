import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
//require('dotenv').config()

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [menu, setMenu] = useState([])

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          includeIngredients: `${inputValue}`,
          type: 'main course',
          fillIngredients: true,
          sort: 'min-missing-ingredients',
          number: '5',
        },
        headers: {
          'x-api-key': 'bb17589108dd4b9f8b25a6c537de9094',
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      setMenu(response.data.results.map((result) => ({ title: result.title, position: result.id })));
    } catch (error) {
      console.error(error);
    }
  }

  const handleMenuClick = async (position) => {
    let response;
    try {
    response = await axios.get(`https://api.spoonacular.com/recipes/${position}/ingredientWidget.json`, {
      headers: {
        'x-api-key': 'bb17589108dd4b9f8b25a6c537de9094',
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
