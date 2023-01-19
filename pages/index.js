import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { getSecrets } from "@netlify/functions"

const inter = Inter({ subsets: ['latin'] })

export default function Home({ artists }) {
  console.log(artists)
  return (
    <>
      <main className={styles.main}>
        <h1>Hello World!</h1>
        <ol>
          {artists.map((artist, i) => {
            return (
              <li key={artist.id}>
                {artist.name}
                <img
                  width={artist.images[i].width}
                  height={artist.images[i].height}
                  src={artist.images[i].url}
                  alt={artist.name}
                />
              </li>
            )
          })}
        </ol>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const secrets = await getSecrets()
  console.log('secrets', secrets)
  const artistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists?limit=2', {
    headers: {
      Authorization: `Bearer ${secrets.spotify.bearerToken}`
    }
  })
  const { items: artists } = await artistsResponse.json()
  return {
    props: {
      artists
    }
  }
}
