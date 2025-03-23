import CardsGrid from "@/components/CardsGrid";

export default async function Home() {
  return (
    <div className="container mx-auto p-4">
      <CardsGrid movies={[]} />
    </div>
  );
}
