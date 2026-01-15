import "../css/Mainpage.css"
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getPopularAnime } from "../services/jikanApi";
import AnimeCard from "../components/AnimeCard";
import AnimeModal from "../components/AnimeModal";


function Mainpage() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedAnime, SetSelecteAnime] = useState(null);
    const [isModalOpen, SetIsModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    async function resetPage() {
        setLoading(true);
        setIsSearching(false);
        setSearchQuery("");

        try {
            const data = await getPopularAnime();
            setAnimeList(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(query) {
        setLoading(true);
        setIsSearching(true);
        setSearchQuery(query);

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`);
            const result = await response.json();
            setAnimeList(result.data);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

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

    function handleAnimeClick(anime) {
        SetSelecteAnime(anime);
        SetIsModalOpen(true);
    };

    function closeModal() {
        SetIsModalOpen(false);
        SetSelecteAnime(null);
    };

    return(
    <>
        <Header onSearch={handleSearch} onReset={resetPage}/>
        <main>
            <p className="title">{isSearching ? `Searched: ${searchQuery}` : "Most Popular Anime"}</p>

            {loading ? (
            <p>Loading...</p>
            ) : (
            <div className="anime">
                {animeList.map((anime) => (
                    <AnimeCard 
                    key={anime.mal_id} 
                    anime={anime}
                    onClick={() => handleAnimeClick(anime)} />
                ))}
            </div>
            )}
        </main>

        <AnimeModal
            isOpen={isModalOpen}
            anime={selectedAnime}
            onClose={closeModal}
        />
    </>
    )
}

export default Mainpage;