import type { Court } from "../types";
import { useNavigate } from 'react-router-dom';
import { IconBack } from "./IconBack";

import './Styles.css';

interface ICourtCard {
    court: Court | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CourtDrawer(props: ICourtCard) {
    const { court, isOpen, onClose } = props;

    const navigate = useNavigate();

    return (
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
            <div className="drawer-content">
                <button onClick={() => onClose()} aria-label="Back" className="detail-back">
                    <IconBack />
                </button>

                {
                    court ?
                        <>
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

                                <button className="see-more" onClick={() => navigate(`/court/${court.id}`)}>See More</button>
                            </section>
                        </>
                        :
                        <p>Could not find Court Data.</p>
                }

            </div>
        </div>
    );
}