import React from "react";
import { ChangeEvent, useState } from "react";
import TooltipFn from "../components/Tooltip";
import { isPrime } from "../utils/isPrime";
import Encryption from "../components/Encryption";
import { getRandomInt } from "../utils/generateRandomNumber";
import { lcm } from "../utils/lcm";
import { gcd } from "../utils/gcd";

type Props = {
  //
};

const KeyGeneration: React.FC<Props> = (props: Props) => {
  const [p, setP] = useState<string>("");
  const [isPPrime, setIsPPrime] = useState<boolean>();

  const [q, setQ] = useState<string>("");
  const [isQPrime, setIsQPrime] = useState<boolean>();

  const [n, setN] = useState<string>("");
  const [nErr, setNErr] = useState<string>("");

  const [totient, setTotient] = useState<string>("");
  const [totientErr, setTotientErr] = useState<string>("");

  const [e, setE] = useState<string>("");
  const [eArr, setEArr] = useState<number[]>([]);
  const [eError, setEError] = useState("");

  const [d, setD] = useState<string>("");
  const [preCalculatedD, setPreCalculatedD] = useState<string>("");
  const [dError, setDError] = useState<string>("");
  console.log("preCalculatedD", preCalculatedD);

  const handleP = (e: ChangeEvent<HTMLInputElement>) => {
    if (isPPrime && isQPrime) {
      setNErr("");
    }
    if (isPrime(Number(e.target.value))) {
      setIsPPrime(true);
    } else {
      setIsPPrime(false);
    }
    setP(e.target.value);
  };
  const handleQ = (e: ChangeEvent<HTMLInputElement>) => {
    if (isPPrime && isQPrime) {
      setNErr("");
    }
    if (isPrime(Number(e.target.value))) {
      setIsQPrime(true);
    } else {
      setIsQPrime(false);
    }
    setQ(e.target.value);
  };

  const handleNChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isPPrime && isQPrime) {
      if (Number(p) * Number(q) === Number(e.target.value)) {
        setN(e.target.value);
        setNErr("no_error");
      } else {
        setNErr("value of e should be multiplication p and q");
        setN(e.target.value);
      }
    } else {
      setNErr("Both p and q should be a prime number");
      setN("");
    }
  };
  const handleTotient = (e: ChangeEvent<HTMLInputElement>) => {
    if (p && q) {
      const totientLCM = (Number(p) - 1) * (Number(q) - 1);
      console.log("totientLCM", totientLCM);
      if (Number(e.target.value) === totientLCM) {
        setTotient(e.target.value);
        setTotientErr("no_error");
        generateE(Number(e.target.value));
      } else {
        setTotient(e.target.value);
        setTotientErr("You entered wrong value of totient φ (n)");
      }
    } else {
      setTotient("");
    }
  };

  const generateE = (totient: number) => {
    const arr = [];
    let newE = 2;
    while (newE < totient) {
      if (gcd(newE, totient) === 1) {
        arr.push(newE);
      }
      newE++;
    }
    setEArr(arr);
  };

  const handleEchange = (e: ChangeEvent<HTMLInputElement>) => {
    setE(e.target.value);
    console.log("eArr", eArr);
    const checkValueInArray = eArr.includes(Number(e.target.value));
    console.log("checkValueInArray", checkValueInArray);

    if (checkValueInArray === false) {
      setEError("You entered wrong value");
    } else {
      setEError("no_error");
      calculateD(Number(e.target.value));
    }
  };

  const pickRandomE = () => {
    if (eArr.length > 0) {
      const length = eArr.length - 1;
      const index = getRandomInt(0, length);
      const randomEFromArr = eArr[index];
      setE(String(randomEFromArr));
      calculateD(Number(randomEFromArr));
      setEError("no_error");
      return true;
    }
  };

  const handleDchange = (e: ChangeEvent<HTMLInputElement>) => {
    setD(e.target.value);
    if (preCalculatedD !== e.target.value) {
      setDError("You entered wrong value");
    } else {
      setDError("no_error");
    }
    // if()
  };

  // Function to calculate d
  const calculateD = (e: number) => {
    for (let i = 1; i <= Number(totient); i++) {
      if ((Number(e) * i) % Number(totient) === 1) {
        setPreCalculatedD(String(i));
        break;
      }
    }
  };

  const pickDValue = () => {
    setD(preCalculatedD);
    setDError("no_error");
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
                  className="text-sm font-medium leading-6 text-gray-900 flex items-center"
                >
                  Enter First Prime number p &nbsp; <TooltipFn />
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="first-prime-number"
                    id="first-prime-number"
                    // autoComplete="first-prime-number"
                    className={` w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      isPPrime === true
                        ? "focus:ring-green-300 outline-none"
                        : isPPrime === false
                        ? "focus:ring-red-300 outline-none"
                        : "outline-none"
                    }  focus:shadow-sm sm:text-sm sm:leading-6`}
                    value={p}
                    onChange={(e) => handleP(e)}
                  />
                  {isPPrime === false && (
                    <span className="sm:col-span-3 bg-red-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`p = ${p} is not a prime number`}
                    </span>
                  )}
                  {isPPrime === true && (
                    <span className="sm:col-span-3 bg-green-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`p = ${p} is a prime number`}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="second-prime-number"
                  className="flex items-center text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Second Prime number q &nbsp; <TooltipFn />
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="second-prime-number"
                    id="second-prime-number"
                    autoComplete="second-prime-number"
                    className={` w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      isQPrime === true
                        ? "focus:ring-green-300 outline-none"
                        : isQPrime === false
                        ? "focus:ring-red-300 outline-none"
                        : "outline-none"
                    }  focus:shadow-sm sm:text-sm sm:leading-6`}
                    value={q}
                    onChange={(e) => handleQ(e)}
                  />
                  {isQPrime === false && (
                    <span className="sm:col-span-3 bg-red-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`q = ${q} is not a prime number`}
                    </span>
                  )}
                  {isQPrime === true && (
                    <span className="sm:col-span-3 bg-green-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`q = ${q} is a prime number`}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="flex items-center text-sm font-medium leading-6 text-gray-90"
                >
                  n = (p * q) &nbsp;
                  <TooltipFn />
                </label>
                <div className="mt-2">
                  <input
                    id="n"
                    name="n"
                    type="text"
                    autoComplete="n"
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    value={n}
                    placeholder="p * q"
                    disabled={isPPrime && isQPrime ? false : true}
                    onChange={(e) => handleNChange(e)}
                  />
                  {nErr.length > 0 && nErr !== "no_error" && (
                    <span className="sm:col-span-3 bg-red-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {nErr}
                    </span>
                  )}
                  {nErr === "no_error" && (
                    <span className="sm:col-span-3 bg-green-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`You entered a right value`}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="totient"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Totient φ (n) = (p-1) * (q -1)
                </label>
                <div className="mt-2">
                  <input
                    id="totient"
                    name="totient"
                    type="text"
                    autoComplete="totient"
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    disabled={isPPrime && isQPrime ? false : true}
                    value={totient}
                    onChange={(e) => handleTotient(e)}
                  />
                  {totientErr.length > 0 && totientErr !== "no_error" && (
                    <span className="sm:col-span-3 bg-red-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {totientErr}
                    </span>
                  )}
                  {totientErr === "no_error" && (
                    <span className="sm:col-span-3 bg-green-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`You entered a right value`}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Choose a number e
                </label>
                <div className="mt-2 relative">
                  <input
                    id="e"
                    name="e"
                    type="number"
                    autoComplete="e"
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    disabled={
                      isPPrime === false ||
                      isQPrime === false ||
                      n === "" ||
                      totient === ""
                        ? true
                        : false
                    }
                    // onClick={() => generateE()}
                    onChange={(e) => handleEchange(e)}
                    value={e}
                  />
                  <button
                    type="button"
                    className="py-[4px] px-6 bg-green-700 absolute right-0 rounded-md "
                    onClick={() => pickRandomE()}
                  >
                    E
                  </button>
                  {eError.length > 0 && eError !== "no_error" && (
                    <span className="sm:col-span-3 bg-red-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {eError}
                    </span>
                  )}
                  {eError === "no_error" && (
                    <span className="sm:col-span-3 bg-green-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`You entered a right value`}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Calculate d
                </label>
                <div className="mt-2 relative">
                  <input
                    id="d"
                    name="d"
                    type="number"
                    autoComplete="d"
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    value={d}
                    disabled={
                      isPPrime === false ||
                      isQPrime === false ||
                      n === "" ||
                      totient === ""
                        ? true
                        : false
                    }
                    onChange={(e) => handleDchange(e)}
                  />
                  <button
                    type="button"
                    className="py-[4px] px-6 bg-green-900 absolute right-0 rounded-md"
                    onClick={() => pickDValue()}
                  >
                    d
                  </button>
                  {dError.length > 0 && dError !== "no_error" && (
                    <span className="sm:col-span-3 bg-red-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {dError}
                    </span>
                  )}
                  {dError === "no_error" && (
                    <span className="sm:col-span-3 bg-green-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`You entered a right value`}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Publiic key (e,n) :{" "}
                  {`${e ? e : ""} ${e && n ? "," : ""} ${n ? n : ""}`}
                </label>
                <div className="mt-2">
                  <span></span>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Private key (d, n):{" "}
                  {`${d ? d : ""} ${d && n ? "," : ""} ${n ? n : ""}`}
                </label>
                <div className="mt-2">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Encryption e={e} d={d} n={n} />
      </form>
    </>
  );
};
export default KeyGeneration;
