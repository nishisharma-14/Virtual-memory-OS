"use client";

import React, { useState } from 'react';
import InputPanel from '@/components/InputPanel';
import MemoryGrid from '@/components/MemoryGrid';
import DiskView from '@/components/DiskView';
import AlgorithmComparison from '@/components/AlgorithmComparison';
import { Play, Pause, FastForward, RotateCcw } from 'lucide-react';

export default function Dashboard() {
    const [config, setConfig] = useState({
        memory_size: 32,
        page_size: 4,
        frames: 8,
        reference_string: [7, 0, 1, 2, 0, 3, 0, 4],
        algorithms: ["FIFO"]
    });

    const [simulationState, setSimulationState] = useState<{
        steps: any[],
        analytics: any[],
        currentStepIndex: number,
        isPlaying: boolean,
        hasStarted: boolean
    }>({
        steps: [],
        analytics: [],
        currentStepIndex: -1,
        isPlaying: false,
        hasStarted: false
    });

    const runSimulation = async () => {
        try {
            const res = await fetch("https://virtual-memory-backend.onrender.com/api/simulate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config)
            });
            const data = await res.json();
            setSimulationState(prev => ({ ...prev, steps: data.steps, analytics: data.analytics, currentStepIndex: 0, hasStarted: true, isPlaying: false }));
        } catch (err) {
            console.error(err);
            alert("Failed to connect to simulation engine. Is the backend running?");
        }
    };

    const nextStep = () => {
        setSimulationState(prev => {
            if (prev.currentStepIndex < prev.steps.length - 1) {
                return { ...prev, currentStepIndex: prev.currentStepIndex + 1 };
            }
            return { ...prev, isPlaying: false };
        });
    };

    const togglePlay = () => {
        setSimulationState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    };

    const reset = () => {
        setSimulationState({ steps: [], analytics: [], currentStepIndex: -1, isPlaying: false, hasStarted: false });
    };

    // Basic play loop effect
    React.useEffect(() => {
        let interval: any;
        if (simulationState.isPlaying && simulationState.currentStepIndex < simulationState.steps.length - 1) {
            interval = setInterval(() => {
                nextStep();
            }, 1000);
        } else if (simulationState.currentStepIndex >= simulationState.steps.length - 1) {
            setSimulationState(prev => ({ ...prev, isPlaying: false }));
        }
        return () => clearInterval(interval);
    }, [simulationState.isPlaying, simulationState.currentStepIndex, simulationState.steps.length]);


    const currentStep = simulationState.currentStepIndex >= 0 ? simulationState.steps[simulationState.currentStepIndex] : null;

    // Calculate cumulative hits/faults
    let cumulativeHits = 0;
    let cumulativeFaults = 0;
    if (simulationState.currentStepIndex >= 0) {
        for (let i = 0; i <= simulationState.currentStepIndex; i++) {
            if (simulationState.steps[i].is_fault) cumulativeFaults++;
            else cumulativeHits++;
        }
    }

    const activeFrames = currentStep ? currentStep.frames_state : Array(config.frames).fill(null);

    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 md:p-12 font-sans selection:bg-black/10 dark:selection:bg-white/10">

            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <header className="flex flex-col gap-2 border-b border-black/10 dark:border-white/10 pb-6 mb-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Virtual Memory OS
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Interactive visualization of operating system memory management, page faults, and replacement algorithms.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex flex-col gap-4 w-full lg:w-auto">
                        <InputPanel config={config} setConfig={setConfig} />

                        <div className="bg-white dark:bg-black border border-black dark:border-white p-6 rounded-none flex flex-col gap-4">
                            {!simulationState.hasStarted ? (
                                <button
                                    onClick={runSimulation}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-4 rounded-none transition-colors hover:opacity-80 flex items-center justify-center gap-2"
                                >
                                    <Play size={18} /> Generate Simulation
                                </button>
                            ) : (
                                <div className="grid grid-cols-3 gap-2">
                                    <button onClick={togglePlay} className="bg-transparent text-black dark:text-white border border-black dark:border-white rounded-none py-3 flex items-center justify-center transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                                        {simulationState.isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                    </button>
                                    <button onClick={nextStep} disabled={simulationState.currentStepIndex >= simulationState.steps.length - 1} className="bg-black dark:bg-white text-white dark:text-black rounded-none py-3 flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-30 disabled:hover:opacity-30">
                                        <FastForward size={20} />
                                    </button>
                                    <button onClick={reset} className="bg-transparent text-black dark:text-white border border-black dark:border-white rounded-none py-3 flex items-center justify-center transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                                        <RotateCcw size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {simulationState.hasStarted && currentStep && (
                            <div className="bg-gray-100 dark:bg-gray-900 border border-black/10 dark:border-white/10 p-4 rounded-none">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Incoming Request</p>
                                <p className="text-3xl font-black">Page {currentStep.page}</p>
                                {currentStep.is_fault ? (
                                    <p className="text-black dark:text-white text-sm mt-1 font-medium bg-gray-200 dark:bg-gray-800 inline-block px-2 py-1 rounded-sm">Not found in memory. Triggering fault handler.</p>
                                ) : (
                                    <p className="text-black dark:text-white text-sm mt-1 font-medium bg-gray-200 dark:bg-gray-800 inline-block px-2 py-1 rounded-sm">Page hit! Already in physical memory.</p>
                                )}
                            </div>
                        )}

                        {simulationState.hasStarted && simulationState.analytics.length > 0 && (
                            <AlgorithmComparison analytics={simulationState.analytics} />
                        )}
                    </div>

                    <div className="flex-1 w-full bg-white dark:bg-black rounded-none p-8 border border-black/20 dark:border-white/20 overflow-hidden min-h-[600px]">
                        {simulationState.hasStarted ? (
                            <div className="flex flex-col gap-8">
                                <MemoryGrid
                                    frames={activeFrames}
                                    pageHits={cumulativeHits}
                                    pageFaults={cumulativeFaults}
                                    faultIndicator={currentStep?.is_fault || false}
                                    replacedPage={currentStep?.replaced_page ?? null}
                                />
                                <DiskView
                                    referenceString={config.reference_string}
                                    currentIndex={simulationState.currentStepIndex}
                                />
                            </div>
                        ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 gap-4">
                                <RotateCcw size={48} className="animate-spin-slow opacity-50" />
                                <p className="text-xl font-medium tracking-wide">Configure memory and generate simulation to begin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
