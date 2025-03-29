import ExampleChart from "@/components/dashboard/ExampleChart";
import GenresChart from "@/components/dashboard/GenresChart";
import StatsCards from "@/components/dashboard/StatsCards";
import WatchlistPreview from "@/components/dashboard/WatchlistPreview";

export const metadata = {
  title: "Movie Tracker",
  description: "A movie tracker app to keep track of movies you have seen",
};

export default async function Home() {
  const user = "John Doe";

  return (
    <div className="container mx-auto my-4 gap-4 px-2">
      <h1 className="mb-2 text-3xl font-bold">Welcome back, {user}</h1>
      <p className="text-gray-400">
        Discover new movies and see your watching stats.
      </p>

      <StatsCards />

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="sm:w-full">
          <GenresChart />
        </div>
        <div className="sm:w-full">
          <ExampleChart />
        </div>
      </div>
      <WatchlistPreview />
    </div>
  );
}
