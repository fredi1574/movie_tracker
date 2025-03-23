package movie_tracker.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseWrapper {

    private int page;
    private List<MovieDto> results;


}
