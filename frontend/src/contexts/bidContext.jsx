import { createContext, useContext, useEffect, useState } from "react";

const BidContext = createContext(null);

export const BidProvider = ({ children }) => {
    const apiURL = import.meta.env.VITE_API_ENDPOINT
    const [myBids, setMyBids]  = useState([]);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBids = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${apiURL}/api/bids/${id}`, {
                credentials: "include"
            });

            if (!res.ok) throw new Error("Failed to fetch bids");

            const data = await res.json();
            setBids(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchUserBids = async () => {
        setLoading(true);
        setError(null);

        try{
            const res = await fetch(`${apiURL}/api/bids/me`, {
            credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to fetch user bids");

            const data = await res.json()
            setMyBids(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false)
        }

    }

    const createBid = async (payload) => {
        const res = await fetch(`${apiURL}/api/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to place bid");
    };

    return (
        <BidContext.Provider
        value={{
            bids,
            myBids,
            loading,
            error,
            fetchBids,
            fetchUserBids,
            createBid,
        }}
        >
        {children}
        </BidContext.Provider>
    )
}

export const useBids = () => {
    const ctx = useContext(BidContext);
    if (!ctx) {
        throw new Error('useBids must be used inside BidProvider')
    }
    return ctx;
}