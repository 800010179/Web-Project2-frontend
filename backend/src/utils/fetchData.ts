export default async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message );
    }
    const json = await response.json();
    return json;
  };
  