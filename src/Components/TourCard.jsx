import React, { useState } from 'react';
//built the card with rendering and interaction 
function TourCard({ id, name, info, price, image, onRemove }) {
  const [readMore, setReadMore] = useState(false);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };
//errors
  return (
    <div className="tour-card">
      <img src={image} alt={name} className="tour-image" />
      <div className="tour-info">
        <h3>{name}</h3>
        <p><strong>Price:</strong> ${price}</p>
        <p>
          {readMore ? info : `${info.substring(0, 100)}...`}
          <button onClick={handleReadMore}>
            {readMore ? "Show Less" : "Read More"}
          </button>
        </p>
        <button onClick={() => onRemove(id)} className="remove-btn">
          Not Interested
        </button>
      </div>
    </div>
  );
}

export default TourCard;