
const courts = [];
for (let i = 1; i <= 55; i++) {
  courts.push({
    id: i,
    name: `Tennis Court #${i}`,
    location: `Honeygo Park ${i}`,
    rating: (Math.random() * (5 - 3) + 3).toFixed(1), // Random rating between 3 and 5
    image: `https://picsum.photos/seed/${i}/400/300`, // Placeholder images
    reviews: [
      { id: 1, user: 'Roger', rating: 4, comment: 'Great and well-maintained court.' },
      { id: 2, user: 'Peter', rating: 5, comment: 'Best courts!' },
    ],
  });
}

export default courts;
