const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Compteur de visites (simple)
let visitCounter = 0;

// Middleware pour logger chaque requête
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// Route principale
app.get('/', (req, res) => {
    visitCounter++;
    res.json({
        message: 'Bienvenue sur mon API CI/CD !',
        version: '1.0.0',
        visits: visitCounter,
        timestamp: new Date().toISOString()
    });
});

// Route de santé (health check)
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Route d'information
app.get('/info', (req, res) => {
    res.json({
        app: 'TP CI/CD Observability',
        student: 'VOTRE_NOM',  // Mettre votre nom ici
        environment: process.env.NODE_ENV || 'development'
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
    console.log(`🌐 URL locale: http://localhost:${PORT}`);
});