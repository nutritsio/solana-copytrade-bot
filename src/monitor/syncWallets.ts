import { findTopSwappers } from "./findTraders";
import { updateHeliusWebhook } from "./updateWebhook";

const syncWallets = async () => {
  console.log("🚀 Старт синхронізації гаманців");
  // const topWallets = await findTopSwappers();
  const topWallets = ["3sGfYaHKkpbTt3pNPBwYdLMadKn5rJZtc97PB7meugja"];
  console.log("⬆️ Список гаманців для оновлення:", topWallets);
  await updateHeliusWebhook(topWallets);
};

syncWallets();
