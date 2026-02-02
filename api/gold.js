export default async function handler(req, res) {
  const url = "https://goldprices.thongsuay.co.th/";

  const r = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept-Language": "th-TH,th;q=0.9,en;q=0.8"
    }
  });

  const t = await r.text();

  const sellMatch = t.match(/ขายออก[^0-9]*([\d,]+)/);
  const buyMatch  = t.match(/ซื้อเข้า[^0-9]*([\d,]+)/);

  const sell = sellMatch ? sellMatch[1] : null;
  const buy  = buyMatch ? buyMatch[1] : null;

  return res.status(200).json({ sell, buy });
}
