import db from '../services/db';

export default async function query(query: string){
  const data = await db.query(query,"");
  const meta = {page: 1};

  return {
    data,
    meta
  }
}

