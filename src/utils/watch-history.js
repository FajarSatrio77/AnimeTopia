// Cache untuk menyimpan riwayat tontonan, mengurangi akses ke localStorage
let watchHistoryCache = null;
let lastUserId = null;

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
 * Mendapatkan daftar riwayat tontonan untuk user yang sedang login
 * @param {boolean} forceRefresh Paksa refresh dari localStorage
 * @returns {Array} Daftar riwayat tontonan
 */
export function getWatchHistory(forceRefresh = false) {
  const user = getCurrentUser();
  const userId = user?.uid || 'guest';
  
  // Jika cached dan usernya sama, gunakan cache
  if (!forceRefresh && watchHistoryCache && lastUserId === userId) {
    return watchHistoryCache;
  }
  
  // Menggunakan user ID sebagai key untuk menyimpan riwayat
  const key = user ? `watchHistory_${userId}` : 'animeWatchHistory';
  const history = localStorage.getItem(key);
  
  // Update cache
  watchHistoryCache = history ? JSON.parse(history) : [];
  lastUserId = userId;
  
  return watchHistoryCache;
}

/**
 * Menyimpan anime ke riwayat tontonan
 * @param {Object} anime Data anime yang ditonton
 * @returns {boolean} True jika berhasil disimpan
 */
export function saveToWatchHistory(anime) {
  if (!anime || !anime.id) return false;
  
  const user = getCurrentUser();
  const userId = user?.uid || 'guest';
  
  // Menggunakan user ID sebagai key
  const key = user ? `watchHistory_${userId}` : 'animeWatchHistory';
  
  // Ambil riwayat yang ada dari cache jika memungkinkan
  let watchHistory = [];
  if (watchHistoryCache && lastUserId === userId) {
    watchHistory = [...watchHistoryCache];
  } else {
    const existingHistory = localStorage.getItem(key);
    watchHistory = existingHistory ? JSON.parse(existingHistory) : [];
  }
  
  // Cek apakah anime sudah ada di riwayat
  const existingAnimeIndex = watchHistory.findIndex(item => item.id === anime.id);
  
  // Data anime yang akan disimpan
  const animeData = {
    id: anime.id,
    slug: anime.slug,
    title: anime.title,
    episode: anime.episode,
    image: anime.image,
    lastWatched: new Date().toISOString()
  };
  
  // Jika anime sudah ada di riwayat, update data
  if (existingAnimeIndex !== -1) {
    watchHistory.splice(existingAnimeIndex, 1);
  }
  
  // Tambahkan anime ke awal array (paling baru)
  watchHistory.unshift(animeData);
  
  // Batasi riwayat hanya 20 anime
  if (watchHistory.length > 20) {
    watchHistory = watchHistory.slice(0, 20);
  }
  
  // Update cache
  watchHistoryCache = watchHistory;
  lastUserId = userId;
  
  // Simpan kembali ke localStorage
  try {
    localStorage.setItem(key, JSON.stringify(watchHistory));
    
    // Trigger storage event untuk update lintas tab
    window.dispatchEvent(new StorageEvent('storage', {
      key: key,
      newValue: JSON.stringify(watchHistory)
    }));
    
    return true;
  } catch (error) {
    console.error("Error saving watch history:", error);
    return false;
  }
}

/**
 * Menghapus item dari riwayat tontonan
 * @param {string} animeId ID anime yang akan dihapus
 * @returns {boolean} True jika berhasil dihapus
 */
export function removeFromWatchHistory(animeId) {
  const user = getCurrentUser();
  const userId = user?.uid || 'guest';
  
  // Menggunakan user ID sebagai key
  const key = user ? `watchHistory_${userId}` : 'animeWatchHistory';
  
  // Ambil riwayat yang ada
  let watchHistory = getWatchHistory(true);
  
  // Filter anime yang akan dihapus
  const initialLength = watchHistory.length;
  watchHistory = watchHistory.filter(item => item.id !== animeId);
  
  // Jika tidak ada yang dihapus, return false
  if (watchHistory.length === initialLength) {
    return false;
  }
  
  // Update cache
  watchHistoryCache = watchHistory;
  
  // Simpan kembali ke localStorage
  localStorage.setItem(key, JSON.stringify(watchHistory));
  
  // Trigger storage event untuk pembaruan lintas tab
  window.dispatchEvent(new StorageEvent('storage', {
    key: key,
    newValue: JSON.stringify(watchHistory)
  }));
  
  return true;
}

/**
 * Membersihkan seluruh riwayat tontonan
 * @returns {boolean} True jika berhasil dibersihkan
 */
export function clearWatchHistory() {
  const user = getCurrentUser();
  const userId = user?.uid || 'guest';
  
  // Menggunakan user ID sebagai key
  const key = user ? `watchHistory_${userId}` : 'animeWatchHistory';
  
  // Reset cache
  watchHistoryCache = [];
  
  // Hapus dari localStorage
  localStorage.removeItem(key);
  
  // Trigger storage event untuk pembaruan lintas tab
  window.dispatchEvent(new StorageEvent('storage', {
    key: key,
    oldValue: localStorage.getItem(key),
    newValue: null
  }));
  
  return true;
}

// Reset cache jika ada perubahan di localStorage
window.addEventListener('storage', (e) => {
  if (e.key === 'animetopia_user' || e.key?.startsWith('watchHistory_')) {
    // Reset cache ketika ada perubahan
    watchHistoryCache = null;
    lastUserId = null;
  }
}); 