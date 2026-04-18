const ytdl = require('ytdl-core');

// Buscar un video (simulado, ytdl-core no tiene búsqueda nativa)
// En producción usarías la API de YouTube Data v3 (con key gratuita)
// Esta función es un placeholder: toma el primer resultado de una búsqueda ficticia
async function searchVideo(query) {
    // Como ytdl-core no busca, necesitas implementar con la API de YouTube.
    // Por ahora, asumimos que el usuario pasa una URL válida.
    // Si quieres búsqueda real, usa el paquete 'youtube-search' o la API oficial.
    throw new Error('La búsqueda por texto requiere API key de YouTube. Usa una URL directa o configura la API.');
}

async function getVideoInfo(url) {
    try {
        const info = await ytdl.getInfo(url);
        return {
            title: info.videoDetails.title,
            url: info.videoDetails.video_url,
            durationSeconds: info.videoDetails.lengthSeconds,
            thumbnail: info.videoDetails.thumbnails[0]?.url
        };
    } catch (err) {
        console.error('Error obteniendo info de YouTube:', err);
        return null;
    }
}

function validateUrl(url) {
    return ytdl.validateURL(url);
}

module.exports = { searchVideo, getVideoInfo, validateUrl };
