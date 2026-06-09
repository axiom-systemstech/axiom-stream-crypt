// ============================================
// AXION STREAM-CRYPT UI v1.0
// Gestión de eventos, interfaz y actualizaciones
// ============================================

(function() {
    // Elementos del DOM
    const originalInput = document.getElementById('originalInput');
    const sensitiveWords = document.getElementById('sensitiveWords');
    const processBtn = document.getElementById('processBtn');
    const optimizedOutput = document.getElementById('optimizedOutput');
    const copyOptimizedBtn = document.getElementById('copyOptimizedBtn');
    const apiResponse = document.getElementById('apiResponse');
    const restoreBtn = document.getElementById('restoreBtn');
    const restoredOutput = document.getElementById('restoredOutput');
    
    // Elementos de estadísticas
    const originalTokensSpan = document.getElementById('originalTokens');
    const optimizedTokensSpan = document.getElementById('optimizedTokens');
    const savingsPercentSpan = document.getElementById('savingsPercent');
    const maskCountSpan = document.getElementById('maskCount');
    
    // Estado actual del payload procesado
    let currentOptimizedPayload = "";
    let currentMaskMapping = {};
    
    // Procesar el payload
    function processPayload() {
        const original = originalInput.value;
        if (!original.trim()) {
            optimizedOutput.innerText = "// No hay texto para procesar. Escribe o pega algo primero.";
            return;
        }
        
        const customWords = sensitiveWords.value;
        
        const result = StreamCryptCore.processPayload(original, customWords);
        
        currentOptimizedPayload = result.optimizedPayload;
        currentMaskMapping = result.maskMapping;
        
        // Mostrar resultado
        optimizedOutput.innerText = result.optimizedPayload;
        
        // Actualizar estadísticas
        originalTokensSpan.innerText = result.originalTokens;
        optimizedTokensSpan.innerText = result.optimizedTokens;
        savingsPercentSpan.innerText = `${result.savingsPercent}%`;
        maskCountSpan.innerText = result.maskCount;
        
        // Pequeño efecto visual
        optimizedOutput.style.borderLeft = "3px solid var(--accent-success)";
        setTimeout(() => { optimizedOutput.style.borderLeft = ""; }, 500);
    }
    
    // Copiar payload optimizado
    function copyOptimized() {
        if (!currentOptimizedPayload) {
            alert("Primero procesa un payload.");
            return;
        }
        navigator.clipboard.writeText(currentOptimizedPayload);
        copyOptimizedBtn.innerText = "✓ Copiado!";
        setTimeout(() => { copyOptimizedBtn.innerText = "📋 Copiar payload"; }, 2000);
    }
    
    // Restaurar respuesta de la API
    function restoreApiResponse() {
        const response = apiResponse.value;
        if (!response.trim()) {
            restoredOutput.innerText = "// Pega una respuesta de API que contenga máscaras [AXIOM_...] para restaurar.";
            return;
        }
        
        const restored = StreamCryptCore.restoreResponse(response);
        restoredOutput.innerText = restored;
        
        restoredOutput.style.borderLeft = "3px solid var(--accent-success)";
        setTimeout(() => { restoredOutput.style.borderLeft = ""; }, 500);
    }
    
    // Eventos
    processBtn.addEventListener('click', processPayload);
    copyOptimizedBtn.addEventListener('click', copyOptimized);
    restoreBtn.addEventListener('click', restoreApiResponse);
    
    // Procesar automático con debounce mientras se escribe (opcional)
    let debounceTimer;
    originalInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (originalInput.value.trim()) {
                processPayload();
            }
        }, 800);
    });
    
    // Tema oscuro/claro
    const themeToggle = document.getElementById('themeToggle');
    const htmlTag = document.documentElement;
    themeToggle.addEventListener('click', () => {
        const isDark = htmlTag.getAttribute('data-theme') === 'dark';
        htmlTag.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.innerText = isDark ? '☀️' : '🌙';
    });
    
    // Inicializar ejemplo de demostración
    function initDemo() {
        const exampleText = `Esto es un ejemplo de prompt con información sensible. Teniendo en cuenta que la API_KEY es "sk-abc123xyz456" y el correo electrónico del administrador es admin@axiom.systems. Es importante mencionar que la contraseña temporal es "TempPass2024!". Por supuesto que necesitamos proteger estos datos antes de enviarlos a OpenAI. En realidad esto es una demostración del compresor semántico.`;
        originalInput.value = exampleText;
        sensitiveWords.value = "API_KEY, contraseña temporal";
        processPayload();
    }
    
    // Si está vacío, poner demo
    if (!originalInput.value.trim()) {
        initDemo();
    }
})();