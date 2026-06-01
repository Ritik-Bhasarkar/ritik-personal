'use client';

import { createContext, useContext, useState } from 'react';

interface GridContextValue {
    gridVisible: boolean;
    toggleGrid: () => void;
}

const GridContext = createContext<GridContextValue | null>(null);

export function GridProvider({ children }: { children: React.ReactNode }) {
    const [gridVisible, setGridVisible] = useState(true);

    const toggleGrid = () => setGridVisible(prev => !prev);

    return (
        <GridContext.Provider value={{ gridVisible, toggleGrid }}>
            {children}
        </GridContext.Provider>
    );
}

export function useGrid(): GridContextValue {
    const ctx = useContext(GridContext);
    if (!ctx) throw new Error('useGrid must be used within GridProvider');
    return ctx;
}
