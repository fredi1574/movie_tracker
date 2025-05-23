package movie_tracker.controllers;

import movie_tracker.services.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/popular")
    public String getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/movie/{movieId}")
    public String getMovieDetails(@PathVariable int movieId) {
        return movieService.getMovieDetails(movieId);
    }

}