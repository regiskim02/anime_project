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
    border-radius: 99px;
    background-color: white;
    position: absolute;
    opacity: 0.9;
    top: 6px;
    right: 6px;
    font-size: 24px;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;

    &:hover {
        transform: scale(1.1) rotate(8deg);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
        opacity: 1;
    }


`

function AnimeCard({ anime }) {
    const infoItems = [anime.type,
        anime.episodes ? `${anime.episodes} eps` : null,
        anime.year,].filter(Boolean);
    return (
        <div className="anime-card">
        <FavoriteButton><CiHeart /></FavoriteButton>
        <img src={anime.images.jpg.image_url} alt={anime.title} />
        <div className="anime-info">
            <AnimeScore><BiSolidStar /> {anime.score ?? "N/A"}</AnimeScore>
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