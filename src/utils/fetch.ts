export default async (endpoint: string, params?: string[]) => {
  const request = await fetch(endpoint);
  return await request.json();
}
