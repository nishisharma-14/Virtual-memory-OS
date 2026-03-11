"use client";

import React from 'react';

export default function InputPanel({ config, setConfig }: { config: any, setConfig: any }) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vals = e.target.value.split(/[,\s]+/).map(v => parseInt(v.trim())).filter(v => !isNaN(v));
    setConfig((prev: any) => ({ ...prev, reference_string: vals }));
  };

  return (
    <div className="bg-white dark:bg-black border border-black dark:border-white p-6 rounded-none w-full max-w-sm flex flex-col gap-6">
      <h2 className="text-xl font-bold text-black dark:text-white uppercase tracking-wider">
        Configuration
      </h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Memory Size (KB)</label>
        <input 
          type="number" name="memory_size" value={config.memory_size} onChange={handleInputChange}
          className="bg-transparent border border-black/20 dark:border-white/20 rounded-none p-2 text-black dark:text-white focus:border-black focus:dark:border-white outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Page Size (KB)</label>
        <input 
          type="number" name="page_size" value={config.page_size} onChange={handleInputChange}
          className="bg-transparent border border-black/20 dark:border-white/20 rounded-none p-2 text-black dark:text-white focus:border-black focus:dark:border-white outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Number of Frames</label>
        <input 
          type="number" name="frames" value={config.frames} onChange={handleInputChange}
          className="bg-transparent border border-black/20 dark:border-white/20 rounded-none p-2 text-black dark:text-white focus:border-black focus:dark:border-white outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Page Reference String</label>
        <input 
          type="text" placeholder="e.g. 7 0 1 2 0 3 0 4" defaultValue={config.reference_string.join(" ")} onChange={handleArrayChange}
          className="bg-transparent border border-black/20 dark:border-white/20 rounded-none p-2 text-black dark:text-white focus:border-black focus:dark:border-white outline-none transition-all font-mono text-sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Algorithm</label>
        <select 
          name="algorithms" value={config.algorithms[0]} onChange={(e) => setConfig((prev: any) => ({ ...prev, algorithms: [e.target.value] }))}
          className="bg-transparent border border-black/20 dark:border-white/20 rounded-none p-2 text-black dark:text-white focus:border-black focus:dark:border-white outline-none transition-all"
        >
          <option value="FIFO">First In First Out (FIFO)</option>
          <option value="LRU">Least Recently Used (LRU)</option>
          <option value="Optimal">Optimal</option>
        </select>
      </div>
    </div>
  );
}
