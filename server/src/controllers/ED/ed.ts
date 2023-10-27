import { Request, Response } from "express";
import forge from "node-forge";

// const crypto = require("crypto");

export const createChiper = async (req: Request, res: Response) => {
  console.log("innn");
  const { e, n } = req.body;
  console.log("e", e);
  console.log("n", n);

  // Define your plaintext message
  const plaintextMessage = "Hello, RSA Encryption!";

  // Generate or obtain the recipient's RSA public key (n and e)
  // const n = /* Alice's modulus */;
  // const e = /* Alice's public exponent */;

  // Convert n and e to BigInt
  const nBigInt = BigInt(n);
  const eBigInt = BigInt(e);
  console.log(nBigInt, eBigInt);

  // Base64 encode the modulus (n) and public exponent (e)
  const base64Modulus = Buffer.from(nBigInt.toString(16), "hex").toString(
    "base64"
  );
  const base64Exponent = Buffer.from(eBigInt.toString(16), "hex").toString(
    "base64"
  );
  console.log("base64Modulus", base64Modulus);
  console.log("base64Exponent", base64Exponent);
  // Create a Forge public key object
  const publicKey = forge.pki.publicKeyFromPem(`
  -----BEGIN RSA PUBLIC KEY-----
  ${base64Modulus}
  ${base64Exponent}
  -----END RSA PUBLIC KEY-----
  `);
  console.log("publicKey", publicKey);
  // // Encrypt the plaintext message
  // const ciphertext = publicKey.encrypt(plaintextMessage, "RSA-OAEP", {
  //   md: forge.md.sha256.create(),
  // });

  // // Convert the ciphertext to a hexadecimal string
  // const ciphertextHex = forge.util.bytesToHex(ciphertext);

  // console.log("Ciphertext:", ciphertextHex);

  res.status(200).json({ cipher: "inn" });
};
