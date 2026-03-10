class PageTableEntry:
    def __init__(self, page_number: int):
        self.page_number = page_number
        self.frame_number = -1
        self.is_valid = False
        self.last_accessed = 0  # Useful for LRU
        self.loaded_at = 0      # Useful for FIFO

class PageTable:
    def __init__(self):
        self.entries = {}

    def get_entry(self, page_number: int) -> PageTableEntry:
        if page_number not in self.entries:
            self.entries[page_number] = PageTableEntry(page_number)
        return self.entries[page_number]

class FrameTable:
    def __init__(self, num_frames: int):
        self.num_frames = num_frames
        self.frames = [None] * num_frames  # None means empty frame, int means page_number
        self.free_frames = num_frames

    def is_full(self) -> bool:
        return self.free_frames == 0

    def allocate_frame(self, page_number: int) -> int:
        for i in range(self.num_frames):
            if self.frames[i] is None:
                self.frames[i] = page_number
                self.free_frames -= 1
                return i
        return -1

    def free_frame(self, frame_number: int):
        self.frames[frame_number] = None
        self.free_frames += 1

    def update_frame(self, frame_number: int, page_number: int):
        self.frames[frame_number] = page_number
