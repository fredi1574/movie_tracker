package movie_tracker.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String TMDB_URL = "https://api.themoviedb.org/3";

    public String getPopularMovies() {
        String url = TMDB_URL + "/movie/popular?api_key=" + apiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    public String getMovieDetails(int movieId) {
        String url = TMDB_URL + "/movie/" + movieId + "?api_key=" + apiKey +
                "&append_to_response=credits";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

}
