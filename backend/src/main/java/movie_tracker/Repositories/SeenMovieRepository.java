package movie_tracker.Repositories;

import movie_tracker.models.SeenMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeenMovieRepository extends JpaRepository<SeenMovie, Long> {
    List<SeenMovie> findByMovieId(Long movieId);
}
