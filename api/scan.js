export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { image, mediaType } = req.body;
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
          { type: 'text', text: 'Extrae los siguientes datos de esta boleta. Responde SOLO con JSON válido sin backticks:\n{"nro_boleta": "número","fecha": "DD/MM/AAAA","monto_total": número,"nombre_empresa": "nombre"}' }
        ]
      }]
    })
  });
  
  const data = await response.json();
  res.status(200).json(data);
}
