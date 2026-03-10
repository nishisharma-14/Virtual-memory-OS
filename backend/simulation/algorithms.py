class FIFOAlgorithm:
    def __init__(self):
        self.queue = []

    def replace_page(self, page_table, frame_table, new_page_number, time_step):
        # FIFO replaces the oldest page added to memory
        # We need to find the page with the smallest loaded_at time
        oldest_page = -1
        min_time = float('inf')
        target_frame = -1

        for frame_index, page_num in enumerate(frame_table.frames):
            if page_num is not None:
                entry = page_table.get_entry(page_num)
                if entry.loaded_at < min_time:
                    min_time = entry.loaded_at
                    oldest_page = page_num
                    target_frame = frame_index

        # Invalidate old page
        if oldest_page != -1:
            old_entry = page_table.get_entry(oldest_page)
            old_entry.is_valid = False
            old_entry.frame_number = -1

        # Setup new page
        new_entry = page_table.get_entry(new_page_number)
        new_entry.is_valid = True
        new_entry.frame_number = target_frame
        new_entry.loaded_at = time_step
        new_entry.last_accessed = time_step

        frame_table.update_frame(target_frame, new_page_number)
        return oldest_page, target_frame


class LRUAlgorithm:
    def replace_page(self, page_table, frame_table, new_page_number, time_step):
        # LRU replaces the page with the smallest last_accessed time
        lru_page = -1
        min_time = float('inf')
        target_frame = -1

        for frame_index, page_num in enumerate(frame_table.frames):
            if page_num is not None:
                entry = page_table.get_entry(page_num)
                if entry.last_accessed < min_time:
                    min_time = entry.last_accessed
                    lru_page = page_num
                    target_frame = frame_index

        # Invalidate old page
        if lru_page != -1:
            old_entry = page_table.get_entry(lru_page)
            old_entry.is_valid = False
            old_entry.frame_number = -1

        # Setup new page
        new_entry = page_table.get_entry(new_page_number)
        new_entry.is_valid = True
        new_entry.frame_number = target_frame
        new_entry.loaded_at = time_step
        new_entry.last_accessed = time_step

        frame_table.update_frame(target_frame, new_page_number)
        return lru_page, target_frame


class OptimalAlgorithm:
    def __init__(self, reference_string):
        self.reference_string = reference_string

    def replace_page(self, page_table, frame_table, new_page_number, time_step):
        # Optimal replaces the page that will not be used for the longest period of time
        # We look ahead in the reference string from the current time_step
        future_references = self.reference_string[time_step:]
        
        farthest_page = -1
        max_dist = -1
        target_frame = -1

        for frame_index, page_num in enumerate(frame_table.frames):
            if page_num is not None:
                if page_num not in future_references:
                    # This page is never used again, perfect candidate
                    farthest_page = page_num
                    target_frame = frame_index
                    break
                else:
                    dist = future_references.index(page_num)
                    if dist > max_dist:
                        max_dist = dist
                        farthest_page = page_num
                        target_frame = frame_index

        # Invalidate old page
        if farthest_page != -1:
            old_entry = page_table.get_entry(farthest_page)
            old_entry.is_valid = False
            old_entry.frame_number = -1

        # Setup new page
        new_entry = page_table.get_entry(new_page_number)
        new_entry.is_valid = True
        new_entry.frame_number = target_frame
        new_entry.loaded_at = time_step
        new_entry.last_accessed = time_step

        frame_table.update_frame(target_frame, new_page_number)
        return farthest_page, target_frame
