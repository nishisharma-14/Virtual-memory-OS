"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryGrid({ frames, pageHits, pageFaults, faultIndicator, replacedPage }: { frames: (number | null)[], pageHits: number, pageFaults: number, faultIndicator: boolean, replacedPage: number | null }) {

    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl">
            <div className="flex justify-between items-center bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Page Hits</span>
                    <span className="text-4xl font-bold text-emerald-400">{pageHits}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Page Faults</span>
                    <span className="text-4xl font-bold text-rose-400">{pageFaults}</span>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <h3 className="text-2xl font-bold text-white">Physical Memory (RAM)</h3>
                <AnimatePresence>
                    {faultIndicator && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-rose-500/20 text-rose-400 border border-rose-500/50 px-3 py-1 text-sm font-bold rounded-full flex items-center gap-2"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                            PAGE FAULT
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <AnimatePresence mode="popLayout">
                    {frames.map((page, index) => (
                        <motion.div
                            layout
                            key={page !== null ? `page-${page}` : `empty-${index}`}
                            initial={{ opacity: 0, scale: 0.5, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-colors ${page !== null
                                    ? 'bg-indigo-900/30 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                    : 'bg-gray-800/30 border-gray-700 border-dashed'
                                }`}
                        >
                            <span className="absolute top-2 left-3 text-xs text-gray-500 font-mono">Frame {index}</span>
                            {page !== null ? (
                                <span className="text-3xl font-black text-white mix-blend-screen tracking-tighter">P{page}</span>
                            ) : (
                                <span className="text-sm text-gray-600 font-medium">Empty</span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {replacedPage !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-gray-400 mt-2 bg-gray-800/50 p-3 rounded-lg border border-gray-700 inline-block w-max"
                    >
                        Evicted Page: <span className="font-mono text-rose-300">P{replacedPage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
