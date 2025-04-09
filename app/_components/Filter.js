"use client";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filter() {
  const [capacity, setCapacity] = useState("all");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const capacityParam = searchParams.get("capacity") | "all";

  function handleClick(filter) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("capacity", filter);
    setCapacity(filter);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex border border-primary-700">
      <Button handleClick={handleClick} filter={"all"} capacityParam={capacity}>
        All cabins
      </Button>
      <Button handleClick={handleClick} filter={"3"} capacityParam={capacity}>
        1&ndash;3 guests
      </Button>
      <Button handleClick={handleClick} filter={"7"} capacityParam={capacity}>
        4&ndash;7 guests
      </Button>
      <Button handleClick={handleClick} filter={"10"} capacityParam={capacity}>
        8&ndash;10 guests
      </Button>
    </div>
  );
}

function Button({ filter, capacityParam, handleClick, children }) {
  return (
    <button
      className={`p-2 hover:bg-primary-700 transition-colors duration-100 ${
        capacityParam === filter ? "bg-primary-700" : ""
      }`}
      onClick={() => handleClick(filter)}
    >
      {children}
    </button>
  );
}
