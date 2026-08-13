export const quimicaIntro = {
  kicker: { es: 'Punto 2', en: 'Section 2' },
  heading: { es: 'La química del ecosistema', en: 'Chemistry of the Ecosystem' },
  lede: {
    es: 'La química de la Isla Barro Colorado está en el agua, el suelo, la atmósfera y los seres vivos. Durante la visita pudimos observar directamente el agua que rodea la isla y las condiciones del bosque tropical. Todo está conectado por procesos químicos y naturales que mantienen el ecosistema funcionando.',
    en: 'The chemistry of Barro Colorado Island lives in the water, the soil, the atmosphere and the living things. During our visit we saw the water surrounding the island and the conditions inside the tropical forest first-hand. Everything is connected by chemical and natural processes that keep the ecosystem running.',
  },
}

export const agua = {
  id: 'agua',
  n: '2.1',
  title: { es: 'Química del agua', en: 'Water chemistry' },
  body: [
    {
      es: 'El agua es fundamental para la vida en Barro Colorado. Participa en la fotosíntesis, en el transporte de nutrientes, en la regulación de la temperatura y en muchas reacciones químicas de los organismos. La isla se encuentra dentro del Lago Gatún, un cuerpo de agua dulce formado durante la construcción del Canal de Panamá.',
      en: 'Water is essential to life on Barro Colorado. It takes part in photosynthesis, nutrient transport, temperature regulation and many chemical reactions inside living things. The island sits inside Gatun Lake, a freshwater body created during the construction of the Panama Canal.',
    },
    {
      es: 'El agua natural puede contener sustancias disueltas, como sales minerales e iones. La concentración de estas sustancias influye en propiedades medibles como el pH y la conductividad eléctrica del agua.',
      en: 'Natural water can carry dissolved substances such as mineral salts and ions. How concentrated they are affects measurable properties like the pH and the electrical conductivity of the water.',
    },
  ],
  ions: [
    { symbol: 'Ca²⁺', name: { es: 'Calcio', en: 'Calcium' } },
    { symbol: 'Mg²⁺', name: { es: 'Magnesio', en: 'Magnesium' } },
    { symbol: 'K⁺', name: { es: 'Potasio', en: 'Potassium' } },
  ],
  measures: [
    {
      label: 'pH',
      note: {
        es: 'Qué tan ácida o básica está el agua.',
        en: 'How acidic or basic the water is.',
      },
    },
    {
      label: { es: 'Conductividad', en: 'Conductivity' },
      note: {
        es: 'Depende de los iones disueltos: más iones, más conduce.',
        en: 'Depends on dissolved ions — the more ions, the better it conducts.',
      },
    },
  ],
}

export const suelo = {
  id: 'suelo',
  n: '2.2',
  title: { es: 'Química del suelo', en: 'Soil chemistry' },
  body: [
    {
      es: 'El suelo de Barro Colorado funciona como reserva de agua y de nutrientes para las plantas. Su composición y sus propiedades químicas influyen directamente en la vegetación del bosque. Los estudios del Smithsonian han identificado distintos tipos de suelo en la isla y han analizado características como composición, drenaje y humedad.',
      en: 'The soil of Barro Colorado works as a reservoir of water and nutrients for plants. Its composition and chemical properties shape the forest above it. Smithsonian studies have mapped different soil types across the island and analysed features such as composition, drainage and moisture.',
    },
  ],
  nutrients: [
    {
      symbol: 'N',
      name: { es: 'Nitrógeno', en: 'Nitrogen' },
      role: { es: 'Formación de proteínas', en: 'Protein formation' },
    },
    {
      symbol: 'P',
      name: { es: 'Fósforo', en: 'Phosphorus' },
      role: { es: 'Transferencia de energía', en: 'Energy transfer' },
    },
    {
      symbol: 'K',
      name: { es: 'Potasio', en: 'Potassium' },
      role: { es: 'Regulación del agua', en: 'Water regulation' },
    },
    {
      symbol: 'Ca',
      name: { es: 'Calcio', en: 'Calcium' },
      role: { es: 'Paredes celulares', en: 'Cell walls' },
    },
    {
      symbol: 'Mg',
      name: { es: 'Magnesio', en: 'Magnesium' },
      role: { es: 'Centro de la clorofila', en: 'Core of chlorophyll' },
    },
  ],
  nutrientNote: {
    es: 'Estos elementos participan en procesos esenciales como la formación de proteínas, el crecimiento celular y la fotosíntesis.',
    en: 'These elements take part in essential processes such as protein formation, cell growth and photosynthesis.',
  },
  photo: {
    src: '/img/ev-02-arbol-raices.webp',
    alt: {
      es: 'Árbol de gran altura con raíces tabulares anchas que se extienden sobre la hojarasca del suelo.',
      en: 'A tall tree with wide buttress roots spreading over the leaf litter.',
    },
    caption: {
      es: 'Las raíces anchas mantienen al árbol en pie y viven en la capa más superficial del suelo, que es donde están los nutrientes.',
      en: 'Buttress roots hold the tree up and live in the shallowest layer of soil — exactly where the nutrients are.',
    },
  },
}

export const bosque = {
  id: 'bosque',
  n: '2.3',
  title: { es: 'Propiedades químicas del bosque', en: 'Chemical properties of the forest' },
  body: [
    {
      es: 'El bosque tropical funciona como un sistema donde ocurren transformaciones químicas todo el tiempo. Las plantas absorben agua y minerales del suelo y toman dióxido de carbono de la atmósfera para realizar la fotosíntesis.',
      en: 'The tropical forest works as a system where chemical transformations never stop. Plants take up water and minerals from the soil and carbon dioxide from the air to carry out photosynthesis.',
    },
    {
      es: 'Cuando las hojas y otros restos orgánicos caen al suelo, los microorganismos los descomponen. Ese proceso devuelve nutrientes al suelo para que las plantas los aprovechen de nuevo.',
      en: 'When leaves and other organic remains fall, microorganisms break them down. That process returns nutrients to the soil so plants can use them again.',
    },
  ],
  equation: {
    reactants: [
      { coef: '6', formula: 'CO₂', name: { es: 'Dióxido de carbono', en: 'Carbon dioxide' } },
      { coef: '6', formula: 'H₂O', name: { es: 'Agua', en: 'Water' } },
    ],
    products: [
      { coef: '', formula: 'C₆H₁₂O₆', name: { es: 'Glucosa', en: 'Glucose' } },
      { coef: '6', formula: 'O₂', name: { es: 'Oxígeno', en: 'Oxygen' } },
    ],
    driver: { es: 'luz solar', en: 'sunlight' },
    caption: {
      es: 'Fotosíntesis: la reacción que sostiene todo lo que vimos ese día.',
      en: 'Photosynthesis: the reaction holding up everything we saw that day.',
    },
  },
  decomposition: {
    title: { es: 'Y el camino de vuelta', en: 'And the way back' },
    steps: [
      { es: 'Cae la hojarasca', en: 'Litter falls' },
      { es: 'Hongos y microorganismos la degradan', en: 'Fungi and microbes break it down' },
      { es: 'Los nutrientes vuelven al suelo', en: 'Nutrients return to the soil' },
      { es: 'Las raíces los absorben otra vez', en: 'Roots absorb them again' },
    ],
    photo: {
      src: '/img/descomposicion-tronco.webp',
      alt: {
        es: 'Tronco caído cubierto de hojarasca con hongos pequeños y plántulas creciendo encima.',
        en: 'A fallen trunk covered in leaf litter with small fungi and seedlings growing on it.',
      },
    },
  },
}

export const ciclo = {
  id: 'ciclo-del-agua',
  n: '2.4',
  title: { es: 'Ciclo del agua', en: 'The water cycle' },
  body: [
    {
      es: 'Durante la visita, el agua fue uno de los elementos más visibles del ecosistema. El ciclo del agua describe su movimiento continuo entre la atmósfera, el suelo, los cuerpos de agua y los seres vivos. En Barro Colorado, la lluvia alimenta el suelo y el lago; parte del agua se infiltra, otra circula como escorrentía, y las plantas la devuelven a la atmósfera mediante la transpiración.',
      en: 'Water was one of the most visible parts of the ecosystem during our visit. The water cycle describes its constant movement between the atmosphere, the soil, bodies of water and living things. On Barro Colorado, rain feeds the soil and the lake; some water sinks in, some runs off, and plants return it to the air through transpiration.',
    },
  ],
  stages: [
    {
      key: 'precipitacion',
      label: { es: 'Precipitación', en: 'Precipitation' },
      note: {
        es: 'La lluvia entra al sistema y alimenta el suelo y el lago.',
        en: 'Rain enters the system and feeds the soil and the lake.',
      },
    },
    {
      key: 'infiltracion',
      label: { es: 'Infiltración', en: 'Infiltration' },
      note: {
        es: 'Parte del agua penetra en el suelo y queda disponible para las raíces.',
        en: 'Part of the water sinks into the soil and becomes available to roots.',
      },
    },
    {
      key: 'escorrentia',
      label: { es: 'Escorrentía', en: 'Runoff' },
      note: {
        es: 'Otra parte corre por la superficie: eso fue lo que vimos en el sendero.',
        en: 'The rest runs across the surface — that is what we saw on the trail.',
      },
    },
    {
      key: 'transpiracion',
      label: { es: 'Transpiración', en: 'Transpiration' },
      note: {
        es: 'Las plantas devuelven agua a la atmósfera y el ciclo vuelve a empezar.',
        en: 'Plants return water to the atmosphere and the cycle starts again.',
      },
    },
  ],
  rainfall: {
    value: 2655,
    unit: 'mm',
    label: { es: 'de lluvia al año, en promedio', en: 'of rain per year, on average' },
    note: {
      es: 'La isla tiene una estación seca y una estación lluviosa muy marcadas. El Smithsonian también monitorea humedad del suelo, precipitación y evapotranspiración.',
      en: 'The island has a sharply marked dry season and wet season. The Smithsonian also monitors soil moisture, rainfall and evapotranspiration.',
    },
  },
  figures: [
    {
      n: 1,
      src: '/img/lago-gatun.webp',
      alt: {
        es: 'Lago Gatún visto desde la lancha, con la orilla boscosa de la isla y una palmera alta recortada contra el cielo.',
        en: 'Gatun Lake seen from the boat, with the forested shore of the island and a tall palm against the sky.',
      },
      caption: {
        es: 'Figura 1. Lago Gatún y el entorno de la Isla Barro Colorado durante la gira académica.',
        en: 'Figure 1. Gatun Lake and the surroundings of Barro Colorado Island during our field trip.',
      },
    },
    {
      n: 2,
      src: '/img/agua-follaje.webp',
      alt: {
        es: 'Superficie de agua verde con hierbas emergentes y el reflejo del follaje sobre ella.',
        en: 'Green water surface with emergent grasses and the reflection of the canopy on it.',
      },
      caption: {
        es: 'Figura 2. Agua y material vegetal observados durante la visita a la Isla Barro Colorado.',
        en: 'Figure 2. Water and plant material observed during the visit to Barro Colorado Island.',
      },
    },
  ],
}

export const calidad = {
  id: 'calidad-ambiental',
  n: '2.5',
  title: { es: 'Calidad ambiental', en: 'Environmental quality' },
  body: [
    {
      es: 'La calidad ambiental se puede estudiar con variables químicas y físicas: pH, temperatura, cantidad de nutrientes, humedad y presencia de materia orgánica. El monitoreo científico permite ver cómo cambian esas condiciones y cómo se relacionan con el funcionamiento del ecosistema.',
      en: 'Environmental quality can be studied through chemical and physical variables: pH, temperature, nutrient levels, moisture and organic matter. Scientific monitoring shows how those conditions shift and how they connect to the way the ecosystem works.',
    },
    {
      es: 'Conservar el agua y el suelo importa porque cualquier alteración en ellos afecta a las plantas, los animales y los microorganismos que dependen de ambos.',
      en: 'Protecting water and soil matters because any change in them reaches the plants, animals and microorganisms that depend on both.',
    },
  ],
  variables: [
    { es: 'pH', en: 'pH' },
    { es: 'Temperatura', en: 'Temperature' },
    { es: 'Nutrientes', en: 'Nutrients' },
    { es: 'Humedad', en: 'Moisture' },
    { es: 'Materia orgánica', en: 'Organic matter' },
  ],
}

export const quimicaConclusion = {
  heading: { es: 'Conclusión', en: 'Conclusion' },
  body: {
    es: 'La visita nos permitió relacionar conceptos de química con cosas que pudimos ver de frente. El agua, el suelo, las plantas y la materia orgánica forman un sistema conectado donde ocurren procesos químicos todo el tiempo. El ciclo del agua es especialmente importante porque une la atmósfera, el suelo, los cuerpos de agua y los seres vivos, y ayuda a mantener el equilibrio del ecosistema.',
    en: 'The visit let us connect chemistry concepts with things we could see in front of us. Water, soil, plants and organic matter form one connected system where chemical processes never stop. The water cycle matters most because it ties together the atmosphere, the soil, bodies of water and living things, helping keep the ecosystem in balance.',
  },
}
