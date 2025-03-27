export default function manifest() {
  return {
    name: 'U-Reserve',
    short_name: 'U-Reserve',
    description: 'Create and manage by kelompok 1',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}