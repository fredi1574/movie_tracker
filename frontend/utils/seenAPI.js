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
