import { getCurrentUser } from "./auth.js";

/**
 * Mendapatkan daftar anime favorit untuk user yang sedang login
 * @returns {Array} Daftar anime favorit
 */
export function getUserFavorites() {
  const user = getCurrentUser();
  if (!user) return [];
  
  // Menggunakan user ID sebagai key untuk menyimpan favorit
  const key = `favorites_${user.uid}`;
  const favorites = localStorage.getItem(key);
  return favorites ? JSON.parse(favorites) : [];
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
  
  // Simpan kembali ke localStorage
  localStorage.setItem(key, JSON.stringify(favorites));
  
  // Trigger storage event
  window.dispatchEvent(new Event('storage'));
  
  return true;
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
  
  // Simpan kembali ke localStorage
  localStorage.setItem(key, JSON.stringify(favorites));
  
  // Trigger storage event
  window.dispatchEvent(new Event('storage'));
  
  return true;
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