import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const poster = "https://image.tmdb.org/t/p/original/" + movie.poster_path;

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card
        className="group relative aspect-[2/3] w-full bg-cover"
        style={{
          backgroundImage: `url(${poster})`,
        }}
      >
        <div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-between rounded-xl bg-radial from-black/20 to-black/80 to-100% text-white opacity-0 duration-200 group-hover:opacity-100">
          <h2 className="py-8 text-4xl font-semibold">{movie.title}</h2>
          <p className="p-8 text-justify">{movie.overview}</p>
        </div>
      </Card>
    </Link>
  );
}
