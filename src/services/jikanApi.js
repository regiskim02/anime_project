export async function getPopularAnime() {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=12");
    const data = await response.json();
    return data.data || [];
}