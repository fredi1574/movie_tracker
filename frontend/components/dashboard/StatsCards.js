import { Card, CardContent } from "@/components/ui/card";
import { getMostWatchedGenre, getSeenMoviesCount } from "@/utils/seenAPI";
import { getWatchlistCount } from "@/utils/watchlistAPI";
import { Clock, Film, Heart, Star } from "lucide-react";

export default async function StatsCards() {
  const favoriteGenre = await getMostWatchedGenre();
  const watchlistCount = await getWatchlistCount();
  const averageRating = 7.6;
  const movieCount = await getSeenMoviesCount();

  return (
    <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-white/10 bg-gradient-to-br from-blue-900/40 to-blue-800/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Watched</p>
              <h3 className="mt-1 text-3xl font-bold">{movieCount}</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
              <Film className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            {movieCount > 0
              ? `That's ${Math.round(movieCount * 2.1)} hours of movies!`
              : "Start watching to track your progress"}
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-gradient-to-br from-purple-900/40 to-purple-800/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In Watchlist</p>
              <h3 className="mt-1 text-3xl font-bold">{watchlistCount}</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            {watchlistCount > 0
              ? `${watchlistCount} movies waiting to be watched`
              : "Add movies to your watchlist"}
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-gradient-to-br from-red-900/40 to-red-800/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Favorite Genres
              </p>
              <h3 className="mt-1 text-2xl font-bold">{favoriteGenre}</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
              <Heart className="h-5 w-5 text-red-400" />
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Based on your most watched genre
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-gradient-to-br from-amber-900/40 to-amber-800/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Average Rating
              </p>
              <h3 className="mt-1 text-3xl font-bold">
                {averageRating.toFixed(1)}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20">
              <Star className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            From your personal movie ratings
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
