import styled from "styled-components";
import { BiSolidStar } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";



const AnimeScore = styled.div`
    width: max-content;
    height: 32px;
    background-color: #f0b100;
    box-sizing: border-box;
    color: white;
    padding-block: 4px;
    padding-inline: 8px;
    border-radius: 10px;
    gap: 4px;
    display: flex;
    white-space: nowrap;
    font-size: 16px;
    line-height: 1.5;
    align-items: center;
    position: absolute;
    left: 6px;
    bottom: 100%;
    margin-bottom: 12px;

`
const FavoriteButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background-color: ${({ $active }) => ($active ? "#e63946" : "white")};
    color: ${({ $active }) => ($active ? "white" : "black")};

    position: absolute;
    opacity: 0.9;
    top: 6px;
    right: 6px;
    font-size: 24px;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    transition:
        background-color 0.3s ease,
        color 0.3s ease,
        transform 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
        opacity: 1;
    }

    &:active {
        transform: scale(0.95);
    }


`

function AnimeCard({ anime, onClick, isFavorite, onToggleFavorite }) {


    const infoItems = [
        anime.type,
        anime.episodes ? `${anime.episodes} eps` : null,
        anime.year,
    ].filter(Boolean);

    return (
        <div className="anime-card" onClick={onClick}>
            <FavoriteButton
                $active={isFavorite}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                }}
            >
                <CiHeart />
            </FavoriteButton>


            <img src={anime.images.jpg.large_image_url} alt={anime.title} />

            <div className="anime-info">
                <AnimeScore>
                    <BiSolidStar /> {anime.score ?? "N/A"}
                </AnimeScore>

                <h3 className="anime-title">{anime.title}</h3>

                <div className="anime-info-plus">
                    {infoItems.map((item, index) => (
                        <span key={index}>
                            {item}
                            {index < infoItems.length - 1 && " • "}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default AnimeCard;