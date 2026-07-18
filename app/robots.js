export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/', '/ai/', '/chat/', '/webhook/'],
        },
        sitemap: 'https://mtalha.me/sitemap.xml',
    };
}