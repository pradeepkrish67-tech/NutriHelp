export function pickVolunteer(vols, task){
  // Simple heuristic: minimize distance + load, prefer available vehicles
  vols.sort((a,b)=> (a.distance + a.load) - (b.distance + b.load));
  return vols[0];
}
