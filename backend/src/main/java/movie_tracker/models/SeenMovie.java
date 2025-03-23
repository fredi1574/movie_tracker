package movie_tracker.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "seen_movies")
public class SeenMovie {

    @Id
    private Long movieId;
    private LocalDate seenDate;

    public SeenMovie(Long movieId, LocalDate seenDate) {
        this.movieId = movieId;
        this.seenDate = seenDate;
    }
}
