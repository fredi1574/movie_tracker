import Trailer from "@/components/MovieTrailer";
import SimilarMovies from "@/components/SimilarMovies";
import { Badge } from "@/components/ui/badge";
import WatchListSeenButtons from "@/components/WatchListSeenButtons";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieTrailer,
  getSimilarMovies,
} from "@/utils/moviePageAPI";
import { CalendarDays, Clock, DollarSign, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Movie({ params }) {
  const param = await params;
  const movie = await getMovieDetails(param.id);
  const trailerKey = await getMovieTrailer(param.id);
  const similarMovies = await getSimilarMovies(param.id);
  const credits = await getMovieCredits(param.id);

  const releaseDate = new Date(movie.release_date).toLocaleDateString("en-IL");

  return (
    <div className="min-h-[98.1vh] bg-black text-white">
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <div className="relative h-[60vh] w-full">
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-shrink-0 md:w-1/4">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="200px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex-grow md:w-3/4">
              <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mb-6 text-xl text-white/75 italic">
                  {movie.tagline}
                </p>
              )}

              <div className="mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                  <span>{releaseDate}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    className="cursor-pointer border-none bg-white/10 px-3 py-1 text-white hover:bg-white/20"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <div className="mb-8">
                <h2 className="mb-3 text-xl font-semibold">Overview</h2>
                <p className="leading-relaxed text-gray-300">
                  {movie.overview}
                </p>
              </div>

              {/* Directors Section */}
              <div className="mb-6">
                <h2 className="mb-3 text-xl font-semibold">Directors</h2>
                <div className="flex flex-wrap gap-3">
                  {credits.crew.map((director) => (
                    <Link key={director.id} href={`/director/${director.id}`}>
                      <div
                        key={director.id}
                        className="flex items-center gap-2 rounded-full bg-white/10 py-1 pr-3 pl-1 transition-colors hover:bg-white/15"
                      >
                        {director.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w92/${director.profile_path}`}
                            alt={director.name}
                            width={30}
                            height={30}
                            className="aspect-square rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs text-gray-400">
                            {director.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-sm font-medium">
                          {director.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Cast Section */}
              <div className="mb-6">
                <h2 className="mb-3 text-xl font-semibold">Top Cast</h2>
                <div className="flex flex-wrap gap-3">
                  {credits.cast.map((actor) => (
                    <Link key={actor.id} href={`/actor/${actor.id}`}>
                      <div
                        key={actor.name}
                        className="flex items-center gap-2 rounded-full bg-white/10 py-1 pr-3 pl-1 transition-colors hover:bg-white/20"
                      >
                        {actor.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w92/${actor.profile_path}`}
                            alt={actor.name}
                            width={30}
                            height={30}
                            className="aspect-square rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs text-gray-400">
                            {actor.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-sm font-medium">
                          {actor.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {movie.budget > 0 && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign className="h-4 w-4" />
                    <span>Budget: ${movie.budget.toLocaleString()}</span>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign className="h-4 w-4" />
                    <span>Revenue: ${movie.revenue.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <WatchListSeenButtons movieId={param.id} />
            </div>
          </div>
        </div>
      </div>
      <SimilarMovies similarMovies={similarMovies} />
      <Trailer trailerKey={trailerKey} movieName={movie.title} />
    </div>
  );
}
