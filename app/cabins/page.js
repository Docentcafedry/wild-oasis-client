import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Cabins from "../_components/Cabins";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  const { capacity } = await searchParams;
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className="flex justify-end mb-2">
        <Filter></Filter>
      </div>
      <ReservationReminder></ReservationReminder>

      <Suspense fallback={<Spinner />}>
        <Cabins capacity={capacity || "all"}></Cabins>
      </Suspense>
    </div>
  );
}
