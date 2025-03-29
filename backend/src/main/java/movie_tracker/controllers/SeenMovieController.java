package movie_tracker.controllers;

import movie_tracker.Dto.GenreCountDto;
import movie_tracker.models.SeenMovie;
import movie_tracker.services.SeenMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/count")
    public long getSeenMoviesCount() {
        return seenMovieService.getSeenMovies().size();
    }

    @GetMapping("/genre-count")
    public List<GenreCountDto> countMoviesByGenre() {
        return seenMovieService.countMoviesByGenre();
    }

    @GetMapping("/most-watched-genre")
    public ResponseEntity<List<GenreCountDto>> getMostSeenGenre() {
        List<GenreCountDto> genreCounts = seenMovieService.countMoviesByGenre();

        if (genreCounts.isEmpty()) {
            return ResponseEntity.ok(Collections.singletonList(new GenreCountDto(0, "N/A", 0)));
        }

        int maxCount = genreCounts.stream().mapToInt(GenreCountDto::getCount).max().orElse(0);
        List<GenreCountDto> mostSeenGenre = genreCounts.stream().filter(genre -> genre.getCount() == maxCount).collect(Collectors.toList());
        return ResponseEntity.ok(mostSeenGenre);
    }
}
