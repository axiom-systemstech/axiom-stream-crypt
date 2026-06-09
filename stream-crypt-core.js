// ============================================
// AXION STREAM-CRYPT CORE v1.0
// Motor de compresión semántica, anonimización y restauración
// 100% local - Sin dependencias externas
// ============================================

const StreamCryptCore = (function() {
    // ---- 1. COMPRESOR SEMÁNTICO (elimina redundancias) ----
    function semanticCompress(text) {
        if (!text) return "";
        
        let compressed = text;
        
        // Eliminar espacios múltiples y saltos de línea redundantes
        compressed = compressed.replace(/\s+/g, ' ');
        
        // Eliminar conectores redundantes comunes (sin perder significado)
        const redundancies = [
            { pattern: /\b(en realidad)\b/gi, replacement: " " },
            { pattern: /\b(por supuesto que)\b/gi, replacement: " " },
            { pattern: /\b(como es el caso de)\b/gi, replacement: " " },
            { pattern: /\b(teniendo en cuenta que)\b/gi, replacement: " " },
            { pattern: /\b(a continuación se presenta)\b/gi, replacement: " " },
            { pattern: /\b(cabe destacar que)\b/gi, replacement: " " },
            { pattern: /\b(es importante mencionar que)\b/gi, replacement: " " }
        ];
        
        redundancies.forEach(r => {
            compressed = compressed.replace(r.pattern, r.replacement);
        });
        
        // Eliminar artículos redundantes (opcional, manteniendo legibilidad)
        compressed = compressed.replace(/\b(el|la|los|las|un|una|unos|unas)\s+(?=[a-zA-Záéíóúüñ])/gi, '');
        
        // Limpiar espacios dobles
        compressed = compressed.replace(/\s+/g, ' ').trim();
        
        return compressed;
    }
    
    // ---- 2. DETECCIÓN DE DATOS SENSIBLES (regex) ----
    const SENSITIVE_PATTERNS = [
        { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, type: "EMAIL" },
        { regex: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g, type: "IP" },
        { regex: /\b(?:[0-9a-fA-F]{2}[:-]){5}[0-9a-fA-F]{2}\b/gi, type: "MAC" },
        { regex: /\b[0-9]{15,19}\b/g, type: "CC_NUMBER" },
        { regex: /\b(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}\b/g, type: "POSSIBLE_PASSWORD" }
    ];
    
    // Palabras clave personalizadas del usuario
    let customProtectedWords = [];
    
    function setCustomWords(wordsArray) {
        customProtectedWords = wordsArray.filter(w => w.trim().length > 0);
    }
    
    // ---- 3. ANONIMIZADOR (reemplaza por máscaras) ----
    let maskMap = new Map(); // Almacena { mask -> original }
    let maskCounter = 0;
    
    function resetMasks() {
        maskMap.clear();
        maskCounter = 0;
    }
    
    function generateMask(type, index) {
        return `[AXIOM_${type}_${index}]`;
    }
    
    function anonymizeText(text, additionalWords = []) {
        resetMasks();
        let anonymized = text;
        const allProtected = [...additionalWords];
        
        // 1. Proteger palabras clave personalizadas
        for (let i = 0; i < allProtected.length; i++) {
            const word = allProtected[i];
            if (!word) continue;
            const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, 'gi');
            const mask = generateMask("CUSTOM", maskCounter++);
            let match;
            while ((match = regex.exec(anonymized)) !== null) {
                maskMap.set(mask, match[0]);
                anonymized = anonymized.replace(match[0], mask);
            }
        }
        
        // 2. Proteger patrones sensibles
        for (const pattern of SENSITIVE_PATTERNS) {
            let match;
            const regex = new RegExp(pattern.regex);
            while ((match = regex.exec(anonymized)) !== null) {
                const mask = generateMask(pattern.type, maskCounter++);
                maskMap.set(mask, match[0]);
                anonymized = anonymized.replace(match[0], mask);
            }
        }
        
        return anonymized;
    }
    
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // ---- 4. RESTAURADOR (devuelve los datos originales) ----
    function restoreText(anonymizedText) {
        let restored = anonymizedText;
        for (const [mask, original] of maskMap.entries()) {
            const regex = new RegExp(escapeRegex(mask), 'g');
            restored = restored.replace(regex, original);
        }
        return restored;
    }
    
    // ---- 5. CÁLCULO DE TOKENS SIMULADOS (aproximación realista) ----
    function estimateTokens(text) {
        if (!text) return 0;
        // Aproximación: 1 token ~ 4 caracteres para inglés/español
        return Math.ceil(text.length / 4);
    }
    
    // ---- 6. PROCESO COMPLETO (compresión + anonimización) ----
    function processPayload(original, customWordsString) {
        const customWords = customWordsString.split(/[ ,]+/).filter(w => w.trim().length > 0);
        setCustomWords(customWords);
        
        // Paso 1: Compresión semántica
        const compressed = semanticCompress(original);
        
        // Paso 2: Anonimización
        const anonymized = anonymizeText(compressed, customWords);
        
        // Cálculo de estadísticas
        const originalTokens = estimateTokens(original);
        const optimizedTokens = estimateTokens(anonymized);
        const savings = originalTokens > 0 ? ((originalTokens - optimizedTokens) / originalTokens * 100) : 0;
        
        return {
            optimizedPayload: anonymized,
            originalTokens: originalTokens,
            optimizedTokens: optimizedTokens,
            savingsPercent: Math.round(savings),
            maskCount: maskMap.size,
            maskMapping: Object.fromEntries(maskMap)
        };
    }
    
    // ---- 7. RESTAURAR RESPUESTA ----
    function restoreResponse(response) {
        return restoreText(response);
    }
    
    // ---- 8. OBTENER MAPPING ACTUAL (para depuración) ----
    function getCurrentMaskMapping() {
        return Object.fromEntries(maskMap);
    }
    
    // API pública
    return {
        processPayload,
        restoreResponse,
        getCurrentMaskMapping,
        estimateTokens
    };
})();

// Exponer globalmente
window.StreamCryptCore = StreamCryptCore;