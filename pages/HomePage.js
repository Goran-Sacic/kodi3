import Link from "next/link";
import styles from "./HomePage.module.css";
import kodimon1 from "../assets/kodimon 1.png";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <div className={styles.home_page}>
        <Image src={kodimon1} alt="Kodimon"></Image>
        <div>
          <Link href="/GetMePokimane">
            <button className={styles.home_btn}>New Game</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
