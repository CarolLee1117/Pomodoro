import { useCallback, useEffect, useState } from "react";

export const useFadeIn = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const fadeOut = useCallback(() => setLoaded(false), []);
    const fadeIn = useCallback(() => setLoaded(true), []);

    return { loaded, fadeOut, fadeIn, setLoaded };
};