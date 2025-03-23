import CardsGrid from "@/components/CardsGrid";
import { getWatchlist } from "@/utils/watchlistAPI";

export default async function watchlistPage() {
  const watchlist = await getWatchlist();

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-center text-3xl font-bold">Watchlist</h1>
      <CardsGrid movies={watchlist} />
    </div>
  );
}
