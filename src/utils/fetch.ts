export default async (endpoint: string, params?: string[]) => {
  const request = await fetch(endpoint);
  const json = await request.json();
  return json;
}
