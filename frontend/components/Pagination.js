import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Pagination({ page, basePath, hasNextPage }) {
  const currentPage = Number(page) || 1;

  const getPageLink = (targetPage) => {
    const separator = basePath.includes("?") ? "&" : "?";
    return `${basePath}${separator}page=${targetPage}`;
  };

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {currentPage > 1 ? (
        <Link href={getPageLink(currentPage - 1)}>
          <Button variant="outline" className="cursor-pointer">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" className="opacity-50" disabled>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      <span className="mx-4 text-2xl">{currentPage}</span>

      {hasNextPage ? (
        <Link href={getPageLink(currentPage + 1)}>
          <Button variant="outline" className="cursor-pointer">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" className="opacity-50" disabled>
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
