import db from '../services/db';

async function getTest(){
  const data = await db.query('SELECT * FROM test',"");
  const meta = {page: 1};

  return {
    data,
    meta
  }
}

export default {
  getTest
}
