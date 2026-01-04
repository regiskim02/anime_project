import "../css/Mainpage.css"
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getPopularAnime } from "../services/jikanApi";
import AnimeCard from "../components/AnimeCard";


function Mainpage() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAnime() {
            try {
                const data = await getPopularAnime();
                setAnimeList(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        loadAnime();
    }, []);
    return(
        <>
        <Header />
        <main>
            <p className="title">Most Popular Anime</p>

            {loading ? (
            <p>Loading...</p>
            ) : (
            <div className="anime">
                {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
            </div>
            )}
        </main>
    </>
    )
}

export default Mainpage;