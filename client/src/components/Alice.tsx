import React, { useState } from "react";
import { isPrimeCehck } from "../utils/isPrime";
import { findCoprime } from "../utils/coPrime";

export const Alice = () => {
  const [p, setP] = useState<number | null>(null);
  const [q, setQ] = useState<number | null>(null);
  const [modulus, setModulus] = useState<number | null>(null);

  const handlePChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value, 10);

    // Check if the parsed value is a valid number (not NaN)
    if (!isNaN(parsedValue)) {
      const isPrime = isPrimeCehck(parsedValue);
      if (!isPrime) {
        alert(`${parsedValue} is not prime number`);
        return true;
      }
      setP(parsedValue);
    } else {
      setP(null); // If it's not a valid number, set state to null
    }
  };
  const handleQChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value, 10);
    // Check if the parsed value is a valid number (not NaN)
    if (!isNaN(parsedValue)) {
      const isPrime = isPrimeCehck(parsedValue);
      if (!isPrime) {
        alert(`${parsedValue} is not prime number`);
        return true;
      }
      setQ(parsedValue);
    } else {
      setQ(null); // If it's not a valid number, set state to null
    }
  };
  const a = findCoprime();
  console.log("a", a);
  return (
    <>
      <label htmlFor="p">P = </label>
      <input
        id="p"
        type="number"
        value={p?.toString() ?? ""}
        onChange={handlePChange}
      />{" "}
      &nbsp;
      <label htmlFor="q">q = </label>
      <input
        id="q"
        type="number"
        value={q?.toString() ?? ""}
        onChange={handleQChange}
      />
      &nbsp;
      <label htmlFor="modulus">modulus = </label>
      <input
        id="modulus"
        type="number"
        placeholder="p * q"
        value={p && q ? p * q : ""}
        // onChange={handleQChange}
      />
      &nbsp;
      <label htmlFor="totient">totient φ(n) = </label>
      <input
        id="totient"
        type="number"
        placeholder="φ = p-1 * q-1"
        value={p && q ? (p - 1) * (q - 1) : ""}
        // onChange={handleQChange}
      />
      {/* φ */}
    </>
  );
};
