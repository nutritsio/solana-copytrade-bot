import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const HELIUS_API_KEY = process.env.HELIUS_API_KEY!;
const WEBHOOK_ID = process.env.HELIUS_WEBHOOK_ID!;
const WEBHOOK_URL = process.env.WEBHOOK_URL!;

export const updateHeliusWebhook = async (wallets: string[]) => {
  if (!wallets.length) {
    console.warn("⚠️ Пустий список гаманців — пропускаємо оновлення");
    return;
  }

  const url = `https://api.helius.xyz/v0/webhooks/${WEBHOOK_ID}?api-key=${HELIUS_API_KEY}`;
  const body = {
    webhookURL: WEBHOOK_URL,
    transactionTypes: ["Any"],
    accountAddresses: wallets,
    webhookType: "enhanced", // важливо для PUT
  };

  console.log("🟡 PUT URL:", url);
  console.log("📤 PUT body:", JSON.stringify(body, null, 2));

  const res = await fetch(url, {
    method: "PUT", // 🔄 замінив PATCH на PUT
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (res.ok) {
    console.log("✅ Helius webhook оновлено:", JSON.parse(text));
  } else {
    console.error("❌ PUT webhook error:", res.status, text);
  }
};
