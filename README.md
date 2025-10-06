# Talento Sostenible

Una plataforma digital innovadora que ofrece soluciones personalizables en gestión del talento, marketing estratégico y ciberseguridad para PYMES.

## Requisitos Previos

-   [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
-   [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd talento-sostenible
    ```

2.  **Crea el archivo de entorno:**
    Copia el archivo de ejemplo `.env.example` y renómbralo a `.env`.
    ```bash
    cp .env.example .env
    ```
    Abre el archivo `.env` y añade tu clave de API de Google Gemini:
    ```
    VITE_API_KEY=TU_API_KEY_DE_GEMINI
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
    o si usas yarn:
    ```bash
    yarn
    ```

## Uso

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```
o si usas yarn:
```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo de Vite.
-   `npm run build`: Compila la aplicación para producción en la carpeta `dist`.
-   `npm run preview`: Sirve la build de producción localmente.
