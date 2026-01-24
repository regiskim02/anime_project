import "../css/Mainpage.css"
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getPopularAnime } from "../services/jikanApi";
import AnimeCard from "../components/AnimeCard";
import AnimeModal from "../components/AnimeModal";
import LoginModal from "../components/LoginModal";
import { logout } from "../services/authService";
import { updateAnimeStatus, getUserAnimeStatus } from "../services/animeApi";



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

    async function toggleFavorite(anime) {
        if(!isAuthenticated) {
            setIsLoginOpen(true);
            return;
        }

        const newValue = favorites[anime.mal_id] ? "N" : "Y";

        await updateAnimeStatus({
            malId: anime.mal_id,
            type: "FAVORITE",
            value: newValue
        })

            setFavorites(prev => ({
                ...prev,
                [anime.mal_id]: !prev[anime.mal_id],
            }));
    }

    async function toggleButton(anime) {
        if(!isAuthenticated) {
            setIsLoginOpen(true);
            return;
        }

        const newValue = isPressed[anime.mal_id] ? "N" : "Y";

        await updateAnimeStatus({
            malId: anime.mal_id,
            type: "WATCH",
            value: newValue
        })

        setIsPressed(prev => ({
            ...prev,
            [anime.mal_id]: !prev[anime.mal_id],
        }));
    }

    async function toggleCompleted(anime) {
        if(!isAuthenticated) {
            setIsLoginOpen(true);
            return;
        }

        const newValue = isCompleted[anime.mal_id] ? "N" : "Y";

        await updateAnimeStatus({
            malId: anime.mal_id,
            type: "COMPLETED",
            value: newValue
        });


        setIsCompleted(prev => ({
            ...prev,
            [anime.mal_id]: !prev[anime.mal_id],
        }));
    }

    async function toggleIsPlanToWatch(anime) {
        if(!isAuthenticated) {
            setIsLoginOpen(true);
            return;
        }

        const newValue = isPlanToWatch[anime.mal_id] ? "N" : "Y";

        await updateAnimeStatus({
            malId: anime.mal_id,
            type: "PLAN_TO_WATCH",
            value: newValue
        });

        setIsPlanToWatch(prev => ({
            ...prev,
            [anime.mal_id]: !prev[anime.mal_id],
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

    function resetUserState() {
        setFavorites({});
        setIsPressed({});
        setIsCompleted({});
        setIsPlanToWatch({});
    }

    async function loadUserStatus() {
    const data = await getUserAnimeStatus();

    const fav = {};
    const watch = {};
    const completed = {};
    const plan = {};

    data.forEach(item => {
        if (item.favyn === "Y") fav[item.malId] = true;
        if (item.watchyn === "Y") watch[item.malId] = true;
        if (item.completedyn === "Y") completed[item.malId] = true;
        if (item.planToWatchyn === "Y") plan[item.malId] = true;
    });

    setFavorites(fav);
    setIsPressed(watch);
    setIsCompleted(completed);
    setIsPlanToWatch(plan);
    console.log("USER STATUS:", data);
}


    return(
    <>
        <Header onSearch={handleSearch}
        onReset={resetPage}
        isAuthenticated= {isAuthenticated}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={() => {
            logout();
            setIsAuthenticated(false);
            resetUserState();
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
                        onToggleFavorite={() => toggleFavorite(anime)}
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
                selectedAnime && toggleButton(selectedAnime)
            }
            isFavorite={!!favorites[selectedAnime?.mal_id]}
            onToggleFavorite={() =>
                selectedAnime && toggleFavorite(selectedAnime)
            }
            isCompleted={!!isCompleted[selectedAnime?.mal_id]}
            onToggleCompleted={() => 
                selectedAnime && toggleCompleted(selectedAnime)
            }
            isPlanToWatch={!!isPlanToWatch[selectedAnime?.mal_id]}
            onTogglePlanToWatch={() => 
                selectedAnime && toggleIsPlanToWatch(selectedAnime)
            }
        />

        <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onLoginSuccess={async() => {
                setIsAuthenticated(true);
                await loadUserStatus();
                setIsLoginOpen(false);
            }}
        />


    </>
    )
}

export default Mainpage;