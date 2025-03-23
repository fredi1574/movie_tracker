"use client";
import { Button } from "@/components/ui/button";
import { isMovieSeen, markAsSeen, markAsUnseen } from "@/utils/seenAPI";
import {
  addToWatchlist,
  isMovieInWatchlist,
  removeFromWatchlist,
} from "@/utils/watchlistAPI";
import { BookmarkMinus, BookmarkPlus, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function WatchListSeenButtons({ movieId }) {
  const [seen, setSeen] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        setIsLoading(true);
        const isSeen = await isMovieSeen(movieId);
        setSeen(isSeen);
      } catch (error) {
        console.error("Error fetching seen status:", error);
      } finally {
        setIsLoading(false);
      }

      try {
        setIsLoading(true);
        const isInWatchlist = await isMovieInWatchlist(movieId);
        setInWatchlist(isInWatchlist);
      } catch (error) {
        console.error("Error fetching watchlist status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatuses();
  }, [movieId]);

  const handleToggleWatchlist = async () => {
    setIsLoading(true);

    try {
      if (inWatchlist) {
        await removeFromWatchlist(movieId);
        setInWatchlist(false);
      } else {
        await addToWatchlist(movieId);
        setInWatchlist(true);
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSeen = async () => {
    setIsLoading(true);
    try {
      seen ? await markAsUnseen(movieId) : await markAsSeen(movieId);
      setSeen(!seen);
    } catch (error) {
      console.error("Error toggling seen status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full gap-2">
      <Button
        onClick={handleToggleWatchlist}
        variant={inWatchlist ? "destructive" : "outline"}
        className={`flex-1 cursor-pointer gap-2 border-white/50 ${inWatchlist ? "bg-red-400/50 text-white" : "bg-transparent"}`}
      >
        {inWatchlist ? (
          <>
            <BookmarkMinus className="h-4 w-4" />
            <span>Remove from Watchlist</span>
          </>
        ) : (
          <>
            <BookmarkPlus className="h-4 w-4" />
            <span>Add to Watchlist</span>
          </>
        )}
      </Button>

      <Button
        onClick={handleToggleSeen}
        disabled={isLoading}
        variant={seen ? "destructive" : "outline"}
        className={`flex-1 cursor-pointer gap-2 border-white/50 ${seen ? "bg-green-400/50 text-white" : "bg-transparent"}`}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : seen ? (
          <>
            <EyeOff className="h-4 w-4" />
            <span>Remove Seen</span>
          </>
        ) : (
          <>
            <Eye className="h-4 w-4" />
            <span>Mark Seen</span>
          </>
        )}
      </Button>
    </div>
  );
}
