const express = require('express');
const axios = require('axios');
const SnapTikClient = require('./SnapTikClient');
const app = express();
const port = 3000;
const cors = require('cors');

const corsOptions = {
    origin: 'https://tiktok-downloader.saithg04.work',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };  

app.use(cors(corsOptions));
app.use(express.json());

app.post('/download', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: "Por favor, proporcione una URL válida de TikTok" });
    }

    try {
        let cleanedUrl = url;
        if (url.includes('vm.tiktok.com')) {
            cleanedUrl = await resolveMobileUrl(url);
        }

        cleanedUrl = limpiarUrl(cleanedUrl);

        const client = new SnapTikClient();
        const result = await client.process(cleanedUrl);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al procesar el video: " + error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

function limpiarUrl(url) {
    const parsedUrl = new URL(url);

    parsedUrl.searchParams.delete('is_from_webapp');
    parsedUrl.searchParams.delete('sender_device');

    return parsedUrl.toString();
}

async function resolveMobileUrl(url) {
    try {
        const response = await axios.get(url, {
            maxRedirects: 0,
            validateStatus: (status) => status >= 300 && status < 400
        });

        const finalUrl = response.headers.location;

        if (finalUrl) {
            return finalUrl;
        } else {
            throw new Error("No se pudo obtener la URL final del video.");
        }
    } catch (error) {
        console.error('Error al resolver la URL móvil:', error.message);
        throw error;
    }
}