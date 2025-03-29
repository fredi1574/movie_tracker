import { getActorMovies, getDirectorMovies } from "@/utils/moviePageAPI";
import CardsGrid from "@/components/CardsGrid";

export default async function Person({ params }) {
  const { role, id, name } = await params;

  let movies = [];
  if (role === "actor") {
    movies = await getActorMovies(id);
  } else if (role === "director") {
    movies = await getDirectorMovies(id);
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-center text-3xl font-bold">{name} Movies</h1>
      <CardsGrid movies={movies} />
    </div>
  );
}
