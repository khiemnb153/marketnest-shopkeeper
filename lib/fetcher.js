const fetcher = async (endpoint, accessToken) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    const error = new Error('Something went wrong when fetching data')
    Object.assign(error, await res.json())
    throw error
  }

  return (await res.json()).data
}

export default fetcher
