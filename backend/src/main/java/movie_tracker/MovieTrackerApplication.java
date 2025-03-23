package movie_tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("movie_tracker.models")
public class MovieTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(MovieTrackerApplication.class, args);
    }
}
