import { useState } from "react";

const Encryption = ({ e, d, n }) => {
  console.log("e", e);
  console.log("d", d);
  console.log("n", n);
  const [m, setM] = useState(0);
  const [cipher, setCipher] = useState(0);

  return (
    <form className="px-5">
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
                  name="first-prime-number"
                  id="first-prime-number"
                  autoComplete="given-name"
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
              <div className="mt-2">
                <input
                  type="text"
                  name="first-prime-number"
                  id="first-prime-number"
                  autoComplete="given-name"
                  className={` w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset `}
                  value={cipher}
                  //   onChange={(e) => setM(e.target.value)}
                />
              </div>
              <button type="button" className="py-2 px-6 bg-green-300">
                Generate cyper text
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Encryption;
