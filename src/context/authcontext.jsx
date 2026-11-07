import { createContext, useState, useEffect } from "react";

export const authContext = createContext();

const USERS_KEY = "shop_auth_users";
const SESSION_KEY = "shop_auth_session";

// ---------------------------------------------------------------------------
// Local storage helpers
// The previous Supabase project no longer exists, so accounts are stored
// locally in the browser. This keeps the app working without a backend, but
// it is a demo-only solution: credentials live in localStorage and are not
// shared between devices/browsers.
// ---------------------------------------------------------------------------

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

// Store a hash instead of the raw password. Note that this is still not
// production-grade security because everything runs client-side.
async function hashPassword(password) {
  if (window.crypto?.subtle) {
    const data = new TextEncoder().encode(password);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  // Fallback for non-secure contexts where SubtleCrypto is unavailable.
  let hash = 0;
  for (let i = 0; i < password.length; i += 1) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0;
  }
  return `fallback:${hash}`;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function toPublicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession());
  const [loading, setLoading] = useState(true);

  // Session is read synchronously above, so the app never flashes the login
  // page on refresh. Loading only covers the initial mount tick.
  useEffect(() => {
    setLoading(false);
  }, []);

  // Keep multiple tabs in sync.
  useEffect(() => {
    function handleStorage(event) {
      if (event.key === SESSION_KEY) {
        setUser(readSession());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const signup = async (email, password, userData = {}) => {
    try {
      const normalizedEmail = normalizeEmail(email);
      const firstName = String(userData.firstName || "").trim();
      const lastName = String(userData.lastName || "").trim();

      if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        return { success: false, error: "Please enter a valid email address." };
      }
      if (!password || password.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters long.",
        };
      }

      const users = readUsers();
      const alreadyExists = users.some(
        (existing) => existing.email === normalizedEmail,
      );
      if (alreadyExists) {
        return {
          success: false,
          error: "An account with this email already exists. Try signing in.",
        };
      }

      const newUser = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        email: normalizedEmail,
        firstName,
        lastName,
        passwordHash: await hashPassword(password),
        createdAt: new Date().toISOString(),
      };

      writeUsers([...users, newUser]);

      const publicUser = toPublicUser(newUser);
      writeSession(publicUser);
      setUser(publicUser);

      return { success: true, user: publicUser };
    } catch {
      return {
        success: false,
        error: "Something went wrong while creating your account. Please try again.",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const normalizedEmail = normalizeEmail(email);

      if (!normalizedEmail || !password) {
        return { success: false, error: "Please enter your email and password." };
      }

      const users = readUsers();
      const existing = users.find((item) => item.email === normalizedEmail);

      if (!existing) {
        return {
          success: false,
          error: "No account found with this email. Please create an account.",
        };
      }

      const passwordHash = await hashPassword(password);
      if (existing.passwordHash !== passwordHash) {
        return { success: false, error: "Incorrect password. Please try again." };
      }

      const publicUser = toPublicUser(existing);
      writeSession(publicUser);
      setUser(publicUser);

      return { success: true, user: publicUser };
    } catch {
      return {
        success: false,
        error: "Something went wrong while signing in. Please try again.",
      };
    }
  };

  const logout = async () => {
    writeSession(null);
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <authContext.Provider
      value={{ user, login, signup, logout, isAuthenticated, loading }}
    >
      {children}
    </authContext.Provider>
  );
}
