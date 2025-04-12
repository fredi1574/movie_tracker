import CardsGrid from "@/components/CardsGrid";
import Pagination from "@/components/Pagination";
import { searchMovies } from "@/utils/searchAPI";

const RESULTS_PER_PAGE = 20;

export async function generateMetadata({ searchParams }) {
  const query = searchParams?.query || "";
  return {
    title: query ? `Search results for ${query}` : "Search Movies",
  };
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.query?.trim() || "";
  const page = searchParams?.page || "1";
  const currentPageNumber = parseInt(page, 10);

  let movies = [];
  if (query) {
    movies = await searchMovies(query, currentPageNumber);
  }

  const hasNextPage = movies.length === RESULTS_PER_PAGE;

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        {query ? `Search Results for "${query}"` : "Search Movies"}
      </h1>

      {!query && (
        <p className="text-center text-gray-400">
          Please enter a movie title in the search bar above.
        </p>
      )}

      {query && movies.length === 0 && (
        <p className="text-center text-gray-400">
          {`No movies found matching ${query}. Try a different search term.`}
        </p>
      )}

      {query && movies.length > 0 && (
        <Pagination
          page={page}
          basePath={`/search?query=${encodeURIComponent(query)}`}
          hasNextPage={hasNextPage}
        />
      )}

      {movies.length > 0 && <CardsGrid movies={movies} />}

      {query && movies.length > 0 && (
        <Pagination
          page={page}
          basePath={`/search?query=${encodeURIComponent(query)}`}
          hasNextPage={hasNextPage}
        />
      )}
    </div>
  );
}
