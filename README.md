# Invitación · Juber & Judit (65 & 60)

Invitación digital para los cumpleaños de Juber y Judit — martes 01 de diciembre de 2026, 5:00 p.m., Casa Real Eventos (Cusco).

**URL publicada:** https://invitard.github.io/birthday_juber_and_judit_2026-12-01/

## Desarrollo

```sh
npm install
npx astro dev --background   # http://localhost:4321/birthday_juber_and_judit_2026-12-01/
npx astro dev stop
npm run build                # genera ./dist
```

## Despliegue automático (GitHub Pages)

Cada `push` a `main` ejecuta `.github/workflows/deploy.yml`, que compila con Astro y publica en GitHub Pages.

Configuración única del repositorio en GitHub:

1. Crear el repositorio `Invitard/birthday_juber_and_judit_2026-12-01` (público).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. `git push -u origin main`.

> El nombre del repositorio debe coincidir con `base` en `astro.config.mjs`. Si cambias uno, cambia el otro.

## Contenido editable

| Qué | Dónde |
| --- | --- |
| Foto de la pareja | `public/img/pareja.jpg` (vertical 4:5) |
| Fotos del carrusel | `public/img/galeria/foto-1.jpg` … `foto-6.jpg` (vertical 4:5) |
| Canción | `public/mp3/celebration.mp3` |
| Imagen al compartir (WhatsApp) | `public/img/og-juber-judit.jpg` (1200×630) |
| Teléfono de confirmación | `src/components/RsvpSection.astro` |
| Textos y secciones | `src/pages/index.astro` |
