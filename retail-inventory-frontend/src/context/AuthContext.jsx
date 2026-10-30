
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const mockUser = {
  id: 1,
  name: "Admin",
  email: "admin@example.com",
  role: "admin",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(email, password) {
    setLoading(true);
    setError("");

    try {
      // Mock authentication (no backend required)
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (
        email.trim().toLowerCase() === "admin@example.com" &&
        password === "admin123"
      ) {
        localStorage.setItem("token", "mock-token-123");
        localStorage.setItem("user", JSON.stringify(mockUser));

        setUser(mockUser);
        return true;
      }

      setError("Invalid email or password");
      return false;
    } catch {
      setError("Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setError("");
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
