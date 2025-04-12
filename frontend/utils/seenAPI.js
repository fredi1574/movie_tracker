export async function getSeenMovies() {
  const response = await fetch("http://localhost:8080/seen");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function isMovieSeen(movieId) {
  const response = await fetch(`http://localhost:8080/seen/${movieId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export async function markAsSeen(movieId) {
  const response = await fetch(`http://localhost:8080/seen/${movieId}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  } else {
    console.log("Movie marked as seen!");
  }
}

export async function markAsUnseen(movieId) {
  const response = await fetch(`http://localhost:8080/seen/${movieId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  } else {
    console.log("Movie marked as unseen!");
  }
}

export async function getSeenMoviesCount() {
  const response = await fetch("http://localhost:8080/seen/count");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function countMoviesByGenre() {
  const response = await fetch("http://localhost:8080/seen/genre-count");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  const formattedData = data.map((genre) => ({
    id: genre.id,
    genre: genre.name,
    moviesWatched: genre.count,
    fill: `var(--chart-${Math.floor(Math.random() * 20) + 1})`,
  }));

  return formattedData;
}

export async function getMostWatchedGenre() {
  try {
    const response = await fetch(
      "http://localhost:8080/seen/most-watched-genre",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch most watched genre");
    }

    const data = await response.json();

    // Handle empty or invalid data gracefully
    if (!Array.isArray(data) || data.length === 0) {
      return "No data available.";
    }

    return data.map((genre) => genre.name).join(", ");
  } catch (error) {
    console.error("Error fetching most watched genre:", error);
    return "Error loading data.";
  }
}
