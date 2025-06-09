# Documentación API Boxware

Este proyecto contiene la documentación de la API de Boxware.

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── ApiUrl.astro       # Componente para mostrar URLs de API
│   ├── constants/
│   │   └── apiConfig.ts       # Configuración de la URL base
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── ...                # Páginas de documentación de API
├── scripts/
│   └── update-api-urls.js     # Script para actualizar URLs en páginas
└── package.json
```

## 🧞 Comandos

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/`  |
| `npm run preview`         | Previsualiza la construcción localmente          |
| `npm run update-api-urls` | Actualiza todas las URLs de API para usar el componente ApiUrl |

## Componente ApiUrl

Se ha implementado un componente global para gestionar las URLs de la API. Esto permite cambiar la URL base (por ejemplo, de `localhost:3000` a una URL de producción) en un solo lugar, y que se actualice automáticamente en todas las páginas de documentación.

### Cómo usar el componente ApiUrl

El componente ApiUrl se puede usar de la siguiente manera:

```astro
<ApiUrl endpoint="/usuarios" tag="code" />
```

Parámetros:
- `endpoint`: La ruta del endpoint, sin la URL base (por ejemplo, `/usuarios` o `/usuarios/:id_usuario`)
- `tag`: El tipo de etiqueta HTML a utilizar. Puede ser `code`, `h3`, `p` o `span`. Por defecto es `code`.
- `showFull`: Si es `true`, muestra la URL completa (con la URL base); si es `false`, solo muestra el endpoint. Por defecto es `true`.
- `className`: Clases adicionales para el elemento.

### Configuración de la URL base

La URL base se configura en el archivo `src/constants/apiConfig.ts`:

```typescript
export const API_BASE_URL = 'http://localhost:3000';
```

Para cambiar la URL base en todo el proyecto, solo necesitas modificar este valor.

## Actualización automática de las páginas

Se ha creado un script para actualizar automáticamente todas las páginas de documentación de la API para usar el componente ApiUrl en lugar de URLs hardcodeadas.

Para ejecutar el script:

```bash
npm run update-api-urls
```

Este script:
1. Busca todas las páginas de documentación de la API
2. Agrega la importación del componente ApiUrl si no existe
3. Reemplaza todas las URLs hardcodeadas por el componente ApiUrl
