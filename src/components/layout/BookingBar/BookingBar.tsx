import { getLocale, getTranslations } from "next-intl/server";
import { BookingPanel } from "@/components/home/BookingPanel/BookingPanel";

export async function BookingBar() {
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
    ],
  };

  return (
    <div id="book">
      <BookingPanel key={locale} labels={labels} prominent />
    </div>
  );
}
