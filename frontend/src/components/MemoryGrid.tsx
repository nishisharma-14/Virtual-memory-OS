"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryGrid({ frames, pageHits, pageFaults, faultIndicator, replacedPage }: { frames: (number | null)[], pageHits: number, pageFaults: number, faultIndicator: boolean, replacedPage: number | null }) {

    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl">
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-6 rounded-none border border-black/10 dark:border-white/10">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Page Hits</span>
                    <span className="text-4xl font-bold">{pageHits}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Page Faults</span>
                    <span className="text-4xl font-bold">{pageFaults}</span>
                </div>
            </div>

            <div className="flex gap-4 items-center border-b border-black/10 dark:border-white/10 pb-4">
                <h3 className="text-2xl font-bold uppercase tracking-wider">Physical Memory</h3>
                <AnimatePresence>
                    {faultIndicator && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-sm font-bold rounded-none flex items-center gap-2 uppercase tracking-widest"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-white dark:bg-black opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white dark:bg-black"></span>
                            </span>
                            FAULT
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
                            className={`relative flex flex-col items-center justify-center p-6 rounded-none border-2 transition-colors ${page !== null
                                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                                    : 'bg-transparent border-gray-300 dark:border-gray-700 border-dashed text-black dark:text-white'
                                }`}
                        >
                            <span className={`absolute top-2 left-3 text-xs font-mono opacity-50`}>F{index}</span>
                            {page !== null ? (
                                <span className="text-3xl font-black tracking-tighter">P{page}</span>
                            ) : (
                                <span className="text-sm opacity-50 font-medium uppercase">Empty</span>
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
                        className="text-sm font-medium mt-2 bg-gray-100 dark:bg-gray-900 border border-black/20 dark:border-white/20 p-3 rounded-none inline-block w-max text-black dark:text-white"
                    >
                        Evicted Page: <span className="font-mono font-bold">P{replacedPage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
