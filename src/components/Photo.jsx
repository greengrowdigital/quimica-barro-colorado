/**
 * Relación de aspecto de cada foto, para reservar el espacio antes de que
 * cargue y evitar saltos de layout.
 */
const LANDSCAPE = new Set([
  'agua-follaje',
  'muelle-jacana',
  'canal-buque',
  'charla-senderos',
  'carguero-lago',
  'ev-01-mapa-monumento',
])

const CUSTOM = { 'panel-mapa-isla': [900, 1600] }

export function photoSize(src) {
  const base = src
    .replace(/^\/img\//, '')
    .replace(/-sm\.webp$/, '')
    .replace(/\.webp$/, '')
  if (CUSTOM[base]) return CUSTOM[base]
  return LANDSCAPE.has(base) ? [1600, 1200] : [1200, 1600]
}

/* De cada foto hay dos ficheros: el grande y uno de 760. Declararlos como
   srcset deja que un teléfono baje el pequeño —menos bytes y mucha menos
   decodificación— sin que nadie pierda nitidez en una pantalla grande. */
function buildSrcSet(src) {
  if (src.includes('-sm.webp')) return undefined
  const [w, h] = photoSize(src)
  return `${src.replace(/\.webp$/, '-sm.webp')} ${Math.round((760 / Math.max(w, h)) * w)}w, ${src} ${w}w`
}

export default function Photo({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  sizes,
  objectPosition,
}) {
  const [w, h] = photoSize(src)

  return (
    <img
      src={src}
      srcSet={buildSrcSet(src)}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes ?? '100vw'}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`${className} ${imgClassName}`.trim()}
      style={objectPosition ? { objectPosition } : undefined}
    />
  )
}

/** Foto con pie de figura, para las evidencias del recorrido. */
export function Figure({ src, alt, caption, className = '', imgClassName = '', priority = false, sizes }) {
  return (
    <figure className={`m-0 ${className}`.trim()}>
      <div className="overflow-hidden rounded-[3px] bg-canopy-900">
        <Photo src={src} alt={alt} priority={priority} sizes={sizes} imgClassName={imgClassName} />
      </div>
      {caption && (
        <figcaption className="mt-3 max-w-[52ch] text-[0.86rem] leading-relaxed text-mist-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
