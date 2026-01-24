export async function updateAnimeStatus({ malId, type, value }) {
    const response = await fetch("http://localhost:8080/api/anime/status", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            malId,
            type,
            value   
        })
    });

    if (!response.ok) {
        throw new Error("Failed to update anime status");
    }

    return response.json();
}

export async function getUserAnimeStatus() {
    const response = await fetch("http://localhost:8080/api/anime/status", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to load user anime status");
    }

    return response.json();
}