package movie_tracker.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MoviesResponseWrapper {
    private List<MovieDto> cast;
    private List<CrewMovieDto> crew;
}
