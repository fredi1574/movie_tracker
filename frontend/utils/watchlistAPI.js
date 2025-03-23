export async function getWatchlist() {
  const response = await fetch("http://localhost:8080/watchlist", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function isMovieInWatchlist(movieId) {
  const response = await fetch(`http://localhost:8080/watchlist/${movieId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function addToWatchlist(movieId) {
  const response = await fetch(`http://localhost:8080/watchlist/${movieId}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function removeFromWatchlist(movieId) {
  const response = await fetch(`http://localhost:8080/watchlist/${movieId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}
