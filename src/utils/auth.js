import {
  createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "~/firebase/init";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export async function signUpUser(email, password, name) {
  try {
    // 1. Daftar ke Firebase Auth terlebih dahulu
    console.log("Mencoba mendaftar ke Firebase...");
    const UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = UserCredential.user;

    console.log("Berhasil mendaftar di Firebase, menyimpan data ke Firestore...");
    await setDoc(doc(db, "users", user.uid), {
      nama: name,
      email,
      password,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error saat pendaftaran:", error);
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email sudah terdaftar. Silakan gunakan email lain.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Format email tidak valid.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password terlalu lemah. Minimal 6 karakter.');
    }
    throw new Error('Terjadi kesalahan saat pendaftaran. Silakan coba lagi.');
  }
}

export async function loginUser(email, password) {
  try {
    // 1. Cari user berdasarkan email di Firestore
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        message: "Email atau password salah"
      };
    }

    // 2. Ambil data user
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // 3. Periksa password
    if (userData.password !== password) {
      return {
        success: false,
        message: "Email atau password salah"
      };
    }

    // 4. Jika password benar, siapkan data user
    const userToStore = {
      uid: userDoc.id,
      email: userData.email,
      nama: userData.nama,
      password: userData.password,
      createdAt: userData.createdAt,
      isLoggedIn: true,
      lastLoginAt: new Date().toISOString()
    };

    // 5. Update last login di Firestore
    await setDoc(doc(db, "users", userDoc.id), {
      ...userData,
      lastLoginAt: new Date()
    }, { merge: true });

    return {
      success: true,
      user: userToStore,
      message: "Login berhasil"
    };

  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat login. Silakan coba lagi."
    };
  }
}

export function observeUser(callback) {
    onAuthStateChanged(auth, callback);
}

export async function getUserData(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ?
  docSnap.data() : null;
}

// API URL untuk backend
const API_BASE_URL = "https://api-kura.animez.my.id/api";

/**
 * Cek koneksi ke API
 * @returns {Promise<boolean>} Status koneksi
 */
export async function checkApiConnection() {
  try {
    console.log("Mencoba koneksi ke API:", `${API_BASE_URL}/ongoing`);
    const response = await fetch(`${API_BASE_URL}/ongoing`);
    console.log("Status koneksi API:", response.status, response.ok);
    return response.ok;
  } catch (error) {
    console.error("API connection error:", error.message);
    return false;
  }
}

/**
 * Login user dengan email dan password menggunakan API MySQL
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, message: string, data: object|null}>}
 */
export async function loginUserAPI(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    
    if (result.success) {
    // Simpan info user di localStorage untuk state management
      localStorage.setItem('animetopia_user', JSON.stringify(result.data));
    }
    
    return result;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat login. Periksa koneksi anda.",
      data: null
    };
  }
}

/**
 * Mendaftarkan user baru dengan API MySQL
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, message: string, data: object|null}>}
 */
export async function registerUser(username, email, password) {
  try {
    console.log("Mencoba koneksi ke API MySQL...");
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
      username,
      email,
        password,
        // Tambahkan timestamp untuk tracking
        register_time: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Hasil pendaftaran MySQL:", result);
    return result;
  } catch (error) {
    console.error("MySQL Registration error:", error);
    throw new Error("Gagal mendaftar ke database MySQL");
  }
}

/**
 * Mendapatkan data user yang sedang login
 * @returns {Promise<object|null>} User data atau null jika tidak ada user login
 */
export async function getCurrentUser() {
  try {
    // Cek data di localStorage
    const userData = localStorage.getItem('animetopia_user');
    if (!userData) return null;

    const user = JSON.parse(userData);
    
    // Ambil data terbaru dari Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        uid: user.uid,
        ...docSnap.data()
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Logout user
 * @returns {Promise<boolean>} Success status
 */
export async function logoutUser() {
  try {
    // Hapus data user dari localStorage
    localStorage.removeItem('animetopia_user');
    
    // Reset state lainnya jika ada
    localStorage.clear();
    
    // Redirect ke halaman login
    window.location.href = '/akun';
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}

/**
 * Setup auth state listener untuk memantau status login user
 * @param {Function} callback Fungsi yang dipanggil saat status auth berubah
 * @returns {Function} Unsubscribe function
 */
export function setupAuthStateListener(callback) {
  // Implementasi sederhana dengan localStorage event
  const checkAuthState = () => {
    const user = getCurrentUser();
    callback(user);
  };
  
  // Panggil pertama kali untuk inisialisasi
  checkAuthState();
  
  // Listen untuk event storage untuk mendeteksi perubahan login state
  window.addEventListener('storage', (event) => {
    if (event.key === 'animetopia_user') {
      checkAuthState();
    }
  });
  
  // Return unsubscribe function
  return () => {
    window.removeEventListener('storage', checkAuthState);
  };
} 