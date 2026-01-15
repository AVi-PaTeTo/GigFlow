import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const apiURL = import.meta.env.VITE_API_ENDPOINT
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMe = async () => {
        try {
        const res = await fetch(`${apiURL}/api/auth/me`, {
            credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setUser(data);
        } catch {
        setUser(null);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    const logout = async () => {
        await fetch(`${apiURL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        });
        setUser(null);
    };

    return (
        <UserContext.Provider
        value={{
            user,
            loading,
            isAuthenticated: !!user,
            refetchUser: fetchMe,
            logout,
        }}
        >
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
