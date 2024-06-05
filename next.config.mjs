/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['hd2.tudocdn.net'], // Aggiungi il dominio dell'immagine qui
      },
      webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
      }
};

export default nextConfig;
