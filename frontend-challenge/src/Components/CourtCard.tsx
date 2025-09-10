import type { Court } from "../types";

import './Styles.css';

interface ICourtCard {
    court: Court;
    onSelectCourt: (court: Court) => void;
}

export default function CourtCard(props: ICourtCard) {

    const { court, onSelectCourt } = props;

    const onClickCard = () => {
        onSelectCourt(court);
    }

    return (
        <div className="card" onClick={() => onClickCard()}>
            <img src={court.photo} alt={court.photo} />
            <div className="card-title text-ellipsis">{court.name}</div>
            <div className="card-meta text-ellipsis">
                {court.city}, {court.state} | {court.surface}, {court.courts} courts
            </div>
            <div className="card-rating">
                <span className="fa fa-star checked"></span>{court.rating.toFixed(1)} ({court.ratingCount})
            </div>
        </div>
    );
}