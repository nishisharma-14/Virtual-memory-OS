"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

export default function AlgorithmComparison({ analytics }: { analytics: { name: string, faults: number, hits: number }[] }) {
    if (!analytics || analytics.length === 0) return null;

    return (
        <div className="bg-gray-800/40 border border-gray-700 p-6 rounded-2xl w-full h-[300px] mt-8 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-300">Algorithm Performance (Page Faults)</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                        <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} allowDecimals={false} />
                        <Tooltip
                            cursor={{ fill: '#374151', opacity: 0.4 }}
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#F3F4F6', borderRadius: '8px' }}
                        />
                        <Bar dataKey="faults" radius={[4, 4, 0, 0]}>
                            {analytics.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={
                                    entry.name === 'Optimal' ? '#10B981' :
                                        entry.name === 'LRU' ? '#6366F1' :
                                            '#F43F5E'
                                } />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
