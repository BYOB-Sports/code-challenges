export default function RatingStars({ value }:{ value:number }){
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`${full} out of 5`}>
      {Array.from({length:5}).map((_,i)=> (
        <span key={i} role="img" aria-hidden>{i<full?'★':'☆'}</span>
      ))}
    </span>
  );
}
