import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page }) {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {page > 1 ? (
        <Link href={`/popular?page=${Number(page) - 1}`}>
          <Button variant="outline" className="cursor-pointer">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" className="opacity-50" disabled>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}
      <span className="mx-4 text-2xl">{page}</span>
      <Link href={`/popular?page=${Number(page) + 1}`}>
        <Button variant="outline" className="cursor-pointer">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
