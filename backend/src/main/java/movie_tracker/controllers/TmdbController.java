package movie_tracker.controllers;

import movie_tracker.Dto.Cast;
import movie_tracker.Dto.MovieDto;
import movie_tracker.services.TmdbService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TmdbController {

    private final TmdbService tmdbService;

    public TmdbController(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping("/popular")
    public List<MovieDto> getPopularMovies() {
        return tmdbService.getPopularMovies();
    }

    @GetMapping("/movie/{movieId}/similar")
    public List<MovieDto> getSimilarMovies(@PathVariable Long movieId) {
        return tmdbService.getSimilarMovies(movieId);
    }

    @GetMapping("/movie/{movieId}/details")
    public MovieDto getMovieDetails(@PathVariable int movieId) {
        return tmdbService.getMovieDetails(movieId);
    }

    @GetMapping("/movie/{movieId}/credits")
    public Cast getMovieCredits(@PathVariable int movieId) {
        return tmdbService.getMovieCast(movieId);
    }

    @GetMapping("/movie/{movieId}/trailer")
    public String getMovieTrailer(@PathVariable Long movieId) {
        return tmdbService.getMovieTrailer(movieId);
    }
}
