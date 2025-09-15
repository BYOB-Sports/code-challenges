// CourtCard displays a tennis court's image and details in a styled card.
// Props:
//   court: Court object containing court details
//   onClick: Optional click handler for card
import { Card, Tag } from 'antd';
import React from 'react';
import type { Court } from '../mock/courts';

interface CourtCardProps {
  court: Court;
  onClick?: () => void;
}

const CourtCard: React.FC<CourtCardProps> = ({ court, onClick }) => (
  <Card
    hoverable
    className="w-full max-w-md mx-auto mb-6 shadow-lg rounded-xl border-none"
    cover={
      <div style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden', background: '#fff' }}>
        <img
          alt={court.name}
          src={court.image}
          style={{ height: 180, width: '100%', objectFit: 'cover', display: 'block', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
      </div>
    }
    onClick={onClick}
    bodyStyle={{ padding: '24px 20px 20px 20px', textAlign: 'center' }}
  >
    <h2 style={{ fontWeight: 800, fontSize: '1.35rem', color: '#1677ff', marginBottom: 12, letterSpacing: 0.5 }}>{court.name}</h2>
    <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
      <Tag color="blue" style={{ fontSize: '1rem', padding: '2px 12px', borderRadius: 8 }}>{court.city}</Tag>
      <Tag color="green" style={{ fontSize: '1rem', padding: '2px 12px', borderRadius: 8 }}>{court.surface}</Tag>
    </div>
    <div style={{ color: '#888', fontSize: '1rem', marginTop: 4 }}>{court.distance_km} km away</div>
  </Card>
);

export default CourtCard;
