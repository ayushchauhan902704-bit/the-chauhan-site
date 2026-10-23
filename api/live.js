// api/live.js - 100% Secure, Key kabhi leak nahi hogi
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=20, stale-while-revalidate=30");
  
  const KEY = process.env.API_SPORTS_KEY;
  if (!KEY) return res.status(200).json({ response: [] });

  const { sport } = req.query;
  let url = "https://v3.football.api-sports.io/fixtures?live=all";

  try {
    // Football ke liye LIVE, agar LIVE na ho to aaj ke matches
    let response = await fetch(url, { headers: { "x-apisports-key": KEY } });
    let data = await response.json();

    if (!data.response || data.response.length === 0) {
      const today = new Date().toISOString().split('T')[0];
      response = await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
        headers: { "x-apisports-key": KEY }
      });
      data = await response.json();
    }

    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({ response: [], error: e.message });
  }
}
