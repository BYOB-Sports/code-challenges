document.addEventListener('DOMContentLoaded', () => {
    const courtsContainer = document.getElementById('courtsList');
    const courtDetailsContainer = document.getElementById('courtDetails');
    const urlParams = new URLSearchParams(window.location.search);

    // Function to create star rating HTML
    function createStarRating(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        return starsHtml;
    }

    // --- Index Page ---
    if (courtsContainer) {
        const searchInput = document.getElementById('searchInput');

        function renderCourts(courtsToRender) {
            courtsContainer.innerHTML = '';
            if (courtsToRender.length === 0) {
                courtsContainer.innerHTML = '<p style="text-align: center; margin-top: 20px;">No courts found. Try a different search!</p>';
                return;
            }

            courtsToRender.forEach(court => {
                const courtCard = document.createElement('a');
                courtCard.href = `court.html?id=${court.id}`;
                courtCard.className = 'court-card';

                const avgRating = court.reviews.length > 0
                    ? (court.reviews.reduce((sum, r) => sum + r.rating, 0) / court.reviews.length).toFixed(1)
                    : 'N/A';
                
                const cardContent = `
                    <img src="${court.image}" alt="${court.name}">
                    <div class="court-info">
                        <h2>${court.name}</h2>
                        <p>${court.location}</p>
                        <p>Avg Rating: ${avgRating} / 5</p>
                    </div>
                `;
                courtCard.innerHTML = cardContent;
                courtsContainer.appendChild(courtCard);
            });
        }

        renderCourts(mockCourtsData);

        // Search
        function handleSearch() {
            const query = searchInput.value.toLowerCase();
            const filteredCourts = mockCourtsData.filter(court =>
                court.name.toLowerCase().includes(query) ||
                court.location.toLowerCase().includes(query)
            );
            renderCourts(filteredCourts);
        }

        searchInput.addEventListener('input', handleSearch);
        document.getElementById('searchButton').addEventListener('click', handleSearch);
    }

    // --- Court Details Page ---
    if (courtDetailsContainer) {
        const courtId = parseInt(urlParams.get('id'));
        const court = mockCourtsData.find(c => c.id === courtId);

        if (!court) {
            courtDetailsContainer.innerHTML = '<p>Court not found.</p>';
            return;
        }

        document.getElementById('courtName').textContent = court.name;
        document.getElementById('courtImage').src = court.image;
        document.getElementById('courtImage').alt = court.name;
        document.getElementById('courtLocation').textContent = `Location: ${court.location}`;
        document.getElementById('courtDescription').textContent = court.description;

        const reviewsList = document.getElementById('reviewsList');
        function renderReviews() {
            reviewsList.innerHTML = '';
            if (court.reviews.length === 0) {
                reviewsList.innerHTML = '<p>No reviews yet. Be the first to leave one!</p>';
            } else {
                court.reviews.forEach(review => {
                    const reviewItem = document.createElement('div');
                    reviewItem.className = 'review-item';
                    reviewItem.innerHTML = `
                        <div class="review-rating">${createStarRating(review.rating)}</div>
                        <p class="review-text">${review.text}</p>
                    `;
                    reviewsList.appendChild(reviewItem);
                });
            }
        }
        renderReviews();

        // Review submission
        const reviewForm = document.getElementById('reviewForm');
        let selectedRating = 0;

        document.querySelectorAll('.rating-stars i').forEach(star => {
            star.addEventListener('click', (e) => {
                selectedRating = parseInt(e.target.dataset.rating);
                document.querySelectorAll('.rating-stars i').forEach(s => {
                    s.className = (s.dataset.rating <= selectedRating) ? 'fas fa-star' : 'far fa-star';
                });
            });
        });

        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const reviewText = document.getElementById('reviewText').value;

            if (selectedRating === 0 || reviewText.trim() === '') {
                alert('Please select a star rating and write a review.');
                return;
            }

            const newReview = { rating: selectedRating, text: reviewText };
            addReviewToCourt(courtId, newReview);

            // Re-render reviews and reset form
            renderReviews();
            reviewForm.reset();
            selectedRating = 0;
            document.querySelectorAll('.rating-stars i').forEach(star => star.className = 'far fa-star');
        });
    }
});

function addReviewToCourt(courtId, review) {
    const court = mockCourtsData.find(c => c.id === courtId);
    if (court) {
        court.reviews.push(review);
    }
}