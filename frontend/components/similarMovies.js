import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export default function SimilarMovies({ similarMovies }) {
  return (
    <>
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Similar Movies
          </h2>
          <div className="no-scrollbar -mx-4 flex snap-x overflow-x-auto px-4 pb-6">
            {similarMovies.map((similarMovie) => (
              <Link
                href={`/movie/${similarMovie.id}`}
                key={similarMovie.id}
                className="mx-2 w-[200px] flex-shrink-0 snap-end transition-transform hover:scale-105"
              >
                <div className="flex flex-col">
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-white/10 shadow-lg">
                    <Image
                      src={`https://image.tmdb.org/t/p/w342/${similarMovie.poster_path}`}
                      alt={similarMovie.title}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h3 className="mt-2 text-sm font-semibold">
                        {similarMovie.title}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {new Date(similarMovie.release_date).getFullYear() ||
                          "N/A"}
                      </p>
                    </div>
                    <section className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-medium">
                        {similarMovie.vote_average?.toFixed(1)}
                      </span>
                    </section>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
