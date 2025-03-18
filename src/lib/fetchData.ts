export default async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Server Error! Status: ${response.status}`);
  }

  return response.json();
}
