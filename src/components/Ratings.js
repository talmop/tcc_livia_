import React, { useState, useEffect } from "react";

function Ratings({ point, onSubmit }) {
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [average, setAverage] = useState(0);

  useEffect(() => {
    if (point.reviews && point.reviews.length > 0) {
      const avg = point.reviews.reduce((sum, r) => sum + r.stars, 0) / point.reviews.length;
      setAverage(avg.toFixed(1));
    } else {
      setAverage(0);
    }
  }, [point]);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(point.id, { comment, stars });
    setComment("");
    setStars(5);
  };

  return (
    <div>
      <h3>Avaliar {point.name}</h3>
      <input
        type="text"
        placeholder="Deixe sua avaliação..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>
      <button onClick={handleSubmit}>POSTAR</button>

      {average > 0 && (
        <h4>
          Média das avaliações: {average} ⭐
        </h4>
      )}
    </div>
  );
}

export default Ratings;
