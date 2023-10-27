import React, { useState } from "react";

function RSAKeyGeneration() {
  // State variables to store p, q, n, φ(n), and e
  const [p, setP] = useState(3);
  const [q, setQ] = useState(11);
  const [n, setN] = useState(0);
  const [phiN, setPhiN] = useState(0);
  const [e, setE] = useState(7);

  // Function to compute n and φ(n) when p and q are updated
  const computeNAndPhiN = () => {
    const newN = p * q;
    const newPhiN = (p - 1) * (q - 1);
    setN(newN);
    setPhiN(newPhiN);
  };

  // Function to generate e
  const generateE = () => {
    let newE = 2;
    while (newE < phiN) {
      if (gcd(newE, phiN) === 1) {
        setE(newE);
        break;
      }
      newE++;
    }
  };

  // Helper function to calculate the greatest common divisor (GCD)
  const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
  };

  return (
    <div>
      <h1>RSA Key Generation</h1>
      <p>p: {p}</p>
      <p>q: {q}</p>
      <p>n: {n}</p>
      <p>φ(n): {phiN}</p>
      <p>e: {e}</p>
      <button onClick={computeNAndPhiN}>Compute n and φ(n)</button>
      <button onClick={generateE}>Generate e</button>
    </div>
  );
}

export default RSAKeyGeneration;
