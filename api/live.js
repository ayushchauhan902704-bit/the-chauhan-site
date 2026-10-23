// All Sports - No Key Needed - 100% Free & Fast
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=30");

  const sport = req.query.sport || 'cricket';
  
  // ESPN - Free Scoreboard (No API Key)
  const urls = {
    cricket: 'https://site.api.espn.com/apis/site/v2/sports/cricket/8038/scoreboard',
    football: 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
    basketball: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
    tennis: 'https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard'
  };

  try {
    const [live, today] = await Promise.all([
      fetch(urls[sport] || urls.cricket).then(r=>r.json()),
      fetch((urls[sport] || urls.cricket)+'?dates='+new Date().toISOString().split('T')[0].replace(/-/g,'')).then(r=>r.json()).catch(()=>null)
    ]);

    // ESPN data ko simple format me
    const events = live.events || [];
    const formatted = events.map(e=>{
      const comp = e.competitions[0];
      const status = comp.status.type.shortDetail; // LIVE, FT, 7:30 PM etc
      const time = new Date(comp.date).toLocaleString('en-IN',{timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', day:'2-digit', month:'short'});
      return {
        id: e.id,
        name: e.name,
        shortName: e.shortName,
        status: comp.status.type.state, // in, pre, post
        timeStr: status + ' | ' + time,
        home: comp.competitors[0]?.team?.abbreviation || comp.competitors[0]?.team?.displayName,
        away: comp.competitors[1]?.team?.abbreviation || comp.competitors[1]?.team?.displayName,
        scoreHome: comp.competitors[0]?.score || '0',
        scoreAway: comp.competitors[1]?.score || '0',
        isLive: comp.status.type.state === 'in'
      }
    });

    // Aaj / Kal alag kar
    const now = new Date();
    const liveMatches = formatted.filter(m=>m.isLive);
    const upcoming = formatted.filter(m=>!m.isLive);

    return res.status(200).json({ live: liveMatches, upcoming, all: formatted });
  } catch(e){
    return res.status(200).json({ live:[], upcoming:[], error:e.message });
  }
}
