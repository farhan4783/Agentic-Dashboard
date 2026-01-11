import { create } from 'zustand';

export type SaleRecord = {
    id: string;
    date: string;
    product: string;
    category: string;
    amount: number;
    region: string;
};

export type ViewMode = 'table' | 'chart';

type FilterState = {
    minAmount?: number;
    maxAmount?: number;
    category?: string;
    region?: string;
    search?: string;
};

type DashboardState = {
    data: SaleRecord[];
    activeFilters: FilterState;
    viewMode: ViewMode;
    isLoading: boolean;

    // Actions
    setData: (data: SaleRecord[]) => void;
    setFilter: (filters: Partial<FilterState>) => void;
    clearFilters: () => void;
    setViewMode: (mode: ViewMode) => void;
    setLoading: (loading: boolean) => void;
};

// Mock Data
const INITIAL_DATA: SaleRecord[] = [
    { id: '1', date: '2024-01-15', product: 'Laptop Pro', category: 'Electronics', amount: 1200, region: 'North' },
    { id: '2', date: '2024-01-16', product: 'Ergo Chair', category: 'Furniture', amount: 350, region: 'West' },
    { id: '3', date: '2024-01-17', product: 'Wireless Buds', category: 'Electronics', amount: 150, region: 'East' },
    { id: '4', date: '2024-01-18', product: 'Desk Lamp', category: 'Furniture', amount: 45, region: 'South' },
    { id: '5', date: '2024-01-20', product: 'Monitor 4K', category: 'Electronics', amount: 450, region: 'North' },
    { id: '6', date: '2024-01-21', product: 'Coffee Table', category: 'Furniture', amount: 200, region: 'West' },
    { id: '7', date: '2024-01-22', product: 'Smartphone', category: 'Electronics', amount: 800, region: 'East' },
    { id: '8', date: '2024-01-23', product: 'Bookshelf', category: 'Furniture', amount: 120, region: 'South' },
];

export const useDashboardStore = create<DashboardState>((set) => ({
    data: INITIAL_DATA,
    activeFilters: {},
    viewMode: 'table',
    isLoading: false,

    setData: (data) => set({ data }),
    setFilter: (newFilters) =>
        set((state) => ({ activeFilters: { ...state.activeFilters, ...newFilters } })),
    clearFilters: () => set({ activeFilters: {} }),
    setViewMode: (viewMode) => set({ viewMode }),
    setLoading: (isLoading) => set({ isLoading }),
}));
