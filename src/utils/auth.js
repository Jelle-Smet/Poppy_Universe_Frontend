// auth.js - Centralized authentication logic

export const checkTokenValidity = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return false; // No token = not logged in
  }

  try {
    // Replace this URL with your actual backend endpoint
    const response = await fetch('http://your-backend-url/api/verify-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      return true; // Token is valid
    } else {
      // Token is invalid/expired - clean it up
      localStorage.removeItem('authToken');
      return false;
    }
  } catch (error) {
    console.error('Token validation failed:', error);
    // If server is unreachable, assume token is invalid to be safe
    localStorage.removeItem('authToken');
    return false;
  }
};

// Optional: Clear token helper
export const clearAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('disclaimer_accepted'); // Clear disclaimer too
};