# MetalShow

Conciertos de metal, metalcore, deathcore, punk y rock en España. Aplicación 100% frontend (React + TypeScript + Sass) que consume la [Ticketmaster Discovery API](https://developer.ticketmaster.com/) directamente desde el navegador.

## Puesta en marcha

1. Copia `.env.example` a `.env.local` y añade tu API key gratuita de Ticketmaster:

   ```
   VITE_TICKETMASTER_API_KEY=tu_api_key
   ```

2. Instala dependencias y arranca el servidor de desarrollo:

   ```
   npm install
   npm run dev
   ```

## Scripts

- `npm run dev` — servidor de desarrollo con HMR.
- `npm run build` — type-check (`tsc -b`) y build de producción con Vite.
- `npm run preview` — sirve el build de producción localmente.
- `npm run lint` — linting con oxlint.
- `npm run test` — tests con Vitest (React Testing Library + MSW).

## Stack

React 19, TypeScript, Vite, Sass (CSS Modules), TanStack Query, Zustand (favoritos persistidos en `localStorage`), React Router, Vitest + Testing Library + MSW.

## Despliegue

Pensada para Vercel: configura `VITE_TICKETMASTER_API_KEY` como variable de entorno del proyecto y despliega — no requiere backend propio.
