package movie_tracker.services;

import movie_tracker.Dto.GenreCountDto;
import movie_tracker.Dto.GenreDto;
import movie_tracker.Dto.MovieDto;
import movie_tracker.Repositories.SeenMovieRepository;
import movie_tracker.models.SeenMovie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SeenMovieService {

    private final String TMDB_API_URL = "https://api.themoviedb.org/3";
    private final TmdbService tmdbService;
    @Value("${tmdb.api.key}")
    private String apiKey;
    @Autowired
    private SeenMovieRepository seenMovieRepository;

    public SeenMovieService(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    public List<Object> getSeenMovies() {
        List<SeenMovie> seenMovies = seenMovieRepository.findAll();
        RestTemplate restTemplate = new RestTemplate();

        return seenMovies.stream().map(seenMovie -> {
            String url = TMDB_API_URL + "/movie/" + seenMovie.getMovieId() + "?api_key=" + apiKey;
            ResponseEntity<Object> response = restTemplate.getForEntity(url, Object.class);
            return response.getBody();
        }).collect(Collectors.toList());
    }

    public boolean isMovieSeen(Long movieId) {
        return seenMovieRepository.existsById(movieId);
    }

    public SeenMovie markMovieAsSeen(Long movieId) {
        SeenMovie seenMovie = new SeenMovie(movieId, LocalDate.now());
        return seenMovieRepository.save(seenMovie);
    }

    public void removeSeenMovie(Long movieId) {
        seenMovieRepository.deleteById(movieId);
    }

    public List<GenreCountDto> countMoviesByGenre() {
        List<SeenMovie> seenMovies = seenMovieRepository.findAll();
        Map<Integer, GenreCountDto> genreCounts = new HashMap<>();
        Set<Long> moviesIds = new HashSet<>();

        for (SeenMovie seenMovie : seenMovies) {
            if (!moviesIds.contains(seenMovie.getMovieId())) {
                moviesIds.add(seenMovie.getMovieId());

                MovieDto movieDetails = tmdbService.getMovieDetails(seenMovie.getMovieId().intValue());

                for (GenreDto genre : movieDetails.getGenres()) {
                    genreCounts.putIfAbsent(genre.getId(), new GenreCountDto(genre.getId(), genre.getName(), 0));
                    genreCounts.get(genre.getId()).incrementCount();
                }
            }
        }
        return new ArrayList<>(genreCounts.values());
    }

}
