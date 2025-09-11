type Props = { value: number; onChange?: (v:number)=>void; size?: number; };
export default function StarRating({ value, onChange, size=20 }: Props) {
  const stars = [1,2,3,4,5];
  const readOnly = !onChange;
  return (
    <div className="rating" role="radiogroup" aria-label="Rating">
      {stars.map(n=>(
        <button key={n} type="button" role="radio" aria-checked={value>=n}
          onClick={()=>!readOnly && onChange?.(n)} className="star" style={{fontSize:size}}
          title={`${n} star${n>1?'s':''}`}>
          {value>=n ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}
