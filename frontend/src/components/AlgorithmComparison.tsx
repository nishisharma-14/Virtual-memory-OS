"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

export default function AlgorithmComparison({ analytics }: { analytics: { name: string, faults: number, hits: number }[] }) {
    if (!analytics || analytics.length === 0) return null;

    return (
        <div className="bg-white dark:bg-black border border-black dark:border-white p-6 rounded-none w-full h-[300px] mt-8 flex flex-col gap-4">
            <h3 className="text-xl font-bold uppercase tracking-wider">Algorithm Performance (Faults)</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#888888" strokeOpacity={0.2} vertical={false} />
                        <XAxis dataKey="name" stroke="#888888" tick={{ fill: '#888888' }} />
                        <YAxis stroke="#888888" tick={{ fill: '#888888' }} allowDecimals={false} />
                        <Tooltip
                            cursor={{ fill: '#888888', opacity: 0.1 }}
                            contentStyle={{ backgroundColor: 'var(--tooltip-bg, #000)', borderColor: 'var(--tooltip-border, #111)', color: 'var(--tooltip-text, #fff)', borderRadius: '0px' }}
                        />
                        <Bar dataKey="faults" radius={[0, 0, 0, 0]}>
                            {analytics.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={
                                    entry.name === 'Optimal' ? '#666666' :
                                        entry.name === 'LRU' ? '#999999' :
                                            '#333333'
                                } />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
