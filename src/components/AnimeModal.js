import "../css/AnimeModal.css";
import { CiHeart } from "react-icons/ci";
import { BiSolidStar } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { GoClock } from "react-icons/go";

function AnimeModal({ isOpen, onClose, anime, isFavorite, onToggleFavorite }) {

    if (!isOpen || !anime) return null;

function capitalize(str) {
    if(!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const InfoItems = [
    { label: "Type", value: anime.type },
    { label: "Episodes", value: anime.episodes },
    { label: "Status", value: anime.status },
    { label: "Aired", value: anime.aired?.string },
    {
        label: "Season",
        value:
        anime.season && anime.year
            ? `${capitalize(anime.season)} ${anime.year}`
            : null
    }
].filter(item => item.value);


    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>✕</button>

            <div className="modal-body">
            {/* LEFT */}
            <div className="modal-left">
                <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                />

                <div className="modal-actions">
                    <button
                        className={`fav-button ${isFavorite ? "active" : ""}`}
                        onClick={onToggleFavorite}
                    >
                        <CiHeart className="icon" />
                        {isFavorite ? "Favorited" : "Add to Favorites"}
                    </button>
                    <button><MdOutlineRemoveRedEye className="icon"/> Watching</button>
                    <button><IoCheckmark className="icon"/> Completed</button>
                    <button><GoClock className="icon"/> Plan to Watch</button>
                </div>
            </div>

            {/* RIGHT */}
            <div className="modal-right">
                <h2>{anime.title}</h2>
                <p className="english-title">{anime.title_english}</p>

                <p className="score"><BiSolidStar className="score-star"/>{anime.score ?? "N/A"}</p>
                <div className="info">
                    {InfoItems.map(({ label, value }, index) => (
                        <p key={index}>
                            <strong>{label}:</strong> {value}
                        </p>
                    ))}
                </div>
                <div className="genres">
                {anime.genres?.map(g => (
                    <span key={g.mal_id}>{g.name}</span>
                ))}
                </div>

                <h4>Synopsis</h4>
                <p className="synopsis">{anime.synopsis}</p>
                <div>
                    <p><strong>Studio:</strong> {anime.studios?.[0]?.name ?? "N/A"}</p>
                    <p><strong>Rating:</strong> {anime.rating}</p>
                    <p><strong>Rank:</strong> {anime.rank}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default AnimeModal;
