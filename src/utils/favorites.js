// Cache untuk menyimpan daftar favorit, mengurangi akses ke localStorage
let favoritesCache = null;
let lastFavUserId = null;

// Get current user from localStorage
function getCurrentUser() {
  try {
    const userData = localStorage.getItem('animetopia_user');
    if (!userData) return null;
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

/**
 * Mendapatkan daftar anime favorit untuk user yang sedang login
 * @param {boolean} forceRefresh Paksa refresh dari localStorage
 * @returns {Array} Daftar anime favorit
 */
export function getUserFavorites(forceRefresh = false) {
  const user = getCurrentUser();
  if (!user) return [];
  
  // Jika cached dan usernya sama, gunakan cache
  if (!forceRefresh && favoritesCache && lastFavUserId === user.uid) {
    return favoritesCache;
  }
  
  // Menggunakan user ID sebagai key untuk menyimpan favorit
  const key = `favorites_${user.uid}`;
  const favorites = localStorage.getItem(key);
  
  // Update cache
  favoritesCache = favorites ? JSON.parse(favorites) : [];
  lastFavUserId = user.uid;
  
  return favoritesCache;
}

/**
 * Menambahkan anime ke daftar favorit user
 * @param {Object} anime Data anime yang akan ditambahkan ke favorit
 * @returns {boolean} True jika berhasil, false jika gagal
 */
export function addToFavorites(anime) {
  const user = getCurrentUser();
  if (!user) return false;
  
  const key = `favorites_${user.uid}`;
  const favorites = getUserFavorites();
  
  // Cek apakah anime sudah ada di favorit
  if (favorites.some(fav => fav.id === anime.id)) {
    return false; // Anime sudah ada di favorit
  }
  
  // Tambahkan anime ke favorit
  favorites.push({
    id: anime.id,
    slug: anime.slug,
    title: anime.title,
    image: anime.image,
    addedAt: new Date().toISOString()
  });
  
  // Update cache
  favoritesCache = favorites;
  
  // Simpan kembali ke localStorage
  try {
    localStorage.setItem(key, JSON.stringify(favorites));
    
    // Trigger storage event untuk pembaruan lintas tab
    window.dispatchEvent(new StorageEvent('storage', {
      key: key,
      newValue: JSON.stringify(favorites)
    }));
    
    return true;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return false;
  }
}

/**
 * Menghapus anime dari daftar favorit user
 * @param {string} animeId ID anime yang akan dihapus
 * @returns {boolean} True jika berhasil, false jika gagal
 */
export function removeFromFavorites(animeId) {
  const user = getCurrentUser();
  if (!user) return false;
  
  const key = `favorites_${user.uid}`;
  let favorites = getUserFavorites();
  
  // Filter anime yang akan dihapus
  const initialLength = favorites.length;
  favorites = favorites.filter(fav => fav.id !== animeId);
  
  // Jika tidak ada yang dihapus, return false
  if (favorites.length === initialLength) {
    return false;
  }
  
  // Update cache
  favoritesCache = favorites;
  
  // Simpan kembali ke localStorage
  try {
    localStorage.setItem(key, JSON.stringify(favorites));
    
    // Trigger storage event untuk pembaruan lintas tab
    window.dispatchEvent(new StorageEvent('storage', {
      key: key,
      newValue: JSON.stringify(favorites)
    }));
    
    return true;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return false;
  }
}

/**
 * Cek apakah anime sudah menjadi favorit
 * @param {string} animeId ID anime yang dicek
 * @returns {boolean} True jika sudah favorit, false jika belum
 */
export function isFavorite(animeId) {
  const favorites = getUserFavorites();
  return favorites.some(fav => fav.id === animeId);
}

/**
 * Toggle status favorit anime (menambahkan jika belum ada, menghapus jika sudah ada)
 * @param {Object} anime Data anime
 * @returns {boolean} Status favorit setelah toggle (true = favorit, false = bukan favorit)
 */
export function toggleFavorite(anime) {
  if (isFavorite(anime.id)) {
    removeFromFavorites(anime.id);
    return false;
  } else {
    addToFavorites(anime);
    return true;
  }
}

/**
 * Reset cache favorit (dipanggil ketika ada perubahan user login/logout)
 */
export function resetFavoritesCache() {
  favoritesCache = null;
  lastFavUserId = null;
}

// Reset cache jika ada perubahan di localStorage 
window.addEventListener('storage', (e) => {
  if (e.key === 'animetopia_user' || e.key?.startsWith('favorites_')) {
    // Force refresh cache ketika ada perubahan
    resetFavoritesCache();
  }
}); 