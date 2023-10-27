const testFn = async () => {
  const { generateKeyPairSync, createSign, createVerify } = await import(
    "node:crypto"
  );

  const { privateKey, publicKey } = generateKeyPairSync("ec", {
    namedCurve: "sect239k1",
  });

  //   function generateKeyPairSync(type, options) {
  //     return handleError(createJob(kCryptoJobSync, type, options).run());
  //   }
  console.log("privateKey", privateKey);
  console.log("publicKey", publicKey);

  const sign = createSign("SHA256");
  sign.write("barca");
  sign.end();
  const signature = sign.sign(privateKey, "hex");
  console.log(signature);

  const verify = createVerify("SHA256");
  verify.write("barca");
  verify.end();
  console.log(verify.verify(publicKey, signature, "hex"));
  // Prints: true
};

testFn();
