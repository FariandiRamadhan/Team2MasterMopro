// API configuration
export const API_BASE_URL = 'https://propscountryside.cloud';
import AsyncStorage from '@react-native-async-storage/async-storage';
// export const API_BASE_URL = 'http://localhost:8080';

// Main API request handler
/**
 * 
 * @param {string} endpoint path yang dituju
 * @param {object} options object request (header dan body)
 * @param {boolean} rawResponse apakah nilai yang dikembalikan adalah response mentahnya, default false
 * @returns 
 */
export const handleApiRequest = async (endpoint, options = {}, rawResponse = false) => {

  try {
    // Default Header untuk request
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Untuk Request yang butuh HTTPOnly Cookie
    const requestOptions = {
      ...options,
      headers,
      credentials: 'include',
    };

    // Request ke REST API
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

    if(rawResponse){
      return response;
    }

    const data = await response.json();

    // console.dir(await response.headers);
    // Melihat request invalid
    if (!response.ok) {
      throw [response.status, response.statusText, data];
    }

    // data berbentuk JSON
    return data;
  } catch (error) {
    // console.dir(error);
    console.error('API Request Failed:', error);
    throw error;
  }
};

// Login function
export const loginUser = async (username, password) => {
  let response = handleApiRequest('/users', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  return response;
};

// Check if user is authenticated
export const checkAuthStatus = async () => {
  try {
    const response = await handleApiRequest('/users', {
      method: 'GET'
    });
    return response;
  } catch (error) {
    return false;
  }
};

// Logout function
/**
 * 
 * @returns bool apakah user berhasil logout
 */
export const logoutUser = async () => {
  try {
    await handleApiRequest('/users/id', {
      method: 'DELETE'
    });
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

/**
 * 
 * @param {string} key key dari item yang disimpan dalam AsyncStorage
 * @param {mixed} value nilai apa yang ingin disimpan
 * @param {number} expiryHours berapa jam data disimpan
 * @throws error tidak bisa menyimpan data
 */
export const storeData = async (key, value, expiryHours = 24) => {
  try {
    // Construct items untuk disimpan
    const item = {
      value,
      timestamp: new Date().getTime(),
      expiryHours,
    };

    // Ubah item yang di construct menjadi JSON String
    const jsonValue = JSON.stringify(item);

    // Set item untuk disimpan dalam AsyncStorage (key value paired)
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {

    // Menangkap error
    console.error('Gagal menyimpan data:', error);
    throw error;
  }
}

/**
 * 
 * @param {string} key key dari item yang disimpan dalam AsyncStorage
 * @returns object AsyncStorage | null
 * @throws error tidak bisa mendapatkan data
 */
export const getData = async (key) => {
  try {
    // Mencoba mendapatkan data dari AsyncStorage
    const jsonValue = await AsyncStorage.getItem(key);
    
    // Jika tidak dapat maka akan mengembalikan null
    if (!jsonValue) {
      return null;
    }

    // Parsing item dari JSON string ke Javascript Object
    const item = JSON.parse(jsonValue);

    // Mendapatkan waktu saat ini
    const now = new Date().getTime();

    // Mengecek waktu expire (waktu pembuatan item + waktu expire (dalam jam))
    const expiryTime = item.timestamp + (item.expiryHours * 60 * 60 * 1000);

    /**
     * Check data sudah expire atau belum, jika waktu sekarang lebih besar dari expiryTime
     * maka otomatis waktu expire sudah terlampaui 
     */
    if (now > expiryTime) {

      // panggil fungsi removeData dan kembalikan nilai null
      await removeData(key);
      return null;
    }

    // Jika belum kadaluwarsa maka ambil value dari itemnya
    return item.value;
  } catch (error) {

    // Mendapatkan error jika ada dan throw error
    console.error('Gagal mendapatkan data:', error);
    throw error;
  }
}

/**
 * 
 * @param {string} key key dari item yang disimpan pada AsyncStorage
 * @returns true jika berhasil dihapus
 * @throws error jika gagal dihapus
 */
export const removeData = async (key) => {
  try {

    // Menghapus data berdasarkan key
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {

    // Mendapatkan error jika ada dan throw error
    console.error('Gagal menghapus data:', error);
    throw error;
  }
}

/**
 * 
 * @param {string} key key dari item yang disimpan pada AsyncStorage
 * @returns bool apakah masih ada / belum expire
 */
export const isValid = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    
    if (!jsonValue) {
      return false;
    }

    const item = JSON.parse(jsonValue);
    const now = new Date().getTime();
    const expiryTime = item.timestamp + (item.expiryHours * 60 * 60 * 1000);

    return now <= expiryTime;
  } catch (error) {
    console.error('Error checking data validity:', error);
    return false;
  }
}
// export const storeData = async (key, value) => {
//   try {
//     const jsonValue = JSON.stringify({"data" : value});
//     await AsyncStorage.setItem(key, jsonValue);
//   } catch (e) {
//     return false;
//   }
// }

// export const showData = async (key) => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(key);
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     return false;
//   }
// }
// loginUser("admin", "admin#1234").then(e => console.log(e));
// checkAuthStatus();