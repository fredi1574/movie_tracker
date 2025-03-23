import MovieCard from "@/components/MovieCard";

export default async function CardsGrid({ movies }) {
  return (
    <div className="container grid-cols-3 gap-4 px-4 md:grid md:px-0">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
