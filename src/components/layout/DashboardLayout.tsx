'use client';

import { AppWindow, BarChart3, Home, Settings } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-white dark:bg-neutral-950 px-4 py-6 hidden md:block">
                <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <AppWindow className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">AgenticDash</span>
                </div>

                <nav className="space-y-1">
                    <Link href="#" className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                        <Home className="w-4 h-4" />
                        Overview
                    </Link>
                    <Link href="#" className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                    </Link>
                    <Link href="#" className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
                        <Settings className="w-4 h-4" />
                        Settings
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b bg-white dark:bg-neutral-950 flex items-center justify-between px-6">
                    <h1 className="text-lg font-semibold">Overview</h1>
                    <div className="text-sm text-neutral-500">
                        Agent Active
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
