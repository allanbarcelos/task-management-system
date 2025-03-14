import Header from '@/components/Layout/Header';
import './../styles/globals.scss';
import type { AppProps } from 'next/app';
import Footer from '@/components/Layout/Footer';

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <main className="container mt-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default App;