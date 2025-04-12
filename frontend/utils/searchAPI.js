export async function searchMovies(query, page = 1) {
  if (!query) {
    return [];
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `http://localhost:8080/search/movies?query=${encodedQuery}&page=${page}`,
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Search API error! Status: ${response.status}, Query: ${query}, Page: ${page}`,
      );
      console.error("Error response body:", errorText);

      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}
