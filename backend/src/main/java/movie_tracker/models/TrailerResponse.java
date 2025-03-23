package movie_tracker.models;

import java.util.List;

public class TrailerResponse {
    private List<TrailerResult> results;

    public List<TrailerResult> getResults() {
        return results;
    }

    public void setResults(List<TrailerResult> results) {
        this.results = results;
    }
}
