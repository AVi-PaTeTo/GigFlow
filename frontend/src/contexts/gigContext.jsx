import { createContext, useContext, useState } from "react";

const GigContext = createContext(null);

export const GigProvider = ({ children }) => {
    const apiURL = import.meta.env.VITE_API_ENDPOINT
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGigs = async (params = {}) => {
        setLoading(true);
        setError(null);

        const query = new URLSearchParams(params).toString();
        try {
        const res = await fetch(`${apiURL}/api/gigs?${query}`, {
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch gigs");

        const data = await res.json();
        setGigs(data);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    const fetchUserGigs = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${apiURL}/api/gigs/me`, {
            credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to fetch user gigs");

            const data = await res.json();

            setGigs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const refreshGig = async (id) => {
    try {
        const res = await fetch(`${apiURL}/api/gigs/${id}`, {
        credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to refresh gig");

        const updated = await res.json();

        setGigs((prev) =>
            prev.map((g) => (g._id === id ? {...updated.gig, placedBid: updated.hasPlacedBid} : g))
        );

        return updated;
    } catch (err) {
        setError(err.message);
        throw err;
    }
    };


    const createGig = async (payload) => {
        const res = await fetch(`${apiURL}/api/gigs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to create gig");

        const gig = await res.json();
        setGigs((prev) => [gig, ...prev]);
        return gig;
    };

    const updateGig = async (id, payload) => {
        const res = await fetch(`${apiURL}/api/gigs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to update gig");

        const updated = await res.json();
        setGigs((prev) =>
        prev.map((g) => (g._id === id ? updated : g))
        );

        return updated;
    };

    const deleteGig = async (id) => {
        const res = await fetch(`${apiURL}/api/gigs/${id}`, {
        method: "DELETE",
        credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to delete gig");

        setGigs((prev) => prev.filter((g) => g._id !== id));
    };

    return (
        <GigContext.Provider
        value={{
            gigs,
            loading,
            error,
            fetchGigs,
            fetchUserGigs,
            refreshGig,
            createGig,
            updateGig,
            deleteGig,
        }}
        >
        {children}
        </GigContext.Provider>
    );
    };

    export const useGigs = () => {
    const ctx = useContext(GigContext);
    if (!ctx) {
        throw new Error("useGigs must be used inside GigProvider");
    }
    return ctx;
};
