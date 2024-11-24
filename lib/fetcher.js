const fetcher = async (endpoint, accessToken) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return await res.json()
}

export default fetcher
