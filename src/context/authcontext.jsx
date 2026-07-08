import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
      },
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.session) {
      return {
        success: false,
        needsEmailConfirmation: true,
        error: "Please check your email to confirm your account before logging in.",
      };
    }
    return { success: true, user: data.user };
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, user: data.user };
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
