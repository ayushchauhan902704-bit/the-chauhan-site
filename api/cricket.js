export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=20, stale-while-revalidate=60");
  const fetchCB = async (type) => {
    try {
      const r = await fetch(`https://www.cricbuzz.com/api/cricket/matches/v1/${type}`, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.cricbuzz.com/' }
      });
      const d = await r.json();
      let matches = [];
      (d.typeMatches || []).forEach(tm => {
        (tm.seriesMatches || []).forEach(sm => {
          const w = sm.seriesAdWrapper || sm;
          (w.matches || []).forEach(m => matches.push(m));
        });
      });
      return matches;
    } catch(e){ return []; }
  };
  try {
    const [liveRaw, recentRaw, upcomingRaw] = await Promise.all([fetchCB('live'), fetchCB('recent'), fetchCB('upcoming')]);
    const format = (m) => {
      const i = m.matchInfo; if(!i) return null;
      const s1 = i.team1?.teamScore ? `${i.team1.teamScore.runs||0}/${i.team1.teamScore.wickets||0} ${i.team1.teamScore.overs ? `(${i.team1.teamScore.overs})` : ''}` : '';
      const s2 = i.team2?.teamScore ? `${i.team2.teamScore.runs||0}/${i.team2.teamScore.wickets||0} ${i.team2.teamScore.overs ? `(${i.team2.teamScore.overs})` : ''}` : '';
      return { series: i.seriesName, t1: i.team1?.teamSName, t2: i.team2?.teamSName, t1f: i.team1?.teamName, t2f: i.team2?.teamName, s1, s2, status: i.status, state: i.state, time: new Date(parseInt(i.startDate)).toLocaleString('en-IN',{timeZone:'Asia/Kolkata', day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit', hour12:true}), ts: parseInt(i.startDate) };
    };
    const live = liveRaw.map(format).filter(Boolean);
    const recent = recentRaw.map(format).filter(Boolean);
    const upcoming = upcomingRaw.map(format).filter(Boolean);
    return res.status(200).json({ live, recent, upcoming, all:[...live,...recent,...upcoming] });
  } catch(e){ return res.status(200).json({ live:[], recent:[], upcoming:[] }); }
}
