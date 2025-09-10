import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COURTS } from "../data/courts";
import { addReview, getReviewsForCourt } from "../utils/storage";
import type { Review } from "../types";
import { IconBack } from "../Components/IconBack";

import './Styles.css';

const stars = [1, 2, 3, 4, 5];

export default function Details() {

    const { id } = useParams();

    const nav = useNavigate();

    const court = useMemo(() => COURTS.find(c => c.id === id), [id]);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const reviews = useMemo(() => id ? getReviewsForCourt(id) : [], [id]);

    if (!court) {
        return (
            <div className="page-wrap">
                <button onClick={() => nav(-1)} aria-label="Back" className="detail-back">
                    <IconBack />
                </button>
                <div className="empty">Court not found.</div>
            </div>
        );
    }

    const submit = () => {
        if (!id || !comment.trim()) return;
        const rev: Review = { courtId: id, rating, comment: comment.trim(), createdAt: Date.now() };
        addReview(rev);
        setComment("");
        window.location.reload();
    };

    return (
        <div className="page-wrap">
            <button onClick={() => nav(-1)} aria-label="Back" className="detail-back">
                <IconBack />
            </button>

            <div className="detail-photo">
                <img src={court.photo} alt={court.photo} />
            </div>

            <section className="detail">
                <h2>{court.name}</h2>
                <div className="detail-summary">
                    <div><strong>Location:</strong> {court.city}, {court.state}</div>
                    <div><strong>Surface:</strong> {court.surface}</div>
                    <div><strong>Court count:</strong> {court.courts}</div>
                    <div><strong>Lights:</strong> {court.lights ? "Yes" : "No"}</div>
                    <div><strong>Indoor:</strong> {court.indoor ? "Yes" : "No"}</div>
                    <div><strong>Rating:</strong><span className="fa fa-star checked"></span>&nbsp;{court.rating} ({court.ratingCount})</div>
                </div>

                <hr />
            </section>

            <section className="reviews">
                <h2>Reviews</h2>
                {reviews.length === 0 && <div className="empty">Add the first review.</div>}
                <ul className="review-list">
                    {reviews.map((r, i) => (
                        <li key={i}>
                            <div className="stars">
                                <span>
                                    {
                                        stars.map(s => (
                                            <span className={`fa fa-star ${s <= r.rating ? 'checked' : ''}`}></span>
                                        ))
                                    }
                                </span>&nbsp;&middot;&nbsp;<span className="review-date">{new Date(r.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="comment">{r.comment}</div>
                        </li>
                    ))}
                </ul>

                <hr />

                <div className="review-form">
                    <label><strong>Add Your Review</strong></label>
                    <div className="stars">
                        {
                            stars.map(s => (
                                <span className={`fa fa-star ${s <= rating ? 'checked' : ''}`} onClick={() => setRating(s)}></span>
                            ))
                        }
                    </div>
                    <textarea
                        placeholder="Leave your comment..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={4}
                    />
                    <button onClick={submit} className="review-submit">Submit</button>
                </div>
            </section>
        </div>
    );
}