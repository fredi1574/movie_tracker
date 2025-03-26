import CardsGrid from "@/components/CardsGrid";

export const metadata = {
  title: "movie_tracker",
  description: "movie_tracker",
};

export default async function Home() {
  return (
    <div className="container mx-auto p-4">
      <CardsGrid movies={[]} />
    </div>
  );
}
