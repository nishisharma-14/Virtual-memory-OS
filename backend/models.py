from pydantic import BaseModel
from typing import List

class SimulationRequest(BaseModel):
    memory_size: int
    page_size: int
    frames: int
    reference_string: List[int]
    algorithms: List[str]
