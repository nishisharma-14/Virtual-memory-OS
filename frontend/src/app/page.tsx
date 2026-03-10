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
            const res = await fetch("http://localhost:8000/api/simulate", {
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
        <main className="min-h-screen bg-gray-950 text-white p-6 md:p-12 font-sans selection:bg-indigo-500/30">

            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <header className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-br from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent">
                        Virtual Memory OS
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Interactive visualization of operating system memory management, page faults, and replacement algorithms.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex flex-col gap-4 w-full lg:w-auto">
                        <InputPanel config={config} setConfig={setConfig} />

                        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
                            {!simulationState.hasStarted ? (
                                <button
                                    onClick={runSimulation}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <Play size={18} /> Generate Simulation
                                </button>
                            ) : (
                                <div className="grid grid-cols-3 gap-2">
                                    <button onClick={togglePlay} className="bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-500/30 rounded-xl py-3 flex items-center justify-center transition-colors">
                                        {simulationState.isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                    </button>
                                    <button onClick={nextStep} disabled={simulationState.currentStepIndex >= simulationState.steps.length - 1} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl py-3 flex items-center justify-center transition-colors disabled:opacity-50">
                                        <FastForward size={20} />
                                    </button>
                                    <button onClick={reset} className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl py-3 flex items-center justify-center transition-colors">
                                        <RotateCcw size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {simulationState.hasStarted && currentStep && (
                            <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl">
                                <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-1">Incoming Request</p>
                                <p className="text-3xl font-black text-white">Page {currentStep.page}</p>
                                {currentStep.is_fault ? (
                                    <p className="text-rose-400 text-sm mt-1 font-medium">Not found in memory. Triggering fault handler.</p>
                                ) : (
                                    <p className="text-emerald-400 text-sm mt-1 font-medium">Page hit! Already in physical memory.</p>
                                )}
                            </div>
                        )}

                        {simulationState.hasStarted && simulationState.analytics.length > 0 && (
                            <AlgorithmComparison analytics={simulationState.analytics} />
                        )}
                    </div>

                    <div className="flex-1 w-full bg-gray-900/50 rounded-3xl p-8 border border-gray-800/50 shadow-inner overflow-hidden min-h-[600px]">
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
                            <div className="h-full w-full flex flex-col items-center justify-center text-gray-500 gap-4 opacity-50">
                                <RotateCcw size={48} className="animate-spin-slow" />
                                <p className="text-xl font-medium tracking-wide">Configure memory and generate simulation to begin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
