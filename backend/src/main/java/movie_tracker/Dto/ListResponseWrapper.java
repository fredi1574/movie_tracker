package movie_tracker.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListResponseWrapper {
    private int page;
    private List<MovieDto> results;
}
