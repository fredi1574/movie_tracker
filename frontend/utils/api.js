export async function getPopularMovies(page) {
  const response = await fetch(`http://localhost:8080/popular?page=${page}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function getMovieDetails(id) {
  const response = await fetch(`http://localhost:8080/api/movie/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function getMovieCredits(movieId) {
  const response = await fetch(
    `http://localhost:8080/movie/${movieId}/credits`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getMovieTrailer(movieId) {
  const response = await fetch(
    `http://localhost:8080/movie/${movieId}/trailer`,
  );

  if (!response.ok) {
    console.error(`HTTP error! Status: ${response.status}`);
    return null;
  }

  const trailerKey = await response.text();
  return trailerKey ? trailerKey.trim() : null;
}

export async function getSimilarMovies(movieId) {
  const response = await fetch(
    `http://localhost:8080/movie/${movieId}/similar`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
