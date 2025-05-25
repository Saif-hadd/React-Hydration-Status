import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HydrationProvider, useHydrationStatus } from '../src';

describe('useHydrationStatus', () => {
  it('should display Skeleton initially and RealUI after hydration', async () => {
    jest.useFakeTimers();

    function TestComponent() {
      const { isHydrated } = useHydrationStatus();
      return isHydrated ? (
        <div data-testid="real">RealUI</div>
      ) : (
        <div data-testid="skeleton">Skeleton</div>
      );
    }

    render(
      <HydrationProvider>
        <TestComponent />
      </HydrationProvider>
    );

  
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('real')).not.toBeInTheDocument();

    
    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId('real')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();

    jest.useRealTimers();
  });
});
