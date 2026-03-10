import sys
import os

# Ensure backend directory is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from simulation.page_fault_handler import PageFaultHandler
from simulation.algorithms import FIFOAlgorithm, LRUAlgorithm, OptimalAlgorithm

def run_test(name, algorithm, num_frames, reference_string):
    print(f"\n--- Running {name} ---")
    handler = PageFaultHandler(num_frames)
    
    for page in reference_string:
        result = handler.handle_request(page, algorithm)
        status = "FAULT" if result["is_fault"] else "HIT  "
        replaced = result["replaced_page"] if result["replaced_page"] is not None else "-"
        # Clean frames for printing
        frames_print = [p if p is not None else "-" for p in result["frames_state"]]
        print(f"Page {page} | {status} | Frames: {frames_print} | Replaced: {replaced}")
        
    print(f"Total Page Faults: {handler.page_faults}")
    return handler.page_faults

if __name__ == "__main__":
    # Test Case 1 from requirements
    # Frames: 3
    # Reference: 7 0 1 2 0 3 0 4
    # Expected FIFO: 6 faults
    
    ref_string = [7, 0, 1, 2, 0, 3, 0, 4]
    frames = 3
    
    print("Test Reference String:", ref_string)
    print("Frames:", frames)
    
    run_test("FIFO", FIFOAlgorithm(), frames, ref_string)
    run_test("LRU", LRUAlgorithm(), frames, ref_string)
    run_test("Optimal", OptimalAlgorithm(ref_string), frames, ref_string)
