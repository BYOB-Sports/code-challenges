export function averageFrom(reviews: {rating:number}[]) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((s,r)=>s+r.rating,0);
  return Math.round((sum / reviews.length) * 10) / 10; // one decimal
}
