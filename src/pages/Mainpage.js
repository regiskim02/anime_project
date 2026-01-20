import "../css/Mainpage.css"
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getPopularAnime } from "../services/jikanApi";
import AnimeCard from "../components/AnimeCard";
import AnimeModal from "../components/AnimeModal";
import LoginModal from "../components/LoginModal";
import { logout } from "../services/authService";


function Mainpage() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedAnime, SetSelecteAnime] = useState(null);
    const [isModalOpen, SetIsModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [favorites, setFavorites] = useState({});
    const [isPressed, setIsPressed] = useState({});
    const [isCompleted, setIsCompleted] = useState({});
    const [isPlanToWatch, setIsPlanToWatch] = useState({});

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    function toggleFavorite(animeId) {
        if(!isAuthenticated) {
            setIsLoginOpen(true);
            return;
        }
            setFavorites(prev => ({
                ...prev,
                [animeId]: !prev[animeId],
            }));
    }

    function toggleButton(animeId) {
        if(!isAuthenticated) {
            setIsLoginOpen(true);
            return;
        }
        setIsPressed(prev => ({
            ...prev,
            [animeId]: !prev[animeId],
        }));
    }

    function toggleCompleted(animeId) {
        if(!isAuthenticated) {
            setIsLoginOpen(true);
            return;
        }
        setIsCompleted(prev => ({
            ...prev,
            [animeId]: !prev[animeId],
        }));
    }

    function toggleIsPlanToWatch(animeId) {
        if(!isAuthenticated) {
            setIsLoginOpen(true);
            return;
        }
        setIsPlanToWatch(prev => ({
            ...prev,
            [animeId]: !prev[animeId],
        }));
    }

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
        <Header onSearch={handleSearch}
        onReset={resetPage}
        isAuthenticated= {isAuthenticated}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={() => {
            logout();
            setIsAuthenticated(false);
        }}/>
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
                        isFavorite={!!favorites[anime.mal_id]}
                        onToggleFavorite={() => toggleFavorite(anime.mal_id)}
                        onClick={() => handleAnimeClick(anime)}
                    />
                ))}
            </div>
            )}
        </main>

        <AnimeModal
            isOpen={isModalOpen}
            anime={selectedAnime}
            onClose={closeModal}
            isButtonPressed={!!isPressed[selectedAnime?.mal_id]}
            onToggleButton={() => 
                selectedAnime && toggleButton(selectedAnime.mal_id)
            }
            isFavorite={!!favorites[selectedAnime?.mal_id]}
            onToggleFavorite={() =>
                selectedAnime && toggleFavorite(selectedAnime.mal_id)
            }
            isCompleted={!!isCompleted[selectedAnime?.mal_id]}
            onToggleCompleted={() => 
                selectedAnime && toggleCompleted(selectedAnime.mal_id)
            }
            isPlanToWatch={!!isPlanToWatch[selectedAnime?.mal_id]}
            onTogglePlanToWatch={() => 
                selectedAnime && toggleIsPlanToWatch(selectedAnime.mal_id)
            }
        />

        <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onLoginSuccess={() => {
                setIsAuthenticated(true);
                setIsLoginOpen(false);
            }}
        />


    </>
    )
}

export default Mainpage;