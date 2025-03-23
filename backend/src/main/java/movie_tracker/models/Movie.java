package movie_tracker.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    private Long id;
    private String title;

    public Movie() {
    }

    public Movie(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
