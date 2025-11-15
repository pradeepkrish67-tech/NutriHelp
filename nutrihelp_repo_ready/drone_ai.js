// Drone AI logic (frontend helper)
// In production, this logic should run server-side (cloud functions) with safety checks and operator overrides.
// This is a simulation helper that selects nearest drone and creates a dispatch record in Firestore.

export function chooseDrone(drones, pickup) {
  // drones: [{id, lat, lon, battery, status, load}], pickup: {lat, lon, urgency}
  // score = distance - battery_penalty + load_penalty - urgency_bonus
  function haversine(a,b){ const toR = Math.PI/180; const R=6371; const dlat=(b.lat-a.lat)*toR; const dlon=(b.lon-a.lon)*toR; const la=a.lat*toR; const lb=b.lat*toR; const h=Math.sin(dlat/2)**2 + Math.cos(la)*Math.cos(lb)*Math.sin(dlon/2)**2; return 2*R*Math.asin(Math.sqrt(h)); }
  let best = null; let bestScore = Infinity;
  drones.forEach(d => {
    const dist = haversine({lat:d.lat,lon:d.lon}, pickup);
    const score = dist + (1 - (d.battery||0)/100)*10 + (d.load||0)*2 - (pickup.urgency||0)*5;
    if(score < bestScore){ bestScore = score; best = d; }
  });
  return best;
}
