import Dexie from 'dexie';

export const db = new Dexie('tenniscourts');
db.version(1).stores({
  reviews: '++id, courtId, name, content, stamp, showDate' 
});