import { HomeHero } from "@/components/home/HomeHero/HomeHero";
import { BookingBar } from "@/components/layout/BookingBar/BookingBar";
import styles from "./HeroWithBooking.module.scss";

/** Homepage: hero fills the band; booking bar is pinned to the bottom edge (glass panel over imagery). */
export async function HeroWithBooking() {
  return (
    <div className={styles.stage}>
      <HomeHero />
      <div className={styles.bookingDock}>
        <BookingBar dockToHero />
      </div>
    </div>
  );
}
