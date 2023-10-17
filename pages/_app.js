import "@/styles/globals.css";

import { Bellota } from "next/font/google";

const bellota = Bellota({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={bellota.className}>
      <Component {...pageProps} />
    </main>
  );
}
