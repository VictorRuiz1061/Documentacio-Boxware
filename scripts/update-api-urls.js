/**
 * Script para actualizar todas las páginas de documentación de la API
 * para usar el componente ApiUrl en lugar de URLs hardcodeadas
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio de páginas
const PAGES_DIR = path.join(__dirname, '../src/pages');

// Función para actualizar un archivo
function updateFile(filePath) {
  console.log(`Procesando: ${filePath}`);
  
  // Leer el contenido del archivo
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Verificar si ya importa el componente ApiUrl
  if (!content.includes("import ApiUrl from")) {
    // Agregar la importación del componente ApiUrl
    content = content.replace(
      "import CopyButton from '../../components/CopyButton.astro';",
      "import CopyButton from '../../components/CopyButton.astro';\nimport ApiUrl from '../../components/ApiUrl.astro';"
    );
  }
  
  // Reemplazar las URLs hardcodeadas en la sección "URL Base"
  content = content.replace(
    /<code>http:\/\/localhost:3000\/([^<]+)<\/code>/g,
    '<ApiUrl endpoint="/$1" tag="code" />'
  );
  
  // Reemplazar las URLs hardcodeadas en los endpoints
  content = content.replace(
    /<h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">http:\/\/localhost:3000\/([^<]+)<\/h3>/g,
    '<ApiUrl endpoint="/$1" tag="h3" />'
  );
  
  // También reemplazar las URLs que no tienen el http:// al principio
  content = content.replace(
    /<h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">localhost:3000\/([^<]+)<\/h3>/g,
    '<ApiUrl endpoint="/$1" tag="h3" />'
  );
  
  // Guardar el archivo actualizado
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Actualizado: ${filePath}`);
}

// Función principal ejecutada inmediatamente
(async function main() {
  try {
    // Buscar todos los archivos index.astro en las carpetas de páginas de API
    const files = await glob(`${PAGES_DIR}/*/index.astro`);
    console.log(`Encontrados ${files.length} archivos para actualizar`);
    
    // Actualizar cada archivo
    files.forEach(file => {
      // Excluir archivos que no sean de API (como index.astro principal)
      if (!file.includes('src/pages/index.astro')) {
        updateFile(file);
      }
    });
    
    console.log('¡Proceso completado!');
  } catch (err) {
    console.error('Error al buscar archivos:', err);
  }
})(); 