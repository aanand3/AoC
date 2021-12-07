bool inflight = false;
size_t inflight_cycles = 0;
word_t inflight_pos = 0;

static 
mem_status_t access_memory(mem_t m, uword_t pos, operation_t operation, size_t size) {
    size_t B = pow(2, cache->b);
    uword_t current_address = pos; 
    for (size_t i = 0; i < size; i++) {
        if (!check_hit(cache, current_address, operation)) {
            uword_t block_address = current_address & ~(B-1);
            if(inflight_pos != block_address || !inflight) {
                inflight_pos = block_address;
                inflight_cycles = cache->d;
                inflight = true;
            }
            inflight_cycles--;
            if(inflight_cycles > 0) return IN_FLIGHT;
            inflight = false;
            void *block = calloc(B, 1);
            read_block(m, block_address, block);
            evicted_line_t *evicted = handle_miss(cache, block_address, operation, block);
            if (evicted->valid && evicted->dirty) 
                write_block(m, evicted->addr & ~(B-1), evicted->data);
            free(block); free(evicted->data); free(evicted);
        }
        current_address++;
    }
    return READY;
}

mem_status_t get_word_val_D(mem_t m, word_t pos, word_t *dest) {
    if (pos < 0 || pos + 8 > m->len) return ERROR;
    mem_status_t status = access_memory(m, pos, READ, sizeof(word_t));
    if(status == READY) get_word_cache(cache, pos, dest);
    return status;
}

