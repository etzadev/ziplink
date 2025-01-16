# ZipLink

![ZipLink Logo](https://res.cloudinary.com/dp2lig5va/image/upload/v1737005147/ZipLink_xpouyj.webp)

ZipLink es una herramienta fácil de usar para acortar enlaces largos. Con ZipLink, puedes transformar URLs extensas en enlaces cortos y memorables, perfectos para compartir en redes sociales, correos electrónicos, o cualquier otro medio.

## Características

- **Acortamiento de URLs:** Transforma URLs largas en enlaces cortos y fáciles de recordar.
- **Estadísticas de Enlaces:** Obtén información detallada sobre el rendimiento de tus enlaces, incluyendo clics y geolocalización.
- **Enlaces Personalizados:** Crea URLs personalizadas para mayor flexibilidad y branding.
- **Interfaz Intuitiva:** Diseño limpio y fácil de usar para una experiencia sin complicaciones.

## Instalación

Para instalar y configurar ZipLink en tu máquina local, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/etzadev/ziplink.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd ziplink
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y añade tus configuraciones:

   ```env
   VITE_SUPABASE_UR=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   VITE_BASE_URL=your_base_url
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abre tu navegador y navega a `http://localhost:5173` para ver la aplicación en acción.

## Uso

### Creación de Enlaces

1. Introduce la URL larga en el campo de entrada.
2. Haz clic en "Generar link corto".
3. Copia y comparte tu nuevo enlace corto.

### Estadísticas de Enlaces

1. Navega a la sección "Links".

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:

   ```bash
   git checkout -b feature/nueva-caracteristica
   ```

3. Realiza tus cambios y haz commit:

   ```bash
   git commit -m 'Añadir nueva característica'
   ```

4. Empuja a la rama:

   ```bash
   git push origin feature/nueva-caracteristica
   ```

5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más información.

## Contacto

Si tienes alguna pregunta, sugerencia o simplemente quieres decir hola, ¡contáctanos!

- **Email:** johan.garcia.dev@gmail.com
- **Twitter:** [@etzadev](https://x.com/etzadev)

---

¡Gracias por usar ZipLink! 🎉
