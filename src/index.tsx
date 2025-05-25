import * as React from 'react';

interface HydrationContextValue {
  isHydrated: boolean;
}

const HydrationContext = React.createContext<HydrationContextValue | undefined>(undefined);

interface HydrationProviderProps {
  children: React.ReactNode;
}

export function HydrationProvider({ children }: HydrationProviderProps): JSX.Element {
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0); // simulate async hydration

    return () => clearTimeout(timer); // cleanup for strict mode
  }, []);

  return (
    <HydrationContext.Provider value={{ isHydrated }}>
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydrationStatus(): HydrationContextValue {
  const context = React.useContext(HydrationContext);
  if (context === undefined) {
    throw new Error('useHydrationStatus must be used within a HydrationProvider');
  }
  return context;
}
