#!/bin/bash
set -e

# Build WASM
cargo build --release --target wasm32-unknown-unknown

# Generate JS bindings with wasm-bindgen
wasm-bindgen \
    --out-dir web \
    --target web \
    target/wasm32-unknown-unknown/release/chrysostom.wasm

echo "WASM build complete! Files in web/"
