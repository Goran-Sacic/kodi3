import Head from "next/head";
import styles from "@/styles/Home.module.css";
import FetchPokemons from "@/components/FetchPokemons";
import HomePage from "./HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kodimon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main}>
        <div>
          <HomePage />
        </div>
      </main>
    </>
  );
}
