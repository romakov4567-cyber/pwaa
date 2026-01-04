
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { domain } = request.body;

  if (!domain) {
    return response.status(400).json({ error: 'Domain is required' });
  }

  // Configuration
  const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
  const PROJECT_ID = process.env.VERCEL_PROJECT_ID;
  const TEAM_ID = process.env.VERCEL_TEAM_ID; // Optional

  if (!VERCEL_API_TOKEN || !PROJECT_ID) {
    return response.status(500).json({ error: 'Server configuration missing (Tokens)' });
  }

  try {
    // Construct URL based on whether a team ID exists
    let url = `https://api.vercel.com/v10/projects/${PROJECT_ID}/domains`;
    if (TEAM_ID) {
      url += `?teamId=${TEAM_ID}`;
    }

    const vercelRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domain }),
    });

    const data = await vercelRes.json();

    if (!vercelRes.ok) {
        // If domain already exists, we consider it a success for idempotency
        if (data.error && data.error.code === 'domain_already_in_use') {
            return response.status(200).json({ message: 'Domain already active', data });
        }
        return response.status(vercelRes.status).json({ error: data.error?.message || 'Failed to add domain' });
    }

    return response.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Vercel API Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
