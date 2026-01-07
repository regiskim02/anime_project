import styled from "styled-components";
import { BiSolidStar } from "react-icons/bi";



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
    bottom: 85px;

`

function AnimeCard({ anime }) {
    return (
        <div className="anime-card">
        <img src={anime.images.jpg.image_url} alt={anime.title} />
        <AnimeScore><BiSolidStar /> {anime.score ?? "N/A"}</AnimeScore>
        <div className="anime-info">
            <h3 className="anime-title">{anime.title}</h3>
        </div>
        </div>
    );
}

export default AnimeCard;