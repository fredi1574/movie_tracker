package movie_tracker.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MovieDto {
    private int id;
    private String title;
    private String poster_path;
    private List<Object> genres;
    private String overview;
    private String release_date;
    private int runtime;
    private int budget;
    private int revenue;
}
