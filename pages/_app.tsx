import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

function ZepplinMeme({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default ZepplinMeme
