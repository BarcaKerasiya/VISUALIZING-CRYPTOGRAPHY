import { useState } from "react";

type Props = {
  //
};

const KeyGeneration = (props: Props) => {
  const [p, setP] = useState("");
  const [q, setQ] = useState("");
  const [n, setN] = useState("");
  const [totient, setTotient] = useState("");
  const [e, setE] = useState("");
  const [d, setD] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const calculateE = () => {
    // Function to calculate the least common multiple (LCM)
    function lcm(a, b) {
      return (a * b) / gcd(a, b);
    }

    // Function to calculate the greatest common divisor (GCD)
    function gcd(a, b) {
      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      return a;
    }

    // Replace these values with your actual values
    const lambdaN = totient; // Replace with λ(n)
    // const n = 77;      // Replace with your 'n'

    let e = 3; // Start with an initial value for e

    // Find a value for e such that 2 < e < λ(n) and gcd(e, λ(n)) = 1
    while (e < 1 || e >= lambdaN || gcd(e, lambdaN) !== 1) {
      e++;
    }
    console.log("e", e);
    return e;
  };

  console.log("Found e:", e);

  const handleN = (p, q) => {
    console.log("p", p);
    console.log("q", q);
    if (p && q) {
      console.log("inn");
      setN(p * q);
    }
  };

  const handleTotient = (p, q) => {
    if (p && q) {
      setTotient((p - 1) * (q - 1));
    }
  };

  const handleP = (e) => {
    setP(e.target.value);
    handleN(e.target.value, q);
    handleTotient(e.target.value, q);
  };
  return (
    <>
      <form className="px-5">
        <div className="space-y-12">
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-prime-number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter First prime number p
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-prime-number"
                    id="first-prime-number"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={p}
                    onChange={(e) => handleP(e)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="second-prime-number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Second prime number q
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="second-prime-number"
                    id="second-prime-number"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      handleN(p, e.target.value);
                      handleTotient(p, e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  n = (p * q)
                </label>
                <div className="mt-2">
                  <input
                    id="n"
                    name="n"
                    type="text"
                    autoComplete="n"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={n}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="totient"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Totient φ (n)
                </label>
                <div className="mt-2">
                  <input
                    id="totient"
                    name="totient"
                    type="text"
                    autoComplete="totient"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={totient}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Choose a number e
                </label>
                <div className="mt-2">
                  <input
                    id="n"
                    name="n"
                    type="number"
                    autoComplete="n"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Calculate d
                </label>
                <div className="mt-2">
                  <input
                    id="n"
                    name="n"
                    type="number"
                    autoComplete="n"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Private key pair
                </label>
                <div className="mt-2">
                  <input
                    id="n"
                    name="n"
                    type="number"
                    autoComplete="n"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Publiic key pair
                </label>
                <div className="mt-2">
                  <input
                    id="n"
                    name="n"
                    type="number"
                    autoComplete="n"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default KeyGeneration;
