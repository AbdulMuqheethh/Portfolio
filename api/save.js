export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const BIN_ID  = '69b53fb1b7ec241ddc69a87f';
  const API_KEY = '$2a$10$B2S4vagr6nkRLFDiDeZp4.2fCAmRD5.D9GoUfxYwlm1Vxb9eJ/cX2';

  if (req.method === 'GET') {
    const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': API_KEY, 'X-Bin-Meta': 'false' }
    });
    const text = await r.text();
    res.setHeader('Content-Type', 'application/json');
    return res.status(r.status).send(text);
  }

  if (req.method === 'PUT') {
    // manually read raw body stream
    const rawBody = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => data += chunk.toString());
      req.on('end', () => resolve(data));
      req.on('error', reject);
    });

    const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
        'X-Bin-Meta': 'false'
      },
      body: rawBody
    });
    const text = await r.text();
    res.setHeader('Content-Type', 'application/json');
    return res.status(r.status).send(text);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
