import PocketBase from 'pocketbase';
const url = 'https://shayonafertilizer.pockethost.io/'

const db = new PocketBase(url)
db.autoCancellation(false)
export default db