import { ChangeEvent, useState } from "react";

const Encryption = ({ e, d, n }) => {
  const [m, setM] = useState<string>("");
  const [cipher, setCipher] = useState("");
  const [cipherWithBigInt, setCipherWithBigInt] = useState<bigint[]>([]);
  console.log("cipher", cipher);
  console.log("cipherWithBigInt", cipherWithBigInt);
  const [decreyptedText, setDecreyptedText] = useState("");
  const [isNumer, setIsNumber] = useState(true);

  const generateEncryptedTextForNumber = () => {
    console.log("generateEncryptedTextForNumber");

    const c = BigInt(Number(m)) ** BigInt(Number(e)) % BigInt(Number(n));
    setCipher(String(Number(c)));
  };

  const generateEncryptedTextForText = (message: string) => {
    const encryptedMessage = [];
    for (let i = 0; i < message.length; i++) {
      const charCode = message.charCodeAt(i);
      const encryptedChar = BigInt(charCode) ** BigInt(e) % BigInt(n);
      encryptedMessage.push(encryptedChar);
    }
    setCipher(String(encryptedMessage));
    setCipherWithBigInt(encryptedMessage);
  };

  const generateDecreyptedTextForText = () => {
    const decryptedMessage = [];
    for (let i = 0; i < cipherWithBigInt.length; i++) {
      const decryptedChar = String.fromCharCode(
        Number(BigInt(cipherWithBigInt[i]) ** BigInt(d) % BigInt(n))
      );
      decryptedMessage.push(decryptedChar);
    }

    // Join the decrypted characters to form the original message
    const originalMessage = decryptedMessage.join("");
    console.log(originalMessage);
    setDecreyptedText(originalMessage);
  };

  const generateDecreyptedTextForNumber = () => {
    console.log("generateDecreyptedTextForNumber");
    const de = BigInt(Number(cipher)) ** BigInt(Number(d)) % BigInt(Number(n));
    setDecreyptedText(String(Number(de)));
  };

  const handleMChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("innn");
    if (/^[0-9]+$/.test(value)) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
    setM(value);
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
                  onChange={(e) => handleMChange(e)}
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
                  onClick={() =>
                    isNumer
                      ? generateEncryptedTextForNumber()
                      : generateEncryptedTextForText(m)
                  }
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
                  onClick={() =>
                    isNumer
                      ? generateDecreyptedTextForNumber()
                      : generateDecreyptedTextForText()
                  }
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
