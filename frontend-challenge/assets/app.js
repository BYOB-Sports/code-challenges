import { COURTS, starSVG } from './data.js';

// DOM elements
const grid = document.getElementById('grid');
const q = document.getElementById('q');
const sort = document.getElementById('sort');
const count = document.getElementById('count');
const amenityFilters = document.getElementById('amenity-filters');

// State
let filtered = [...COURTS];
let rendered = 0;
const CHUNK = 12; // Load 12 at a time for perfosrmance

// Get all unique amenities from the data
function getAllAmenities() {
  const amenities = new Set();
  COURTS.forEach(court => {
    court.amenities.forEach(amenity => {
      amenities.add(amenity);
    });
  });
  return Array.from(amenities).sort(); // Sort alphabetically
}


function createAmenityFilters() {
  const amenities = getAllAmenities();
  amenityFilters.innerHTML = amenities.map(amenity => `
    <label style="display:flex;align-items:center;gap:4px;font-size:13px;cursor:pointer;padding:4px 8px;border:1px solid var(--border);border-radius:4px;background:var(--bg);">
      <input type="checkbox" value="${amenity}" style="margin:0;">
      <span>${amenity}</span>
    </label>
  `).join('');
  

  amenityFilters.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });
}

// Main filtering and sorting function
function applyFilters(){
  const term = q.value.trim().toLowerCase();
  const selectedAmenities = Array.from(amenityFilters.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => cb.value);
  
  // Filter courts based on search term and amenities
  filtered = COURTS.filter(c => {
    const searchText = (c.name + ' ' + c.city + ' ' + c.amenities.join(' ')).toLowerCase();
    const matchesTerm = searchText.includes(term);
    const matchesAmenities = selectedAmenities.length === 0 || 
      selectedAmenities.every(amenity => c.amenities.includes(amenity));
    return matchesTerm && matchesAmenities;
  });
  
  const mode = sort.value;
  filtered.sort((a,b)=>{
    if(mode === 'name') return a.name.localeCompare(b.name);
    if(mode === 'rating-high') return b.rating - a.rating || b.reviews.length - a.reviews.length;
    if(mode === 'rating-low') return a.rating - b.rating || a.reviews.length - b.reviews.length;
    return b.rating - a.rating || b.reviews.length - a.reviews.length;
  });
  
  count.textContent = filtered.length;
  grid.innerHTML = '';
  rendered = 0;
  renderMore();
}

function card(c){
  const stars = Math.round(c.rating);
  const starNodes = Array.from({length:5}, (_,i)=>starSVG(i<stars)).join('');
  const url = `court.html?id=${c.id}`;
  
  return `
  <article class="card" role="listitem" tabindex="0">
    <div class="card-top">
      <div class="thumb" aria-hidden="true"><img src="${c.photo}" alt="${c.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;"></div>
      <div class="meta">
        <h3>${c.name}</h3>
        <div class="small">${c.city} • <span class="badge">${c.distance} mi</span></div>
        <div class="stars" aria-label="Rating ${c.rating} out of 5">
          ${starNodes}<div class="small" style="margin-left:6px">${c.rating} (${c.reviews.length} reviews)</div>
        </div>
        <div class="amenities">${c.amenities.map(a=>`<span class="chip">${a}</span>`).join('')}</div>
      </div>
    </div>
    <div class="card-cta"><a class="button secondary" href="${url}">View details</a></div>
  </article>`;
}

// Incremental rendering for performance (scales to many courts)
function renderMore(){
  const next = filtered.slice(rendered, rendered + CHUNK);
  if(next.length === 0) return;
  
  const html = next.map(card).join('');
  const frag = document.createElement('div');
    frag.innerHTML = html;
  

  while(frag.firstChild) {
    grid.appendChild(frag.firstChild);
  }
  
  rendered += next.length;
}


const observer = new IntersectionObserver((entries)=>{
  if(entries.some(e=>e.isIntersecting)) {
      renderMore();
  }
});
observer.observe(document.getElementById('end'));


q.addEventListener('input', applyFilters);
sort.addEventListener('change', applyFilters);


createAmenityFilters();
applyFilters();
