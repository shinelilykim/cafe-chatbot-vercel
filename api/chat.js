export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;
  const GAS_URL = process.env.GAS_URL;

  try {
    const response = await fetch(
      GAS_URL + '?q=' + encodeURIComponent(question)
    );
    const data = await response.json();
    res.status(200).json({ answer: data.answer });
  } catch (error) {
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}