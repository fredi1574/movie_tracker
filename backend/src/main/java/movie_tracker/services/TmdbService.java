package movie_tracker.services;

import movie_tracker.Dto.*;
import movie_tracker.models.TrailerResponse;
import movie_tracker.models.TrailerResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
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

    public List<MovieDto> getPopularMovies() {
        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/movie/popular").queryParam("api_key", apiKey).queryParam("page", 1).toUriString();

        ResponseWrapper responseWrapper = restTemplate.getForObject(url, ResponseWrapper.class);
        return responseWrapper.getResults();
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

        ResponseWrapper responseWrapper = restTemplate.getForObject(url, ResponseWrapper.class);
        return responseWrapper.getResults();
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

    public List<MovieDto> searchMovies(String query) {
        String url = UriComponentsBuilder.fromUriString(TMDB_API_URL + "/search").queryParam("api_key", apiKey).queryParam("query", query).toUriString();

        ResponseEntity<MovieDto[]> response = restTemplate.getForEntity(url, MovieDto[].class);
        return Arrays.asList(response.getBody());
    }


}
