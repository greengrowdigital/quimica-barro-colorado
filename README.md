# La química de Barro Colorado

Sitio del proyecto escolar del grupo de química sobre la gira académica a la **Isla Barro Colorado**, en el Lago Gatún, dentro del Canal de Panamá.

Todas las fotografías y el video fueron tomados por el grupo durante el recorrido. La información científica proviene del Instituto Smithsonian de Investigaciones Tropicales (STRI).

**Integrantes:** Vladimir Chandeck · Sofía Ochomoga · Nazia Jasat · Víctor Ramos · Rafael Liao

## Secciones

| Ruta | Contenido |
| --- | --- |
| `/` | Presentación del proyecto, historia de la isla y su importancia científica |
| `/quimica` | La química del ecosistema: agua, suelo, bosque, ciclo del agua y calidad ambiental |
| `/investigacion` | Investigación científica: monitoreo a largo plazo, instalaciones y conservación |
| `/evidencias` | Las diez paradas del recorrido, con fotografía propia y comentario científico |
| `/referencias` | Fuentes en formato APA 7 y créditos |

El sitio es bilingüe español / inglés, con el idioma guardado en `localStorage`.

## Stack

- Vite + React 19
- Tailwind CSS v4 (configuración en CSS, `src/styles/index.css`)
- React Router DOM
- Framer Motion para el hero, el encabezado y el visor de fotografías

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # compila a dist/
npm run preview  # sirve la compilación
```

## Estructura

```
src/
├── content/     # todos los textos, en español e inglés
├── components/  # hero, encabezado, pie, visor, piezas de cada página
├── pages/       # una por ruta
├── i18n/        # contexto de idioma
├── hooks/
└── styles/      # tokens de color, tipografía y motion
public/
├── img/         # fotografías de la gira (WebP, versión completa y miniatura)
└── media/       # video del recorrido
```

## Notas de diseño

- Paleta verde bosque profundo con acento **arcilla**, que es de donde viene el nombre de la isla: su suelo de arcilla rojiza.
- Tipografía: Bricolage Grotesque (títulos), Literata (lectura), Spline Sans Mono (notación química y coordenadas).
- Toda animación tiene alternativa para `prefers-reduced-motion`, y ninguna sección depende de una animación para ser visible.
