export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const BIN_ID  = '69b53fb1b7ec241ddc69a87f';
  const API_KEY = '$2a$10$moU9Qu81YEaM7K4Icd6LlOFkx4PhDXtRk5i7tSSeWJTyZFvkR.HwG';

  if (req.method === 'GET') {
    const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': API_KEY, 'X-Bin-Meta': 'false' }
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  if (req.method === 'PUT') {
    const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
        'X-Bin-Meta': 'false'
      },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
