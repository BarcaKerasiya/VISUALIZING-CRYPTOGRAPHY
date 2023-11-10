import React from "react";
import { ChangeEvent, useState } from "react";
import TooltipFn from "../components/Tooltip";
import { isPrime } from "../utils/isPrime";
import Encryption from "../components/Encryption";
import { getRandomInt } from "../utils/generateRandomNumber";
import { gcd } from "../utils/gcd";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { getRandomPrimeInRange } from "../utils/randomPrimeNumber";
import ResetFields from "../components/ResetFields";

type Props = {
  //
};

const prime_Number = "Prime Number";
const content = `A whole number greater than 1 that cannot be exactly
divided by any whole number other than itself and 1 (e.g. 2, 3, 5,
7, 11).`;

const KeyGeneration: React.FC<Props> = () => {
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

  const [isReset, setIsRest] = useState<boolean>(false);

  const handleP = (e: ChangeEvent<HTMLInputElement>) => {
    if (isPrime(Number(e.target.value))) {
      setIsPPrime(true);
    } else {
      setIsPPrime(false);
    }
    setP(e.target.value);
    setN("");
    setNErr("");
    setTotient("");
    setTotientErr("");
    setE("");
    setD("");
    setEError("");
    setDError("");
  };
  const handleQ = (e: ChangeEvent<HTMLInputElement>) => {
    // if (isPPrime && isQPrime) {
    //   setNErr("");
    // } else {
    //   setN("");
    // }
    if (isPrime(Number(e.target.value))) {
      setIsQPrime(true);
    } else {
      setIsQPrime(false);
      // setN("");
    }
    setN("");
    setNErr("");
    setTotient("");
    setTotientErr("");
    setE("");
    setD("");
    setEError("");
    setDError("");
    setQ(e.target.value);
  };
  const pickRandomPrimeNumber = (field: string) => {
    if (field === "p") {
      const primeNumber = getRandomPrimeInRange(10, 100);
      setP(String(primeNumber));
      setIsPPrime(true);
    }
    if (field === "q") {
      const primeNumber = getRandomPrimeInRange(100, 200);
      setQ(String(primeNumber));
      setIsQPrime(true);
    }
    setN("");
    setNErr("");
    setTotient("");
    setTotientErr("");
    setE("");
    setD("");
    setEError("");
    setDError("");
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
    setE("");
    setD("");
    setEError("");
    setDError("");
  };
  const pickN = () => {
    if (isPPrime && isQPrime) {
      if (Number(p) * Number(q) === Number(p) * Number(q)) {
        setN(String(Number(p) * Number(q)));
        setNErr("no_error");
      } else {
        setNErr("value of e should be multiplication p and q");
        setN(String(Number(p) * Number(q)));
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
    setE("");
    setD("");
    setEError("");
    setDError("");
  };
  const pickTotient = () => {
    if (p && q) {
      const totientLCM = (Number(p) - 1) * (Number(q) - 1);
      console.log("totientLCM", totientLCM);
      if (totientLCM === totientLCM) {
        setTotient(String(totientLCM));
        setTotientErr("no_error");
        generateE(Number(totientLCM));
      } else {
        setTotient(String(totientLCM));
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
    setD("");
    setDError("");
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
      setD("");
      setDError("");
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

  const resetFields = () => {
    setP("");
    setIsPPrime(undefined);
    setQ("");
    setIsQPrime(undefined);
    setN("");
    setNErr("");
    setTotient("");
    setTotientErr("");
    setE("");
    setEArr([]);
    setEError("");
    setD("");
    setPreCalculatedD("");
    setDError("");
    setIsRest(!isReset);
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
                  Enter First Prime number p &nbsp;{" "}
                  <TooltipFn title={prime_Number} content={content} />
                </label>
                <div className="mt-2 relative">
                  <input
                    type="number"
                    name="first-prime-number"
                    id="first-prime-number"
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
                  <button
                    type="button"
                    className="py-[4px] px-6 bg-green-300 absolute right-0 rounded-md "
                    onClick={() => pickRandomPrimeNumber("p")}
                  >
                    <PencilSquareIcon
                      className="h-7 w-4 flex-none "
                      aria-hidden="true"
                    />
                  </button>
                  {isPPrime === false && (
                    <span className="sm:col-span-3 bg-red-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`p is not a prime number`}
                    </span>
                  )}
                  {isPPrime === true && (
                    <span className="sm:col-span-3 bg-green-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`p is a prime number`}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="second-prime-number"
                  className="flex items-center text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Second Prime number q &nbsp;{" "}
                  <TooltipFn title={prime_Number} content={content} />
                </label>
                <div className="mt-2 relative">
                  <input
                    type="number"
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
                  <button
                    type="button"
                    className="py-[4px] px-6 bg-green-300 absolute right-0 rounded-md "
                    onClick={() => pickRandomPrimeNumber("q")}
                  >
                    <PencilSquareIcon
                      className="h-7 w-4 flex-none "
                      aria-hidden="true"
                    />
                  </button>
                  {isQPrime === false && (
                    <span className="sm:col-span-3 bg-red-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`q is not a prime number`}
                    </span>
                  )}
                  {isQPrime === true && (
                    <span className="sm:col-span-3 bg-green-300 block py-[9px] px-2 rounded-md mt-[1px]">
                      {`q is a prime number`}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="n"
                  className="flex items-center text-sm font-medium leading-6 text-gray-90"
                >
                  n = (p * q) {p && q && `= (${p} * ${q})`} &nbsp;
                  {/* <TooltipFn title={prime_Number} content={content} /> */}
                </label>
                <div className="mt-2 relative">
                  <input
                    id="n"
                    name="n"
                    type="number"
                    autoComplete="n"
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    value={n}
                    placeholder="p * q"
                    disabled={isPPrime && isQPrime ? false : true}
                    onChange={(e) => handleNChange(e)}
                  />
                  <button
                    type="button"
                    disabled={isPPrime && isQPrime ? false : true}
                    className="py-[4px] px-6 bg-green-300 absolute right-0 rounded-md "
                    onClick={() => pickN()}
                  >
                    <PencilSquareIcon
                      className="h-7 w-4 flex-none "
                      aria-hidden="true"
                    />
                  </button>
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
                  {p && q && `= (${Number(p) - 1} * ${Number(q) - 1})`}
                </label>
                <div className="mt-2 relative">
                  <input
                    id="totient"
                    name="totient"
                    type="number"
                    autoComplete="totient"
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    disabled={isPPrime && isQPrime ? false : true}
                    value={totient}
                    onChange={(e) => handleTotient(e)}
                  />
                  <button
                    type="button"
                    disabled={isPPrime && isQPrime ? false : true}
                    className="py-[4px] px-6 bg-green-300 absolute right-0 rounded-md "
                    onClick={() => pickTotient()}
                  >
                    <PencilSquareIcon
                      className="h-7 w-4 flex-none "
                      aria-hidden="true"
                    />
                  </button>
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
                      totient === "" ||
                      (nErr.length > 0 && nErr !== "no_error") ||
                      (totientErr.length > 0 && totientErr !== "no_error")
                        ? true
                        : false
                    }
                    // onClick={() => generateE()}
                    onChange={(e) => handleEchange(e)}
                    value={e}
                  />
                  <button
                    type="button"
                    className="py-[4px] px-6 bg-green-300 absolute right-0 rounded-md "
                    onClick={() => pickRandomE()}
                    disabled={
                      isPPrime === false ||
                      isQPrime === false ||
                      n === "" ||
                      totient === "" ||
                      (nErr.length > 0 && nErr !== "no_error") ||
                      (totientErr.length > 0 && totientErr !== "no_error")
                        ? true
                        : false
                    }
                  >
                    <PencilSquareIcon
                      className="h-7 w-4 flex-none "
                      aria-hidden="true"
                    />
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
                      totient === "" ||
                      (nErr.length > 0 && nErr !== "no_error") ||
                      (totientErr.length > 0 && totientErr !== "no_error")
                        ? true
                        : false
                    }
                    onChange={(e) => handleDchange(e)}
                  />
                  <button
                    type="button"
                    className="py-[4px] px-6 bg-green-300 absolute right-0 rounded-md"
                    onClick={() => pickDValue()}
                    disabled={
                      isPPrime === false ||
                      isQPrime === false ||
                      n === "" ||
                      totient === "" ||
                      (nErr.length > 0 && nErr !== "no_error") ||
                      (totientErr.length > 0 && totientErr !== "no_error")
                        ? true
                        : false
                    }
                  >
                    <PencilSquareIcon
                      className="h-7 w-4 flex-none "
                      aria-hidden="true"
                    />
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
                  Private key (d, n) :{" "}
                  {`${d ? d : ""} ${d && n ? "," : ""} ${n ? n : ""}`}
                </label>
                <div className="mt-2">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Encryption
          e={e}
          d={d}
          n={n}
          eError={eError}
          dError={dError}
          isReset={isReset}
        />
        <ResetFields resetFields={resetFields} />
      </form>
    </>
  );
};
export default KeyGeneration;
