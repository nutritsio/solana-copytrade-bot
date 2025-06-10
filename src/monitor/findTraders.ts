import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const HELIUS_API_KEY = process.env.HELIUS_API_KEY!;
const SEARCH_LIMIT = 200;

export const findTopSwappers = async (): Promise<string[]> => {
  const DUMMY = "3sGfYaHKkpbTt3pNPBwYdLMadKn5rJZtc97PB7meugja"; // активний whale з Jupiter
  const url = `https://api.helius.xyz/v0/addresses/${DUMMY}/transactions?api-key=${HELIUS_API_KEY}&pageSize=${SEARCH_LIMIT}`;

  const res = await fetch(url);
  const raw = await res.text();
  console.log("📄 Сирий response від Helius:\n", raw);

  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error("❌ JSON parsing error:", err);
    return [];
  }

  const data = Array.isArray(parsed) ? parsed : parsed?.transactions || [];
  console.log("📦 Отримано транзакцій:", data.length);

  if (!Array.isArray(data)) {
    console.error("❌ data is not iterable (не масив):", data);
    return [];
  }

  const map: Record<string, number> = {};

  for (const tx of data) {
    const swap = tx?.events?.swap;
    if (swap?.owner) {
      map[swap.owner] = (map[swap.owner] || 0) + 1;
    }
  }

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 10).map(([addr]) => addr);

  console.log("🔍 Знайдені активні трейдери:", top);
  return top;
};
