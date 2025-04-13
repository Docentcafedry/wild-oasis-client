import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import TextExpander from "@/app/_components/TextExpander";
import Image from "next/image";
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getSettings, getBookedDatesByCabinId } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import LoginMessage from "@/app/_components/LoginMessage";
import { auth } from "@/app/_lib/auth";
import ReservationActions from "@/app/_components/ReservationActions";
// PLACEHOLDER DATA

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return {
    title: cabin.name,
  };
}

export default async function Page({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  const session = await auth();
  const bookedDays = await getBookedDatesByCabinId(cabinId);
  const { minBookingLength, maxBookingLength } = await getSettings();
  const { id, name, maxCapacity, regularPrice, discount, avatar, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image src={avatar} fill alt={`Cabin ${name}`} />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          {/* <p className="text-lg text-primary-300 mb-10">{description}</p> */}
          <TextExpander>{description}</TextExpander>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
      <div className="grid grid-cols-[60%_40%]">
        <Suspense fallback={<Spinner></Spinner>}>
          {/* <DateSelector
            minBookingLength={minBookingLength}
            maxBookingLength={maxBookingLength}
            cabin={cabin}
            bookedDays={bookedDays}
          ></DateSelector>
          {session?.user ? (
            <ReservationForm
              user={session?.user}
              maxCapacity={maxCapacity}
              cabinPrice={regularPrice}
              cabinId={cabinId}
            ></ReservationForm>
          ) : (
            <LoginMessage></LoginMessage>
          )} */}
          <ReservationActions
            user={session?.user}
            minBookingLength={minBookingLength}
            maxBookingLength={maxBookingLength}
            cabin={cabin}
            bookedDays={bookedDays}
            cabinPrice={regularPrice}
            cabinId={cabinId}
            regularPrice={regularPrice}
            maxCapacity={maxCapacity}
          ></ReservationActions>
        </Suspense>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await getCabins();
  const cabinsIds = res?.map((cabin) => ({
    cabinId: cabin.id.toString(),
  }));

  console.log(cabinsIds);

  return cabinsIds;
}
