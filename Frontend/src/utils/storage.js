export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Error saving to storage:', err);
  }
};

export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error('Error getting from storage:', err);
    return null;
  }
};

export const clearOnLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};
