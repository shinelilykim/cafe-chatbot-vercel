export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;
  const GAS_URL = process.env.GAS_URL;

  try {
    const response = await fetch(
      GAS_URL + '?q=' + encodeURIComponent(question),
      {
        redirect: 'follow',  // ← 리다이렉트 자동 따라가기
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: '응답 파싱 실패', raw: text });
    }

    res.status(200).json({ answer: data.answer });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}