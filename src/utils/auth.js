// auth.js - Centralized authentication logic

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const checkTokenValidity = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return false; // No token = not logged in
  }

  try {
    // Use your existing account endpoint to verify token
    const response = await fetch(`${API_BASE_URL}/account`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // Token is valid - user account data returned successfully
      return true;
    } else {
      // Token is invalid/expired (401 Unauthorized or other error)
      console.log('Token validation failed, cleaning up...');
      localStorage.removeItem('authToken');
      localStorage.removeItem('disclaimer_accepted'); // Clean up disclaimer too
      return false;
    }
  } catch (error) {
    console.error('Token validation error:', error);
    // Network error or server down - assume token is invalid to be safe
    localStorage.removeItem('authToken');
    localStorage.removeItem('disclaimer_accepted');
    return false;
  }
};

// Optional: Clear all auth data helper
export const clearAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('disclaimer_accepted');
};