"use client";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { useReservationContext } from "../contexts/ReservationContext";

export default function ReservationActions({
  user,
  minBookingLength,
  maxBookingLength,
  cabin,
  bookedDays,
  cabinId,
  regularPrice,
  maxCapacity,
  guestId,
}) {
  const { reservation, setReservation } = useReservationContext();
  return (
    <>
      <DateSelector
        minBookingLength={minBookingLength}
        maxBookingLength={maxBookingLength}
        cabin={cabin}
        bookedDays={bookedDays}
      ></DateSelector>
      {user ? (
        <ReservationForm
          user={user}
          maxCapacity={maxCapacity}
          cabinPrice={regularPrice}
          cabinId={cabinId}
          reservation={reservation}
          setReservation={setReservation}
        ></ReservationForm>
      ) : (
        <LoginMessage></LoginMessage>
      )}
    </>
  );
}
