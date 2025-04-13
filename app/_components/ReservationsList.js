"use client";
import { deleteBooking } from "../actions";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";

export default function Page({ bookings }) {
  const [optimisticBookings, optimisticDeleteBooking] = useOptimistic(
    bookings,
    (currentBookings, bookingId) =>
      currentBookings?.filter((booking) => booking.id != bookingId)
  );

  async function handleDeleteReservation(bookingId) {
    optimisticDeleteBooking(bookingId);
    await deleteBooking(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          handleDeleteReservation={handleDeleteReservation}
        />
      ))}
    </ul>
  );
}
