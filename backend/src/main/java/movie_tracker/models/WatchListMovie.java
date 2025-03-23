package movie_tracker.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "watch_list_movies")
public class WatchListMovie {

    @Id
    private Long movieId;
    
    public WatchListMovie() {
    }

    public WatchListMovie(Long movieId) {
        this.movieId = movieId;
    }

}
