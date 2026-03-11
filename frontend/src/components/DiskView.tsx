"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiskView({ referenceString, currentIndex }: { referenceString: number[], currentIndex: number }) {
    // Show max 10 upcoming pages
    const upcomingPages = referenceString.slice(currentIndex + 1, currentIndex + 11);

    return (
        <div className="flex flex-col gap-4 mt-8 w-full max-w-4xl border-t border-black/10 dark:border-white/10 pt-8">
            <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                Storage
            </h3>

            <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {upcomingPages.length === 0 ? (
                        <div className="text-gray-500 italic text-sm py-4">No more pages in reference string</div>
                    ) : (
                        upcomingPages.map((page, i) => (
                            <motion.div
                                layout
                                key={`${page}-${currentIndex + 1 + i}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                className="flex items-center justify-center min-w-[3rem] h-12 bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-none font-bold relative"
                            >
                                P{page}
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
