import CardsGrid from "@/components/CardsGrid";
import { getSeenMovies } from "@/utils/seenAPI";

export const metadata = {
  title: "Seen Movies",
  description: "A list of movies you have seen",
};

export default async function seenPage() {
  const seenMovies = await getSeenMovies();

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-center text-3xl font-bold">Seen Movies</h1>
      <CardsGrid movies={seenMovies} />
    </div>
  );
}
