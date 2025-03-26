import CardsGrid from "@/components/CardsGrid";
import { getPopularMovies } from "@/utils/api";

export const metadata = {
  title: "Popular Movies",
  description: "A list of popular movies",
};

export default async function Popular() {
  const popularMovies = await getPopularMovies();

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-center text-3xl font-bold">Popular Movies</h1>
      <CardsGrid movies={popularMovies} />
    </div>
  );
}
