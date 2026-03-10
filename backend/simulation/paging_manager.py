import math

class PagingManager:
    def __init__(self, memory_size: int, page_size: int):
        self.memory_size = memory_size
        self.page_size = page_size
        self.num_frames = memory_size // page_size
        self.offset_bits = int(math.log2(page_size))

    def get_page_number(self, logical_address: int) -> int:
        return logical_address >> self.offset_bits

    def get_offset(self, logical_address: int) -> int:
        mask = (1 << self.offset_bits) - 1
        return logical_address & mask

    def get_physical_address(self, frame_number: int, offset: int) -> int:
        return (frame_number << self.offset_bits) | offset
