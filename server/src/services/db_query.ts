import db from '../services/db';

export default async function query(query: string, placeholder: {}){
  const data = await db.query(query,placeholder);
  const meta = {page: 1};

  return {
    data,
    meta
  }
}

