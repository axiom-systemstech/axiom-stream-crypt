# ⚡ Axiom Stream-Crypt

**The Sovereignty Token & Payload Shaper**

Limpia, comprime y anonimiza tus prompts antes de enviarlos a cualquier API de IA. Todo local. Cero filtraciones.

[![Demo](https://img.shields.io/badge/demo-live-00e5ff)](https://axiom-systemstech.github.io/axiom-stream-crypt/)
[![Rust](https://img.shields.io/badge/rust-1.85+-orange)](https://www.rust-lang.org/)
[![License](https://img.shields.io/badge/license-open--source-green)](LICENSE)

## 🎯 ¿Qué hace?

| Característica | Descripción |
|----------------|-------------|
| **Compresión semántica** | Reduce el tamaño de tus prompts entre un 25-40% |
| **Anonimización** | Detecta emails, IPs, API keys y las enmascara |
| **Protección personalizada** | Define tus propias palabras clave |
| **Restauración** | Recupera los datos originales de la respuesta |
| **Modo API** | Servidor web en Rust para integración empresarial |
| **Modo consola** | Interfaz táctil para uso local |

## 🚀 Demo en vivo

[https://axiom-systemstech.github.io/axiom-stream-crypt/](https://axiom-systemstech.github.io/axiom-stream-crypt/)

## 💻 Uso rápido (web)

1. Abre la demo
2. Pega tu prompt o código
3. Haz clic en "Optimizar y Anonimizar"
4. Copia el payload limpio
5. Envía a tu API de IA favorita

## 🦀 Motor Rust (para empresas)

El mismo motor, pero empaquetado como:

- **Servidor API** (Axum + Tokio) para integrar en tu infraestructura
- **Proxy Gateway** que filtra todas las peticiones automáticamente

```bash
docker run -p 8080:8080 axiom-stream-crypt:latestVersión enterprise bajo acuerdo comercial.
