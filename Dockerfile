# Stage 1: Build WASM
FROM rust:1.83 AS builder

# Install wasm target
RUN rustup target add wasm32-unknown-unknown

# Install wasm-bindgen-cli (specify version to avoid build issues)
RUN cargo install wasm-bindgen-cli --version 0.2.95

WORKDIR /app
COPY . .

# Configure for WASM build
RUN mkdir -p .cargo && echo '[target.wasm32-unknown-unknown]\nrustflags = ["--cfg", "getrandom_backend=\"wasm_js\""]' > .cargo/config.toml

# Build WASM (release)
RUN cargo build --release --target wasm32-unknown-unknown

# Generate JS bindings
RUN wasm-bindgen \
    --out-dir web \
    --target web \
    target/wasm32-unknown-unknown/release/chrysostom.wasm

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
