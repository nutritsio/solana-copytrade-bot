import express from "express";
import bodyParser from "body-parser";
import { handleIncomingTxn } from "./parser";

const app = express();
app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const tx = req.body;
  console.log(
    "🔔 Отримано транзакцію від Helius:",
    JSON.stringify(tx, null, 2)
  );
  await handleIncomingTxn(tx);
  res.sendStatus(200);
});

export const startWebhookServer = () => {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`🚀 Helius Webhook listener запущено на порті ${port}`);
  });
};
