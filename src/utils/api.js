const API_BASE_URL = "https://api-kura.animez.my.id/api";

/**
 * Fetch data from the given endpoint
 * @param {string} endpoint - API endpoint (e.g., "home" or "ongoing")
 * @param {Object} options - Optional parameters
 * @param {number} [options.page] - Page number for pagination
 * @param {number} [options.limit] - Number of items per page
 * @returns {Promise<object>} - Fetched JSON data
 */
export async function fetchData(endpoint, options = {}) {
  try {
    let url = `${API_BASE_URL}/${endpoint}`;
    
    // Convert endpoint for trending and top-rated
    if (endpoint === "trending") {
      url = `${API_BASE_URL}/anime/popular`;
    } else if (endpoint === "top-rated") {
      url = `${API_BASE_URL}/anime/top`;
    }
    
    // Add query parameters
    const params = new URLSearchParams();
    
    if (options.page) {
      params.append('page', options.page);
    }
    
    if (options.limit) {
      params.append('limit', options.limit);
    }
    
    // Append parameters to URL if any exist
    const queryString = params.toString();
    if (queryString) {
      url += url.includes('?') ? `&${queryString}` : `?${queryString}`;
    }
    
    console.log('Fetching:', url); // Debug log
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { results: [] };
  }
}

/**
 * Fetch anime data by ID and slug.
 * @param {string} id - Anime ID.
 * @param {string} slug - Anime slug.
 * @returns {Promise<object|null>}
 */
export async function fetchAnimeData(id, slug) {
  try {
    const url = `${API_BASE_URL}/anime?id=${id}&slug=${slug}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Anime not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return null;
  }
}

/**
 * Fetch watch data (video dan navigasi) untuk episode tertentu.
 * @param {string} id - Anime ID.
 * @param {string} slug - Anime slug.
 * @param {number|string} episode - Episode number.
 * @returns {Promise<object|null>}
 */
export async function fetchWatchData(id, slug, episode) {
  try {
    const url = `${API_BASE_URL}/watch?id=${id}&slug=${slug}&episode=${episode}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Video not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching watch data:", error);
    return null;
  }
}