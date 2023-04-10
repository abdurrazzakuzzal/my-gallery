import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material'
import Header from '@/layouts/header/Header'
import { useRouter } from 'next/router'
import { AuthContextProvider } from '@/context/AuthContext';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>My Gallery</title>
        <meta name="description" content="Your decentralized image gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthContextProvider>
        <CssBaseline />
        {!router.pathname.includes("/auth/") && (<Header />)}
        <Container maxWidth='lg' >
          <Component {...pageProps} />
        </Container>
      </AuthContextProvider>
    </>
  )
}
