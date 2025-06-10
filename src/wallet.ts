import { Keypair, Connection } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

export const connection = new Connection("https://api.mainnet-beta.solana.com");

export const getKeypair = (): Keypair => {
  const secret = JSON.parse(process.env.PRIVATE_KEY || "[]");
  return Keypair.fromSecretKey(Uint8Array.from(secret));
};
