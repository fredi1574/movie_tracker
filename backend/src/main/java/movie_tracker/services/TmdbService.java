package movie_tracker.services;

import movie_tracker.Dto.*;
import movie_tracker.models.TrailerResponse;
import movie_tracker.models.TrailerResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TmdbService {

    private final String TMDB_API_URL = "https://api.themoviedb.org/3";
    private final RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    public TmdbService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MovieDto> getPopularMovies(int page) {
        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/movie/popular").queryParam("api_key", apiKey).queryParam("page", page).toUriString();

        ListResponseWrapper listResponseWrapper = restTemplate.getForObject(url, ListResponseWrapper.class);
        return listResponseWrapper.getResults();
    }

    public MovieDto getMovieDetails(int movieId) {
        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/movie/" + movieId).queryParam("api_key", apiKey).toUriString();

        return restTemplate.getForObject(url, MovieDto.class);
    }

    public Cast getMovieCast(int movieId) {
        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/movie/" + movieId + "/credits")
                .queryParam("api_key", apiKey)
                .toUriString();

        Cast cast = restTemplate.getForObject(url, Cast.class);

        List<ActorDto> topActors = cast.getCast()
                .stream()
                .limit(5)
                .collect(Collectors.toList());

        List<DirectorDto> directors = cast.getCrew()
                .stream()
                .filter(crew -> "Director".equals(crew.getJob()))
                .collect(Collectors.toList());

        cast.setCast(topActors);
        cast.setCrew(directors);

        return cast;
    }

    public List<MovieDto> getSimilarMovies(Long movieId) {
        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/movie/" + movieId + "/similar").queryParam("api_key", apiKey).queryParam("page", 1).toUriString();

        ListResponseWrapper listResponseWrapper = restTemplate.getForObject(url, ListResponseWrapper.class);
        return listResponseWrapper.getResults();
    }

    public String getMovieTrailer(Long movieId) {
        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/movie/" + movieId + "/videos").queryParam("api_key", apiKey).queryParam("language", "en-US").toUriString();

        ResponseEntity<TrailerResponse> response = restTemplate.getForEntity(url, TrailerResponse.class);
        TrailerResponse trailerResponse = response.getBody();

        if (trailerResponse != null && trailerResponse.getResults() != null) {
            for (TrailerResult video : trailerResponse.getResults()) {
                if ("Trailer".equalsIgnoreCase(video.getType()) && "YouTube".equalsIgnoreCase(video.getSite())) {
                    return video.getKey();
                }
            }
        }
        return null;
    }

    public List<MovieDto> getMoviesByDirector(Long directorId) {
        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/person/" + directorId + "/movie_credits").queryParam("api_key", apiKey).toUriString();

        MoviesResponseWrapper moviesResponseWrapper = restTemplate.getForObject(url, MoviesResponseWrapper.class);
        return moviesResponseWrapper.getCrew().stream().filter(movie -> "Director".equals(movie.getJob())).map(movie -> MovieDto.builder().id(movie.getId()).title(movie.getTitle()).overview(movie.getOverview()).poster_path(movie.getPoster_path()).build()).collect(Collectors.toList());
    }

    public List<MovieDto> getMoviesByActor(Long actorId) {
        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/person/" + actorId + "/movie_credits").queryParam("api_key", apiKey).toUriString();

        MoviesResponseWrapper moviesResponseWrapper = restTemplate.getForObject(url, MoviesResponseWrapper.class);
        return moviesResponseWrapper.getCast().stream().map(movie -> MovieDto.builder().id(movie.getId()).title(movie.getTitle()).overview(movie.getOverview()).poster_path(movie.getPoster_path()).build()).collect(Collectors.toList());
    }

    public List<MovieDto> searchMovies(String query, int page) { // Added page parameter
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList(); // Return empty if query is blank
        }

        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/search/movie")
                .queryParam("api_key", apiKey)
                .queryParam("query", query)
                .queryParam("page", page) // Add page
                .queryParam("include_adult", "false") // Optional: Exclude adult content
                .toUriString();

        ListResponseWrapper listResponseWrapper = restTemplate.getForObject(url, ListResponseWrapper.class);

        // Filter out results without poster paths for better display
        if (listResponseWrapper != null && listResponseWrapper.getResults() != null) {
            return listResponseWrapper.getResults().stream()
                    .filter(movie -> movie.getPoster_path() != null && !movie.getPoster_path().isEmpty())
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

    public List<MovieDto> searchMovies(String query) {
        return searchMovies(query, 1);
    }
}
