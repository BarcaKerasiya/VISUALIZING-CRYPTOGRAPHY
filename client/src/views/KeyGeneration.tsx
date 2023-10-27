import React from "react";
import { ChangeEvent, useState } from "react";
import TooltipFn from "../components/Tooltip";
import { isPrime } from "../utils/isPrime";
import Encryption from "../components/Encryption";
import { getRandomInt } from "../utils/generateRandomNumber";
import { lcm } from "../utils/lcm";
import { gcd } from "../utils/gcd";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  //
};

type formData = {
  p: number;
  q: number;
};

const schema: ZodType<formData> = z.object({
  p: z.number().min(1),
  q: z.number().min(1),
});

const KeyGeneration: React.FC<Props> = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const [p, setP] = useState<number>();
  const [isPPrime, setIsPPrime] = useState<boolean>(false);
  const [q, setQ] = useState<number>();
  const [isQPrime, setIsQPrime] = useState<boolean>(false);
  const [n, setN] = useState<number>();
  const [totient, setTotient] = useState<number>();
  const [e, setE] = useState<number>();
  const [eArr, setEArr] = useState<number[]>([]);
  const [d, setD] = useState<number>();
  const [privateKey, setPrivateKey] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");

  const generateE = () => {
    if (eArr.length > 0) {
      const length = eArr.length - 1;
      const index = getRandomInt(0, length);
      const randomEFromArr = eArr[index];
      setE(randomEFromArr);
      return true;
    }
    const arr = [];
    let newE = 2;
    while (newE < totient) {
      if (gcd(newE, totient) === 1) {
        arr.push(newE);
        setE(newE);
        // break;
      }
      newE++;
    }
    setEArr(arr);
  };

  const handleN = (p: string, q: string) => {
    if (p && q) {
      setN(Number(p) * Number(q));
    } else {
      setN(0);
    }
  };

  const handleTotient = (p: any, q: any) => {
    if (p && q) {
      setTotient(lcm(Number(p) - 1, Number(q) - 1));
    } else {
      setTotient(0);
    }
  };

  const handleP = (e: ChangeEvent<HTMLInputElement>) => {
    if (isPrime(Number(e.target.value))) {
      console.log("iffffff");
      setIsPPrime(true);
      handleN(e.target.value, q);
      handleTotient(e.target.value, q);
    } else {
      console.log("elseeee");

      setIsPPrime(false);
      handleN(0, 0);
      handleTotient(0, 0);
    }
    setP(Number(e.target.value));
  };
  const handleQ = (e: ChangeEvent<HTMLInputElement>) => {
    if (isPrime(Number(e.target.value))) {
      setIsQPrime(true);
    } else {
      setIsQPrime(false);
    }
    setQ(Number(e.target.value));
    handleN(p, e.target.value);
    handleTotient(p, e.target.value);
  };

  const handleNChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (p * q === Number(e.target.value)) {
      setN(Number(e.target.value));
    } else {
      // alert("wrong input");
    }
  };

  // Function to calculate d
  const calculateD = () => {
    for (let i = 1; i <= totient; i++) {
      if ((e * i) % totient === 1) {
        setD(i);
        break;
      }
    }
  };

  const submitForm = (data: formData) => {
    console.log(data);
  };

  return (
    <>
      <form className="px-5" onSubmit={handleSubmit(submitForm)}>
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
                    type="text"
                    name="first-prime-number"
                    id="first-prime-number"
                    autoComplete="given-name"
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
                    autoComplete="family-name"
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
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    value={n}
                    disabled={isPPrime && isQPrime ? false : true}
                    onChange={(e) => handleNChange(e)}
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
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    disabled={isPPrime && isQPrime ? false : true}
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
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    // onClick={() => generateE()}
                    value={e}
                  />
                  <button
                    type="button"
                    className="py-2 px-6 bg-green-300"
                    onClick={() => generateE()}
                  >
                    E
                  </button>
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
                    className="outline-0  w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 focus:shadow-sm sm:text-sm sm:leading-6"
                    value={d}
                  />
                  <button
                    type="button"
                    className="py-2 px-6 bg-green-300"
                    onClick={() => calculateD()}
                  >
                    d
                  </button>
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
