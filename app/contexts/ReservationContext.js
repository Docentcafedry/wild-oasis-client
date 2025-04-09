"use client";
import { createContext, useContext } from "react";
import { useState } from "react";

const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  const [reservation, setReservation] = useState({
    from: undefined,
    to: undefined,
  });

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservationContext() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("You are trying to get auth context out of it's provider");
  }
  return context;
}
