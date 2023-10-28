import { useState } from "react";

const Encryption = ({ e, d, n }) => {
  console.log("e", e);
  console.log("d", d);
  console.log("n", n);
  const [m, setM] = useState<string>("");
  const [cipher, setCipher] = useState("");
  const [decreyptedText, setDecreyptedText] = useState("");

  const generateCyperText = () => {
    const c = BigInt(Number(m)) ** BigInt(Number(e)) % BigInt(Number(n));
    setCipher(String(Number(c)));
  };

  const generateDecreyptedText = () => {
    const de = BigInt(Number(cipher)) ** BigInt(Number(d)) % BigInt(Number(n));
    console.log("de", de);
    setDecreyptedText(String(Number(de)));
  };

  return (
    <div className="px-5">
      <div className="space-y-12">
        <div className="pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-prime-number"
                className="text-sm font-medium leading-6 text-gray-900 flex items-center"
              >
                Enter plain text ( m )
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="m"
                  id="m"
                  autoComplete="m"
                  className={` w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset `}
                  value={m}
                  onChange={(e) => setM(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-prime-number"
                className="text-sm font-medium leading-6 text-gray-900 flex items-center"
              >
                Ciper text ( c )
              </label>
              <div className="mt-2 relative">
                <input
                  type="text"
                  name="c"
                  id="c"
                  autoComplete="c"
                  className={` w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset `}
                  value={cipher}
                  //   onChange={(e) => setM(e.target.value)}
                />
                <button
                  type="button"
                  className="py-2 px-6 bg-green-300 absolute right-0"
                  onClick={() => generateCyperText()}
                >
                  Generate cyper text
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-prime-number"
                className="text-sm font-medium leading-6 text-gray-900 flex items-center"
              >
                Plain text ( m ) from ciper text
              </label>
              <div className="mt-2 relative">
                <input
                  type="text"
                  name="c"
                  id="c"
                  autoComplete="c"
                  className={` w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset `}
                  value={decreyptedText}
                  //   onChange={(e) => setM(e.target.value)}
                />
                <button
                  type="button"
                  className="py-2 px-6 bg-green-300 absolute right-0"
                  onClick={() => generateDecreyptedText()}
                >
                  Decreypted text
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encryption;
