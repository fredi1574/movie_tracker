package movie_tracker.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrewMovieDto {
    private int id;
    private String title;
    private String job;
    private String overview;
    private String poster_path;
}
