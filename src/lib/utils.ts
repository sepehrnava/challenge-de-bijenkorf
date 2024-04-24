import { SearchResults } from "./types";

export const cx = (
  ...classes: (string | Record<string, boolean>)[]
): string => {
  return classes
    .map((cls) => {
      if (typeof cls === "string") {
        return cls;
      } else {
        return Object.entries(cls)
          .filter(([_, value]) => value)
          .map(([key, _]) => key)
          .join(" ");
      }
    })
    .join(" ");
};

export const fetchResults = async (
  searchQuery: string,
  page: number,
  limit: number
): Promise<SearchResults> => {
  const params = new URLSearchParams({
    search: searchQuery,
    page: page.toString(),
    limit: limit.toString(),
  });

  const url = `http://localhost:3000/api/search?${params.toString()}`;
  try {
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    // console.error("Error fetching data:", error);
    // throw error;
  }
};
