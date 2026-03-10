from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from models import SimulationRequest

app = FastAPI(title="Virtual Memory Sim API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Virtual Memory Simulation Engine is running"}

@app.post("/api/simulate")
def run_simulation(req: SimulationRequest):
    from simulation.algorithms import FIFOAlgorithm, LRUAlgorithm, OptimalAlgorithm
    from simulation.page_fault_handler import PageFaultHandler

    # Determine algorithm
    algo = None
    if "FIFO" in req.algorithms: algo = FIFOAlgorithm()
    elif "LRU" in req.algorithms: algo = LRUAlgorithm()
    else: algo = OptimalAlgorithm(req.reference_string)
    
    handler = PageFaultHandler(req.frames)
    steps = []
    
    for page in req.reference_string:
        result = handler.handle_request(page, algo)
        steps.append(result)

    # Generate analytics for comparison
    analytics = []
    for test_algo, name in [(FIFOAlgorithm(), "FIFO"), (LRUAlgorithm(), "LRU"), (OptimalAlgorithm(req.reference_string), "Optimal")]:
        test_h = PageFaultHandler(req.frames)
        for page in req.reference_string:
            test_h.handle_request(page, test_algo)
        analytics.append({"name": name, "faults": test_h.page_faults, "hits": test_h.page_hits})

    return {
        "memory_size": req.memory_size,
        "page_size": req.page_size,
        "total_faults": handler.page_faults,
        "total_hits": handler.page_hits,
        "steps": steps,
        "analytics": analytics
    }

@app.websocket("/ws/simulate")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    # Simple echo for now, a full simulation requires state holding
    await websocket.close()
