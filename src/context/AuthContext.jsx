import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  clearAuthStorage,
  getStoredToken,
  getStoredUser,
  setAuthStorage,
} from "../api/client";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());

  // Keep React state in sync if another tab logs in/out.
  useEffect(() => {
    const sync = () => {
      setToken(getStoredToken());
      setUser(getStoredUser());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const persist = (authResponse) => {
    setAuthStorage(authResponse.token, authResponse.user);
    setToken(authResponse.token);
    setUser(authResponse.user);
    return authResponse;
  };

  const login = async (credentials) => persist(await authApi.login(credentials));

  const register = async (payload) => persist(await authApi.register(payload));

  const logout = () => {
    clearAuthStorage();
    setToken(null);
    setUser(null);
  };

  // Allow pages (e.g. profile save) to refresh the cached user object.
  const updateUser = (nextUser) => {
    setUser(nextUser);
    setAuthStorage(token, nextUser);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      updateUser,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
