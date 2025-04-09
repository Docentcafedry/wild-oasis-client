"use client";

import { useState } from "react";

export default function Clicker() {
  const [num, setNum] = useState(0);

  return (
    <div>
      <button onClick={() => setNum((num) => num - 1)}>-</button>
      <span>{num}</span>
      <button onClick={() => setNum((num) => num + 1)}>+</button>
    </div>
  );
}
