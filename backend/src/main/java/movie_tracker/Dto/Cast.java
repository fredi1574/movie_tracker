package movie_tracker.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Cast {

    private List<ActorDto> cast;
    private List<DirectorDto> crew;
}
