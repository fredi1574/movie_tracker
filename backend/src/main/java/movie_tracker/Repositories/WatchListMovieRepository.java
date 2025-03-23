package movie_tracker.Repositories;

import movie_tracker.models.WatchListMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchListMovieRepository extends JpaRepository<WatchListMovie, Long> {
    List<WatchListMovie> findByMovieId(Long movieId);
}
