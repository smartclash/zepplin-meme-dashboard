import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <section className="section container">
        <h1 className="title">Logged in</h1>
        <h2>{session.user?.name}</h2>
        <h3>{session.user?.email}</h3>
        <button className="button is-info" onClick={() => signOut()}>Logout</button>
      </section>
    )
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="hero is-fullheight is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Zepplin Meme</h1>
            <h2 className="subtitle">Login with your official email ID to make submissions</h2>
            <a href="#" onClick={() => signIn('google')} className="button is-outlined is-medium is-info is-inverted">Login with Google</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
