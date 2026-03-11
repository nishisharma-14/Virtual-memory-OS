# Virtual Memory OS Simulation - Backend

This is the backend simulation engine for the Virtual Memory OS project. It is built using Python and FastAPI, responsible for executing the core logic of page replacement algorithms and generating step-by-step state representations for the frontend UI.

## Features

- **Paging Algorithms:** Implements core OS algorithms including First In First Out (FIFO), Least Recently Used (LRU), and Optimal page replacement.
- **State Generation:** Instead of just returning final statistics, the backend generates discrete "steps" (snapshots of physical frame arrangements, hits, and faults) for the frontend to animate.
- **Analytics:** Calculates total hits, faults, and fault rates for the requested algorithms.

## Prerequisites

- Python 3.9+
- pip (Python package manager)

## Getting Started

1. Navigate to the `backend` directory.
2. (Optional but recommended) Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the required dependencies. Typically, this will include FastAPI and Uvicorn:
   ```bash
   pip install fastapi uvicorn pydantic
   ```
   *(Note: Verify your `requirements.txt` file if one exists for exact dependencies.)*

4. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

The API will start at `http://localhost:8000`.

## API Endpoints

### `POST /api/simulate`
Generates a simulation run based on memory parameters.

**Request Body Example:**
```json
{
  "memory_size": 32,
  "page_size": 4,
  "frames": 8,
  "reference_string": [7, 0, 1, 2, 0, 3, 0, 4],
  "algorithms": ["FIFO"]
}
```

**Response Overview:**
Returns JSON containing `steps` (the frame array state at each request in the reference string) and `analytics` object comparing algorithmic efficiency.
