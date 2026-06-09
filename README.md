# ⚡ Axiom Stream-Crypt

The Sovereignty Token & Payload Shaper — Limpia, comprime y anonimiza tus prompts antes de enviarlos a cualquier API de IA. Todo 100% local, sin filtraciones, sin costes ocultos.

## 🎯 ¿Qué hace?

- **Compresión semántica:** Reduce el tamaño de tus prompts entre un 25-40% eliminando redundancias sin perder significado.
- **Anonimización inteligente:** Detecta automáticamente emails, IPs, contraseñas y palabras clave personalizadas, reemplazándolas por máscaras seguras `[AXIOM_...]`.
- **Restauración reversible:** Cuando la API te devuelve una respuesta, puedes desofuscarla para recuperar los datos originales.
- **Estadísticas en tiempo real:** Muestra el ahorro estimado en tokens y el número de datos protegidos.

## 🔥 ¿Por qué usarlo?

- **Ahorro económico:** Menos tokens = menos gasto en APIs de IA.
- **Privacidad soberana:** Tus datos sensibles nunca salen de tu navegador sin anonimizarse.
- **Sin dependencias:** Todo corre localmente, no necesitas instalar nada.

## 💼 Versión Enterprise

¿Necesitas automatizar la anonimización en toda tu infraestructura? La versión premium es un **Proxy Gateway nativo en Rust** que se despliega en tus servidores y procesa todas las peticiones a APIs de IA en tiempo real.

➡️ [Contacta con Axiom Systems](https://axiom-systemstech.github.io/axiom-systems/)

## 📁 Estructura del proyecto
axiom-stream-crypt/
├── index.html # Interfaz principal
├── manifest.json # PWA manifest
├── sw.js # Service Worker (offline)
├── stream-crypt-core.js # Motor (compresión + anonimización)
├── stream-crypt-ui.js # UI y eventos
├── README.md
└── assets/
└── favicon.png

## 🚀 Demo en vivo

[https://axiom-systemstech.github.io/axiom-stream-crypt/](https://axiom-systemstech.github.io/axiom-stream-crypt/)

## 📄 Licencia

Uso público gratuito. Versión enterprise bajo acuerdo comercial.
