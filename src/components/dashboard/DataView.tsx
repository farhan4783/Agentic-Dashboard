'use client';

import { useDashboardStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function DataView() {
    const { data, activeFilters, viewMode } = useDashboardStore();

    // Apply filters locally for display (in a real app, backend might handle this too)
    const filteredData = data.filter((item) => {
        if (activeFilters.minAmount && item.amount < activeFilters.minAmount) return false;
        if (activeFilters.maxAmount && item.amount > activeFilters.maxAmount) return false;
        if (activeFilters.category && item.category !== activeFilters.category) return false;
        if (activeFilters.region && item.region !== activeFilters.region) return false;
        if (activeFilters.search && !item.product.toLowerCase().includes(activeFilters.search.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="w-full h-full space-y-4">
            <div className="flex items-center gap-2">
                {Object.entries(activeFilters).map(([key, value]) => (
                    value && <Badge key={key} variant="secondary" className="px-2 py-1">{key}: {value}</Badge>
                ))}
                {Object.keys(activeFilters).length === 0 && <span className="text-sm text-muted-foreground">Showing all data</span>}
            </div>

            <Card className="h-[500px]">
                <CardHeader>
                    <CardTitle>Sales Data</CardTitle>
                    <CardDescription>
                        {viewMode === 'table' ? 'Tabular view of transactions' : 'Chart visualization by Product'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                    {viewMode === 'table' ? (
                        <div className="rounded-md border h-full overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Region</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{format(new Date(item.date), 'MMM d, yyyy')}</TableCell>
                                            <TableCell className="font-medium">{item.product}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.region}</TableCell>
                                            <TableCell className="text-right">${item.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                    {filteredData.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center h-24">No results found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={filteredData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="product" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
