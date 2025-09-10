const ReviewCard = ({ text, author }) => {
  return (
    <div className="rounded-lg bg-white shadow p-3 my-2">
      <h3 className="font-semibold mb-1 text-sm">{author}</h3>
      <p>{text}</p>
    </div>
  );
};
export default ReviewCard;
