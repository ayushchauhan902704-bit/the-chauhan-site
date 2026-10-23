export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=30");

  const fetchJSON = async (tab) => {
    try{
      const r = await fetch(`https://hs-consumer-api.espncricinfo.com/v1/pages/matches/${tab}?lang=en`,{
        headers:{'User-Agent':'Mozilla/5.0'}
      });
      const d = await r.json();
      return d.content?.matches || d.content?.recentMatches || [];
    }catch(e){ return []; }
  };

  const [live, recent, upcoming] = await Promise.all([
    fetchJSON('live'),
    fetchJSON('recent'),
    fetchJSON('upcoming')
  ]);

  // Format for frontend
  const format = (m) => {
    const date = new Date(m.startTime);
    const ist = date.toLocaleString('en-IN',{timeZone:'Asia/Kolkata', day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit', hour12:true});
    return {
      series: m.series?.longName || 'International',
      title: m.title || `${m.teams?.[0]?.team?.abbreviation} vs ${m.teams?.[1]?.team?.abbreviation}`,
      team1: m.teams?.[0]?.team?.abbreviation || 'T1',
      team2: m.teams?.[1]?.team?.abbreviation || 'T2',
      score1: m.teams?.[0]?.score || '',
      score2: m.teams?.[1]?.score || '',
      status: m.statusText || m.status || '',
      time: ist,
      ground: m.ground?.smallName || '',
      date: date
    };
  };

  return res.status(200).json({
    live: live.map(format),
    recent: recent.slice(0,20).map(format), // 2 din purane
    upcoming: upcoming.slice(0,20).map(format) // Aaj + Kal
  });
}
