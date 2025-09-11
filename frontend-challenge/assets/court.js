import { COURTS, starSVG } from './data.js';

function getParam(name){
  const u = new URL(location.href);
  return u.searchParams.get(name);
}

const id = Number(getParam('id'));
const court = COURTS.find(c=>c.id===id);

const title = document.getElementById('title');
const nameEl = document.getElementById('name');
const meta = document.getElementById('meta');
const starsEl = document.getElementById('stars');
const amenities = document.getElementById('amenities');
const thumb = document.getElementById('thumb');
const reviewsEl = document.getElementById('reviews');
const form = document.getElementById('review-form');

if(!court){
  document.body.innerHTML = '<main class="container"><div class="empty">Court not found. <a href="index.html">Go back</a>.</div></main>';
  throw new Error('Missing court');
}

title.textContent = court.name.split(' ')[0];
nameEl.textContent = court.name;
meta.textContent = `${court.city} • ${court.distance} mi away • ${court.amenities[0]} court`;
thumb.innerHTML = `<img src="${court.photo}" alt="${court.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;

const starNodes = Array.from({length:5}, (_,i)=>starSVG(i<Math.round(court.rating))).join('');
starsEl.innerHTML = starNodes + `<span class="small" style="margin-left:6px">${court.rating} (${court.reviews.length} reviews)</span>`;
amenities.innerHTML = court.amenities.map(a=>`<span class="chip">${a}</span>`).join('');

// Reviews store (court data + local)
const KEY = `court:${id}:reviews`;
function loadReviews(){
  // Use the reviews from the court data as seeded reviews
  const seeded = court.reviews.map(review => ({
    name: review.user,
    rating: review.rating,
    text: review.comment,
    date: review.date
  }));
  const local = JSON.parse(localStorage.getItem(KEY) || '[]');
  return seeded.concat(local);
}
function saveReview(r){
  const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
  arr.unshift(r);
  localStorage.setItem(KEY, JSON.stringify(arr));
}
function reviewItem(r){
  const stars = Array.from({length:5}, (_,i)=>starSVG(i<r.rating)).join('');
  return `<div class="review">
    <h4>${r.name}</h4>
    <div class="date">${r.date}</div>
    <div class="stars" aria-hidden="true">${stars}</div>
    <p style="margin:6px 0 0; line-height:1.4">${r.text}</p>
  </div>`;
}
function renderReviews(){
  const list = loadReviews();
  reviewsEl.innerHTML = list.map(reviewItem).join('') || `<div class="empty">No reviews yet.</div>`;
}
renderReviews();

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(form);
  const name = (fd.get('name')||'').toString().trim() || 'Anonymous';
  const rating = Number(fd.get('rating')||'4');
  const text = (fd.get('text')||'').toString().trim();
  if(!text){ alert('Please add a short comment.'); return; }
  const now = new Date();
  const date = now.toISOString().slice(0,10);
  const review = {name, rating, text, date};
  saveReview(review);
  form.reset();
  renderReviews();
  // A11y announce
  const div = document.createElement('div');
  div.setAttribute('role','status');
  div.style.position='absolute';div.style.left='-9999px';
  div.textContent = 'Review submitted';
  document.body.appendChild(div);
  setTimeout(()=>div.remove(),1000);
});
