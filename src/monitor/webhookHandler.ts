import express from "express";
import type { Request, Response } from "express";
import bodyParser from "body-parser";

export const startWebhookServer = () => {
  const app = express();
  app.use(bodyParser.json());

  app.post("/", async (req: Request, res: Response) => {
    const raw = req.body;

    console.log("📥 FULL Helius Payload:", JSON.stringify(raw, null, 2));

    const events = Array.isArray(raw) ? raw : [raw];

    for (const event of events) {
      const swap = event?.events?.swap;
      if (!swap) continue;

      console.log("🔄 Swap:", {
        owner: swap.owner,
        sourceToken: swap.tokenInputs?.[0]?.mint,
        destinationToken: swap.tokenOutputs?.[0]?.mint,
        amountIn: swap.tokenInputs?.[0]?.rawTokenAmount?.tokenAmount,
        amountOut: swap.tokenOutputs?.[0]?.rawTokenAmount?.tokenAmount,
      });
    }

    res.sendStatus(200);
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Webhook сервер запущено на http://localhost:${PORT}`);
  });
};
