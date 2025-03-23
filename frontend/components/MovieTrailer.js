export default function Trailer({ trailerKey, movieName }) {
  return (
    <>
      {trailerKey && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="mb-6 text-center text-2xl font-bold">Trailer</h2>
          <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movieName} trailer`}
              allowFullScreen
              className="mx-auto h-[40rem] w-1/2"
            />
          </div>
        </div>
      )}
    </>
  );
}
