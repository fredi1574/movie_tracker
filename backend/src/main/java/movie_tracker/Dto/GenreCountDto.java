package movie_tracker.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class GenreCountDto {

    private int id;
    private String name;
    private int count;

    public void incrementCount() {
        this.count++;
    }
}
