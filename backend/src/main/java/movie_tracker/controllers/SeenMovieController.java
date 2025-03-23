package movie_tracker.controllers;

import movie_tracker.models.SeenMovie;
import movie_tracker.services.SeenMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seen")
public class SeenMovieController {

    @Autowired
    private SeenMovieService seenMovieService;

    @GetMapping
    public List<Object> getSeenMovies() {
        return seenMovieService.getSeenMovies();
    }

    @GetMapping("/{movieId}")
    public boolean isMovieSeen(@PathVariable Long movieId) {
        return seenMovieService.isMovieSeen(movieId);
    }

    @PostMapping("/{movieId}")
    public SeenMovie markAsSeen(@PathVariable Long movieId) {
        return seenMovieService.markMovieAsSeen(movieId);
    }

    @DeleteMapping("/{movieId}")
    public void removeSeenMovie(@PathVariable Long movieId) {
        seenMovieService.removeSeenMovie(movieId);
    }
}
