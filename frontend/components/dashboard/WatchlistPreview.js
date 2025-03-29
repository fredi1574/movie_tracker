import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getWatchlist } from "@/utils/watchlistAPI";
import WatchListSeenButtons from "../WatchListSeenButtons";

export default async function WatchlistPreview() {
  const movies = await getWatchlist();

  if (!movies || movies.length === 0) {
    return (
      <Card className="border-white/10 bg-white/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Your Watchlist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-6 text-center">
            <p className="mb-4 text-sm text-gray-400">
              Your watchlist is empty
            </p>
            <Button asChild size="sm">
              <Link href="/popular">Discover Movies</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-4 border-white/10 bg-gradient-to-br from-orange-900/40 to-orange-800/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Your Watchlist</CardTitle>
        <Clock className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent className="space-y-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex items-center justify-between gap-2"
          >
            <Link
              href={`/movie/${movie.id}`}
              className="flex w-full items-center gap-3 rounded-md p-2 transition-colors hover:bg-white/30"
            >
              <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded">
                <Image
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate-2 text-sm font-medium">
                  {movie.title}
                </h3>
                <p className="text-xs text-gray-400">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
            <div className="">
              <WatchListSeenButtons movieId={movie.id} />
            </div>
          </div>
        ))}

        <Link
          href="/watchlist"
          className="text-primary block pt-2 text-center text-sm hover:underline"
        >
          View Full Watchlist
        </Link>
      </CardContent>
    </Card>
  );
}
