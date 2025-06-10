export const handleIncomingTxn = async (tx: any) => {
  try {
    const swap = tx.events?.swap || null;
    if (!swap) return;

    const inAmount = swap.nativeInputAmount;
    const inSymbol = swap.tokenInputs?.[0]?.symbol;
    const outSymbol = swap.tokenOutputs?.[0]?.symbol;
    const mint = swap.tokenOutputs?.[0]?.mint;

    console.log(`💱 ${inAmount} ${inSymbol} → ${outSymbol} (${mint})`);

    // ТУТ: перевірка токена через whitelist/anti-rug + запуск покупки
  } catch (e) {
    console.error("❌ handleIncomingTxn error", e);
  }
};
