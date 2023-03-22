let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}
/**
*/
export const Cell = Object.freeze({ Start:0,"0":"Start",Goal:1,"1":"Goal",Obstacle:2,"2":"Obstacle", });
/**
*/
export class World {

    static __wrap(ptr) {
        const obj = Object.create(World.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_world_free(ptr);
    }
    /**
    * @returns {World}
    */
    static new() {
        const ret = wasm.world_new();
        return World.__wrap(ret);
    }
    /**
    */
    find() {
        wasm.world_find(this.ptr);
    }
    /**
    * @param {number} index
    * @returns {number}
    */
    h(index) {
        const ret = wasm.world_h(this.ptr, index);
        return ret;
    }
    /**
    * @param {number} index
    * @returns {number}
    */
    get_x(index) {
        const ret = wasm.world_get_x(this.ptr, index);
        return ret;
    }
    /**
    * @param {number} index
    * @returns {number}
    */
    get_y(index) {
        const ret = wasm.world_get_y(this.ptr, index);
        return ret;
    }
    /**
    * @param {number} row
    * @param {number} column
    * @returns {number}
    */
    get_index(row, column) {
        const ret = wasm.world_get_index(this.ptr, row, column);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    width() {
        const ret = wasm.world_width(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    height() {
        const ret = wasm.world_height(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    nodes() {
        const ret = wasm.world_nodes(this.ptr);
        return ret;
    }
    /**
    * @returns {string}
    */
    render() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.world_render(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
}

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

