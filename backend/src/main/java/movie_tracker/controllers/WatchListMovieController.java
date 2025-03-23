package movie_tracker.controllers;

import movie_tracker.models.WatchListMovie;
import movie_tracker.services.WatchListMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/watchlist")
public class WatchListMovieController {

    @Autowired
    private WatchListMovieService watchListMovieService;

    @GetMapping
    public List<Object> getWatchListMovies() {
        return watchListMovieService.getWatchListMovies();
    }

    @GetMapping("/{movieId}")
    public boolean isMovieInWatchList(@PathVariable Long movieId) {
        return watchListMovieService.isMovieInWatchList(movieId);
    }

    @PostMapping("/{movieId}")
    public WatchListMovie addMovieToWatchList(@PathVariable Long movieId) {
        return watchListMovieService.addMovieToWatchList(movieId);
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<Boolean> removeMovieFromWatchList(@PathVariable Long movieId) {
        boolean removed = watchListMovieService.removeMovieFromWatchList(movieId);

        return removed ? ResponseEntity.ok(true) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
    }
}
