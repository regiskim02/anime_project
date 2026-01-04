function AnimeCard({ anime }) {
    return (
        <div className="anime-card">
        <img src={anime.images.jpg.image_url} alt={anime.title} />
        <div className="anime-info">
            <p className="anime-title">{anime.title}</p>
            <p className="anime-score">⭐ {anime.score ?? "N/A"}</p>
        </div>
        </div>
    );
}

export default AnimeCard;