import CardsGrid from "@/components/CardsGrid";
import Pagination from "@/components/Pagination";
import { getPopularMovies } from "@/utils/api";

export const metadata = {
  title: "Popular Movies",
  description: "A list of popular movies",
};

export default async function Popular({ searchParams }) {
  const params = await searchParams;
  const page = params.page || "1";
  const popularMovies = await getPopularMovies(page);

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-center text-3xl font-bold">Popular Movies</h1>
      <Pagination page={page} />
      <CardsGrid movies={popularMovies} />
    </div>
  );
}
