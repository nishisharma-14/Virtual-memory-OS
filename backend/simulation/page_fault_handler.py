from simulation.memory_manager import PageTable, FrameTable

class PageFaultHandler:
    def __init__(self, num_frames: int):
        self.page_table = PageTable()
        self.frame_table = FrameTable(num_frames)
        self.page_faults = 0
        self.page_hits = 0
        self.time_step = 0

    def handle_request(self, page_number: int, algorithm) -> dict:
        self.time_step += 1
        entry = self.page_table.get_entry(page_number)

        is_fault = not entry.is_valid
        replaced_page = None
        allocated_frame = -1

        if is_fault:
            self.page_faults += 1
            if not self.frame_table.is_full():
                # Allocate a free frame
                allocated_frame = self.frame_table.allocate_frame(page_number)
                entry.frame_number = allocated_frame
                entry.is_valid = True
                entry.loaded_at = self.time_step
                entry.last_accessed = self.time_step
            else:
                # Trigger Page Replacement
                replaced_page, allocated_frame = algorithm.replace_page(self.page_table, self.frame_table, page_number, self.time_step)
        else:
            self.page_hits += 1
            allocated_frame = entry.frame_number
            entry.last_accessed = self.time_step

        return {
            "page": page_number,
            "is_fault": is_fault,
            "frame": allocated_frame,
            "replaced_page": replaced_page,
            "frames_state": list(self.frame_table.frames)
        }
