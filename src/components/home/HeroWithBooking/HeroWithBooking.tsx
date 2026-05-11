import { getLocale, getTranslations } from "next-intl/server";
import { BookingPanel } from "@/components/home/BookingPanel/BookingPanel";
import { CrosswayHomeV2Hero } from "@/components/home/CrosswayHomeV2Hero";
import heroStyles from "@/components/home/CrosswayHomeV2Hero/CrosswayHomeV2Hero.module.scss";

/** Homepage: Palomar-style full-viewport hero + booking band overlapping the stage (see `CrosswayHomeV2Hero`). */
export async function HeroWithBooking() {
  const locale = await getLocale();
  const tb = await getTranslations("Booking");
  const tn = await getTranslations("Nav");

  const labels = {
    title: tb("title"),
    selectHotel: tb("selectHotel"),
    selectHotelPlaceholder: tb("selectHotelPlaceholder"),
    checkIn: tb("checkIn"),
    checkOut: tb("checkOut"),
    rooms: tb("rooms"),
    adults: tb("adults"),
    children: tb("children"),
    submit: tb("submit"),
    placeholderDate: tb("placeholderDate"),
    childNone: tb("childNone"),
    hotels: [
      { value: "VXXX1116", label: tn("hotel_palomar") },
      { value: "ZGVR1115", label: tn("hotel_days") },
      { value: "VGZT0227", label: tn("hotel_royel") },
      { value: "ZZGC0307", label: tn("hotel_lifotel") },
      { value: "TXRR0325", label: tn("hotel_petitpalais") },
    ],
  };

  const bookingSlot = (
    <div id="book" className={heroStyles.heroBookingDock}>
      <BookingPanel key={locale} labels={labels} prominent />
    </div>
  );

  return <CrosswayHomeV2Hero bookingSlot={bookingSlot} />;
}
