package movie_tracker.services;

import movie_tracker.Repositories.WatchListMovieRepository;
import movie_tracker.models.WatchListMovie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WatchListMovieService {

    private final String TMDB_API_URL = "https://api.themoviedb.org/3";

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Autowired
    private WatchListMovieRepository watchListMovieRepository;

    public List<Object> getWatchListMovies() {
        List<WatchListMovie> watchListMovies = watchListMovieRepository.findAll();
        RestTemplate restTemplate = new RestTemplate();

        return watchListMovies.stream().map(watchListMovie -> {
            String url = TMDB_API_URL + "/movie/" + watchListMovie.getMovieId() + "?api_key=" + apiKey;
            ResponseEntity<Object> response = restTemplate.getForEntity(url, Object.class);
            return response.getBody();
        }).collect(Collectors.toList());

    }

    public boolean isMovieInWatchList(Long movieId) {
        return watchListMovieRepository.existsById(movieId);
    }

    public WatchListMovie addMovieToWatchList(Long movieId) {
        Optional<WatchListMovie> existingMovie = watchListMovieRepository.findById(movieId);
        System.out.println(existingMovie);

        if (existingMovie.isPresent()) {
            return existingMovie.get();
        }

        WatchListMovie watchListMovie = new WatchListMovie(movieId);
        return watchListMovieRepository.save(watchListMovie);
    }

    public boolean removeMovieFromWatchList(Long movieId) {
        if (!watchListMovieRepository.existsById(movieId)) {
            return false;
        }
        watchListMovieRepository.deleteById(movieId);
        return true;
    }
}
