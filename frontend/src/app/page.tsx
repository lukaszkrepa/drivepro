import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Courses from '../components/Courses';
import Signup from '../components/Signup';
export default function Home() {
  return (
      <>
        <Head>
          <title>SuperPrawoJazdy.pl</title>
          <meta name="description" content="Driving School website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        <Hero />
          <Courses />
          <Signup />
        <main className="pt-20">
          {/* Your homepage content */}
          <section id="kursy">
            <h2>Kursy</h2>
            {/* Add course info here */}
          </section>

          <section id="zapisy">
            <h2>Jak się zapisać</h2>
            {/* Add sign-up info here */}
          </section>

          {/* Other sections */}
        </main>
      </>
  );
}
