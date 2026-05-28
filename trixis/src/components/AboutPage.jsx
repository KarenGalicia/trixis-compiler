import { useState } from 'react'

const TEAM = [
  {
    name:    'Karen Jiménez Galicia',
    role:    'Desarrolladora · Análisis Léxico',
    photo:   '/team/karen.jpg',
    color:   '#ff00b4',
    glow:    'rgba(255,0,180,0.5)',
    desc:    'Responsable del analizador léxico — el motor que identifica y clasifica cada token del lenguaje.',
    icon:    '◈',
    fase:    'Léxico',
    skills:  ['Lexer', 'Diccionario', 'Heurísticas', 'UI/UX'],
  },
  {
    name:    'Edgar Chinchilla',
    role:    'Desarrollador · Análisis Sintáctico',
    photo:   null,
    color:   '#9632ff',
    glow:    'rgba(150,50,255,0.5)',
    desc:    'Responsable del parser sintáctico — verifica que las oraciones sigan las reglas gramaticales correctas.',
    icon:    '⋔',
    fase:    'Sintáctico',
    skills:  ['Parser', 'Árbol BNF', 'Gramática', 'Backend'],
  },
  {
    name:    'René Osorio',
    role:    'Desarrollador · Análisis Semántico',
    photo:   null,
    color:   '#6400ff',
    glow:    'rgba(100,0,255,0.5)',
    desc:    'Responsable del análisis semántico — detecta inconsistencias de significado y errores de coherencia.',
    icon:    '⊞',
    fase:    'Semántico',
    skills:  ['Semántica', 'Errores', 'Traducción', 'Testing'],
  },
]

const FEATURES = [
  { icon:'◈', title:'Análisis Léxico', color:'#ff00b4', glow:'rgba(255,0,180,0.4)', desc:'Identifica y clasifica cada token: sustantivos, verbos, adjetivos, preposiciones y más. Diccionario de +600 palabras EN + ES con heurísticas morfológicas.' },
  { icon:'⋔', title:'Análisis Sintáctico', color:'#9632ff', glow:'rgba(150,50,255,0.4)', desc:'Verifica la estructura gramatical de la oración. Genera el árbol de derivación BNF interactivo con zoom, pan y descarga en SVG.' },
  { icon:'⊞', title:'Análisis Semántico', color:'#6400ff', glow:'rgba(100,0,255,0.4)', desc:'Detecta inconsistencias de significado: doble negación, sujeto faltante, signos de puntuación y coherencia textual.' },
  { icon:'🤖', title:'Traducción con IA', color:'#c060ff', glow:'rgba(192,96,255,0.4)', desc:'Traducción profesional powered by Claude AI. Resultados precisos y naturales en ambos idiomas en tiempo real.' },
  { icon:'🎤', title:'Reconocimiento de Voz', color:'#ff60c0', glow:'rgba(255,96,192,0.4)', desc:'Dicta texto directamente con tu voz. Compatible con Chrome. Soporta inglés y español automáticamente.' },
  { icon:'🔊', title:'Text-to-Speech', color:'#00ffcc', glow:'rgba(0,255,200,0.35)', desc:'Escucha la traducción en voz alta con pronunciación nativa. Ideal para aprendizaje de idiomas.' },
  { icon:'⚡', title:'Análisis en Tiempo Real', color:'#ffc040', glow:'rgba(255,192,64,0.4)', desc:'Modo LIVE: analiza mientras escribes sin necesidad de presionar ningún botón. Retroalimentación instantánea.' },
  { icon:'🎯', title:'Modo Práctica', color:'#40ffe0', glow:'rgba(64,255,224,0.35)', desc:'Ejercicios interactivos para practicar gramática. Verificación automática con puntaje y retroalimentación inmediata.' },
]

const STATS = [
  { num:'+600', label:'Palabras en diccionario', icon:'📚' },
  { num:'12',   label:'Categorías gramaticales', icon:'🏷️' },
  { num:'3',    label:'Tipos de análisis',        icon:'🔬' },
  { num:'2',    label:'Idiomas soportados',       icon:'🌐' },
]

const MARKET = [
  { icon:'🎓', title:'Estudiantes universitarios', desc:'Cursos de lingüística, sistemas e idiomas que necesitan herramientas de análisis gramatical.' },
  { icon:'👨‍🏫', title:'Docentes de idiomas',       desc:'Corrección automática y enseñanza visual de la estructura del lenguaje.' },
  { icon:'💻', title:'Desarrolladores',            desc:'Estudio de compiladores, procesamiento de lenguaje natural y análisis léxico-sintáctico.' },
  { icon:'🌍', title:'Traductores',                desc:'Análisis detallado de la estructura gramatical antes y después de la traducción.' },
]

export default function AboutPage({ onClose }) {
  const [activeTab, setActiveTab] = useState('quienes')

  const TABS = [
    { id:'quienes',  label:'👥 Quiénes Somos' },
    { id:'ofrecemos',label:'🚀 Qué Ofrecemos'  },
    { id:'empresa',  label:'💼 Empresa'         },
  ]

  return (
    <div style={{ position:'fixed', inset:0, background:'#04000e', zIndex:600, display:'flex', flexDirection:'column', overflowY:'auto', animation:'fadeIn 0.3s ease' }}>

      {/* Header */}
      <div style={{ position:'sticky', top:0, zIndex:10, background:'rgba(7,0,20,0.98)', borderBottom:'1px solid rgba(150,50,255,0.2)', backdropFilter:'blur(20px)' }}>
        <div style={{ height:3, background:'linear-gradient(90deg,#ff00b4,#9632ff,#6400ff,#9632ff,#ff00b4)', backgroundSize:'200%', animation:'barSlide 3s linear infinite' }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <svg width="32" height="32" viewBox="0 0 60 60">
              <defs><linearGradient id="abt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff00b4"/><stop offset="50%" stopColor="#9632ff"/><stop offset="100%" stopColor="#6400ff"/></linearGradient></defs>
              <polygon points="30,5 50,25 30,55 10,25" fill="rgba(4,0,14,0.9)" stroke="url(#abt)" strokeWidth="2"/>
              <text x="30" y="37" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="16" fontWeight="900" fill="url(#abt)">τ</text>
              <circle cx="30" cy="5" r="2.5" fill="#ff00b4" opacity="0.9"/>
            </svg>
            <div>
              <span style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:22, letterSpacing:4, background:'linear-gradient(135deg,#ff00b4,#9632ff,#6400ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>TRIXIS</span>
              <span style={{ fontSize:10, color:'rgba(192,128,208,0.6)', fontFamily:'var(--mono)', marginLeft:8, letterSpacing:2 }}>τριξίς · Compilador Lingüístico</span>
            </div>
          </div>
          <div style={{ display:'flex', gap:4 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding:'7px 14px', fontSize:11, fontWeight:700, borderRadius:8, border:`1px solid ${activeTab===t.id?'rgba(150,50,255,0.5)':'rgba(150,50,255,0.15)'}`, background: activeTab===t.id?'rgba(150,50,255,0.2)':'transparent', color: activeTab===t.id?'#c080ff':'rgba(150,50,255,0.4)', cursor:'pointer', fontFamily:'var(--mono)', transition:'all 0.15s' }}>
                {t.label}
              </button>
            ))}
            <button onClick={onClose} style={{ padding:'7px 14px', fontSize:11, fontWeight:700, borderRadius:8, border:'1px solid rgba(255,0,180,0.3)', background:'rgba(255,0,180,0.1)', color:'#ff00b4', cursor:'pointer', fontFamily:'var(--mono)', marginLeft:4 }}>
              ← Volver al compilador
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex:1, maxWidth:1100, margin:'0 auto', width:'100%', padding:'2rem 1.5rem' }}>

        {/* ═══ QUIÉNES SOMOS ═══ */}
        {activeTab === 'quienes' && (
          <div style={{ animation:'fadeUp 0.4s ease' }}>

            {/* Hero */}
            <div style={{ textAlign:'center', marginBottom:'3rem' }}>
              <p style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(150,50,255,0.6)', letterSpacing:3, marginBottom:12 }}>UNIVERSIDAD MARIANO GÁLVEZ · CAMPUS JUTIAPA · COMPILADORES 2026</p>
              <h1 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:48, letterSpacing:4, background:'linear-gradient(135deg,#ffe0ff,#ff00b4,#9632ff,#6400ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:14, lineHeight:1.1, filter:'drop-shadow(0 0 20px rgba(150,50,255,0.3))' }}>Quiénes Somos</h1>
              <p style={{ fontSize:15, color:'rgba(192,128,208,0.8)', maxWidth:600, margin:'0 auto', lineHeight:1.8 }}>
                Somos un equipo de tres ingenieros en sistemas apasionados por el lenguaje y la tecnología. TRIXIS nació como una solución innovadora para el análisis lingüístico computacional.
              </p>
            </div>

            {/* Team cards */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:'3rem' }}>
              {TEAM.map((m, i) => (
                <div key={i} style={{ borderRadius:20, overflow:'hidden', border:`1px solid ${m.color}30`, background:'rgba(0,0,10,0.8)', boxShadow:`0 0 40px ${m.glow}20`, transition:'transform 0.2s', position:'relative' }}
                  onMouseOver={e => e.currentTarget.style.transform='translateY(-6px)'}
                  onMouseOut={e  => e.currentTarget.style.transform='translateY(0)'}>

                  {/* Foto */}
                  <div style={{ height:280, background:`linear-gradient(180deg,${m.color}15,rgba(0,0,10,0.95))`, position:'relative', overflow:'hidden' }}>
                    {m.photo ? (
                      <>
                        <img src={m.photo} alt={m.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', filter:'contrast(1.05) saturate(1.1)' }}/>
                        <div style={{ position:'absolute', inset:0, background:`linear-gradient(to top,rgba(0,0,10,0.9),rgba(0,0,10,0.1) 40%,transparent 60%)` }}/>
                      </>
                    ) : (
                      <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:`radial-gradient(ellipse at 50% 40%,${m.color}20,rgba(0,0,10,0.9))` }}>
                        <div style={{ textAlign:'center' }}>
                          <div style={{ width:100, height:100, borderRadius:'50%', background:`${m.color}15`, border:`2px solid ${m.color}40`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', boxShadow:`0 0 30px ${m.glow}` }}>
                            <span style={{ fontSize:40 }}>👤</span>
                          </div>
                          <p style={{ fontSize:11, color:`${m.color}80`, fontFamily:'var(--mono)', letterSpacing:2 }}>FOTO PENDIENTE</p>
                        </div>
                      </div>
                    )}

                    {/* Fase badge */}
                    <div style={{ position:'absolute', top:14, right:14, padding:'4px 12px', borderRadius:20, background:`${m.color}25`, border:`1px solid ${m.color}50`, color:m.color, fontSize:10, fontWeight:700, fontFamily:'var(--mono)', backdropFilter:'blur(10px)', boxShadow:`0 0 10px ${m.glow}` }}>
                      {m.icon} {m.fase}
                    </div>
                    <div style={{ position:'absolute', top:14, left:14, padding:'4px 10px', borderRadius:20, background:'rgba(0,0,10,0.7)', border:'1px solid rgba(150,50,255,0.25)', color:'rgba(192,128,208,0.8)', fontSize:10, fontFamily:'var(--mono)', backdropFilter:'blur(10px)' }}>
                      #{i+1}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding:'18px 20px 20px' }}>
                    <h3 style={{ fontSize:15, fontWeight:800, color:'#ffe0ff', marginBottom:4, letterSpacing:0.3 }}>{m.name}</h3>
                    <p style={{ fontSize:11, color:m.color, fontFamily:'var(--mono)', fontWeight:700, letterSpacing:0.5, marginBottom:10, textShadow:`0 0 8px ${m.glow}` }}>{m.role}</p>
                    <p style={{ fontSize:12, color:'rgba(192,128,208,0.7)', lineHeight:1.6, marginBottom:14 }}>{m.desc}</p>

                    {/* Skills */}
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                      {m.skills.map(sk => (
                        <span key={sk} style={{ fontSize:9, padding:'2px 8px', borderRadius:4, background:`${m.color}15`, border:`1px solid ${m.color}35`, color:m.color, fontFamily:'var(--mono)', fontWeight:700 }}>{sk}</span>
                      ))}
                    </div>
                  </div>

                  {/* Glow bottom border */}
                  <div style={{ height:2, background:`linear-gradient(90deg,transparent,${m.color},transparent)`, boxShadow:`0 0 8px ${m.glow}` }}/>
                </div>
              ))}
            </div>

            {/* Stats rápidos */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
              {STATS.map((s,i) => (
                <div key={i} style={{ textAlign:'center', padding:'20px 14px', borderRadius:14, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(150,50,255,0.15)', boxShadow:'0 0 20px rgba(100,0,255,0.06)' }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
                  <p style={{ fontSize:28, fontWeight:900, background:'linear-gradient(135deg,#ff00b4,#9632ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', fontFamily:'Playfair Display,serif', lineHeight:1, marginBottom:6 }}>{s.num}</p>
                  <p style={{ fontSize:11, color:'rgba(192,128,208,0.65)', fontFamily:'var(--mono)', letterSpacing:0.5 }}>{s.label}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ═══ QUÉ OFRECEMOS ═══ */}
        {activeTab === 'ofrecemos' && (
          <div style={{ animation:'fadeUp 0.4s ease' }}>

            <div style={{ textAlign:'center', marginBottom:'3rem' }}>
              <p style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(150,50,255,0.6)', letterSpacing:3, marginBottom:12 }}>FUNCIONALIDADES PRINCIPALES</p>
              <h1 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:48, letterSpacing:4, background:'linear-gradient(135deg,#ffe0ff,#ff00b4,#9632ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:14, lineHeight:1.1 }}>Qué Ofrecemos</h1>
              <p style={{ fontSize:15, color:'rgba(192,128,208,0.8)', maxWidth:580, margin:'0 auto', lineHeight:1.8 }}>
                TRIXIS combina lingüística computacional con inteligencia artificial para ofrecer la herramienta de análisis de idiomas más completa del mercado estudiantil.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, marginBottom:'3rem' }}>
              {FEATURES.map((f,i) => (
                <div key={i} style={{ padding:'22px 24px', borderRadius:16, background:'rgba(0,0,10,0.8)', border:`1px solid ${f.color}25`, boxShadow:`0 0 30px ${f.glow}10`, display:'flex', gap:16, alignItems:'flex-start', transition:'transform 0.2s,border-color 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=`${f.color}50` }}
                  onMouseOut={e  => { e.currentTarget.style.transform='translateY(0)';   e.currentTarget.style.borderColor=`${f.color}25` }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:`${f.color}18`, border:`1px solid ${f.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0, boxShadow:`0 0 14px ${f.glow}` }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize:14, fontWeight:700, color:'#ffe0ff', marginBottom:6, letterSpacing:0.3 }}>{f.title}</h3>
                    <p style={{ fontSize:12, color:'rgba(192,128,208,0.72)', lineHeight:1.65 }}>{f.desc}</p>
                  </div>
                  <div style={{ width:2, height:'100%', background:`linear-gradient(to bottom,${f.color},transparent)`, borderRadius:1, flexShrink:0, opacity:0.5 }}/>
                </div>
              ))}
            </div>

            {/* Público objetivo */}
            <div style={{ padding:'28px', borderRadius:18, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(150,50,255,0.18)', marginBottom:16 }}>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:22, fontWeight:900, color:'#ffe0ff', marginBottom:20, letterSpacing:2 }}>🎯 Público Objetivo</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
                {MARKET.map((m,i) => (
                  <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', padding:'14px 16px', borderRadius:10, background:'rgba(150,50,255,0.06)', border:'1px solid rgba(150,50,255,0.12)' }}>
                    <span style={{ fontSize:28, flexShrink:0 }}>{m.icon}</span>
                    <div>
                      <p style={{ fontSize:13, fontWeight:700, color:'#c080ff', marginBottom:4 }}>{m.title}</p>
                      <p style={{ fontSize:12, color:'rgba(192,128,208,0.7)', lineHeight:1.55 }}>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ═══ EMPRESA ═══ */}
        {activeTab === 'empresa' && (
          <div style={{ animation:'fadeUp 0.4s ease' }}>

            <div style={{ textAlign:'center', marginBottom:'3rem' }}>
              <p style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(150,50,255,0.6)', letterSpacing:3, marginBottom:12 }}>IDENTIDAD CORPORATIVA</p>
              <h1 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:48, letterSpacing:4, background:'linear-gradient(135deg,#ffe0ff,#ff00b4,#9632ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:14, lineHeight:1.1 }}>TRIXIS Corp.</h1>
              <p style={{ fontSize:15, color:'rgba(192,128,208,0.8)', maxWidth:580, margin:'0 auto', lineHeight:1.8 }}>Transformando la manera en que el mundo entiende y traduce el lenguaje.</p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>

              {/* Misión */}
              <div style={{ padding:'28px', borderRadius:18, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(255,0,180,0.2)', boxShadow:'0 0 30px rgba(255,0,180,0.06)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:'rgba(255,0,180,0.15)', border:'1px solid rgba(255,0,180,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, boxShadow:'0 0 14px rgba(255,0,180,0.3)' }}>🎯</div>
                  <h3 style={{ fontSize:18, fontWeight:800, color:'#ff00b4', letterSpacing:1 }}>Misión</h3>
                </div>
                <p style={{ fontSize:13, color:'rgba(192,128,208,0.8)', lineHeight:1.8 }}>
                  Desarrollar herramientas tecnológicas accesibles que faciliten la comprensión, análisis y traducción del lenguaje humano, combinando inteligencia artificial con rigor lingüístico computacional para beneficio de estudiantes, docentes y profesionales.
                </p>
              </div>

              {/* Visión */}
              <div style={{ padding:'28px', borderRadius:18, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(150,50,255,0.2)', boxShadow:'0 0 30px rgba(150,50,255,0.06)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:'rgba(150,50,255,0.15)', border:'1px solid rgba(150,50,255,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, boxShadow:'0 0 14px rgba(150,50,255,0.3)' }}>🚀</div>
                  <h3 style={{ fontSize:18, fontWeight:800, color:'#9632ff', letterSpacing:1 }}>Visión</h3>
                </div>
                <p style={{ fontSize:13, color:'rgba(192,128,208,0.8)', lineHeight:1.8 }}>
                  Ser la plataforma de análisis lingüístico computacional más utilizada en Centroamérica, expandiendo nuestras capacidades a múltiples idiomas y convirtiéndonos en el estándar educativo para el estudio de compiladores y procesamiento del lenguaje natural.
                </p>
              </div>

            </div>

            {/* Valores */}
            <div style={{ padding:'28px', borderRadius:18, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(100,0,255,0.2)', marginBottom:20 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:'rgba(100,0,255,0.15)', border:'1px solid rgba(100,0,255,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, boxShadow:'0 0 14px rgba(100,0,255,0.3)' }}>💎</div>
                <h3 style={{ fontSize:18, fontWeight:800, color:'#6400ff', letterSpacing:1 }}>Valores</h3>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
                {[
                  { icon:'🔬', v:'Precisión', d:'Resultados exactos en cada análisis lingüístico.' },
                  { icon:'💡', v:'Innovación', d:'Tecnología de vanguardia aplicada al lenguaje.' },
                  { icon:'🤝', v:'Colaboración', d:'Tres mentes, un solo objetivo, un solo producto.' },
                  { icon:'📚', v:'Aprendizaje', d:'Cada análisis es una oportunidad de enseñanza.' },
                  { icon:'⚡', v:'Eficiencia', d:'Respuestas instantáneas sin comprometer calidad.' },
                  { icon:'🌐', v:'Inclusión', d:'Accesible para cualquier persona en cualquier idioma.' },
                ].map(({ icon, v, d }) => (
                  <div key={v} style={{ padding:'14px 16px', borderRadius:10, background:'rgba(150,50,255,0.07)', border:'1px solid rgba(150,50,255,0.14)', textAlign:'center' }}>
                    <div style={{ fontSize:24, marginBottom:6 }}>{icon}</div>
                    <p style={{ fontSize:12, fontWeight:700, color:'#c080ff', marginBottom:4 }}>{v}</p>
                    <p style={{ fontSize:11, color:'rgba(192,128,208,0.65)', lineHeight:1.5 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparativa */}
            <div style={{ padding:'28px', borderRadius:18, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(150,50,255,0.18)' }}>
              <h3 style={{ fontSize:18, fontWeight:800, color:'#ffe0ff', marginBottom:18, letterSpacing:1 }}>🏆 TRIXIS vs Competencia</h3>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
                  <thead>
                    <tr style={{ background:'rgba(150,50,255,0.15)' }}>
                      {['Característica','TRIXIS','Google Translate','DeepL'].map((h,i) => (
                        <th key={h} style={{ padding:'10px 14px', textAlign: i===0?'left':'center', fontWeight:700, color: i===1?'#ff00b4':'rgba(192,128,208,0.8)', fontFamily:'var(--mono)', fontSize:11, letterSpacing:0.5, borderBottom:'1px solid rgba(150,50,255,0.2)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Análisis Léxico detallado','✅ Sí','❌ No','❌ No'],
                      ['Análisis Sintáctico','✅ Sí','❌ No','❌ No'],
                      ['Árbol BNF interactivo','✅ Sí','❌ No','❌ No'],
                      ['Tabla de tokens','✅ Sí','❌ No','❌ No'],
                      ['Tabla de símbolos','✅ Sí','❌ No','❌ No'],
                      ['Detección de errores','✅ Sí','❌ No','❌ No'],
                      ['Traducción EN ↔ ES','✅ Sí','✅ Sí','✅ Sí'],
                      ['Reconocimiento de voz','✅ Sí','✅ Sí','✅ Sí'],
                      ['Modo práctica educativo','✅ Sí','❌ No','❌ No'],
                      ['Exportar reporte completo','✅ Sí','❌ No','❌ No'],
                    ].map(([feat, t, g, d], i) => (
                      <tr key={i} style={{ borderBottom:'1px solid rgba(100,0,255,0.08)', background: i%2===0?'transparent':'rgba(150,50,255,0.02)' }}>
                        <td style={{ padding:'8px 14px', color:'rgba(192,128,208,0.85)' }}>{feat}</td>
                        <td style={{ padding:'8px 14px', textAlign:'center', color: t.includes('✅')?'#00ffcc':'#ff00b4', fontWeight:700, fontSize:14 }}>{t}</td>
                        <td style={{ padding:'8px 14px', textAlign:'center', color: g.includes('✅')?'#00ffcc':'rgba(96,48,112,0.8)', fontSize:14 }}>{g}</td>
                        <td style={{ padding:'8px 14px', textAlign:'center', color: d.includes('✅')?'#00ffcc':'rgba(96,48,112,0.8)', fontSize:14 }}>{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop:'1px solid rgba(150,50,255,0.12)', padding:'14px 24px', background:'rgba(4,0,14,0.98)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
        <span style={{ fontSize:10, color:'rgba(150,50,255,0.4)', fontFamily:'var(--mono)', letterSpacing:1 }}>TRIXIS · τριξίς · Universidad Mariano Gálvez · Campus Jutiapa · Compiladores 2026</span>
        <span style={{ fontSize:10, color:'rgba(150,50,255,0.3)', fontFamily:'var(--mono)' }}>Karen Jiménez · Edgar Chinchilla · René Osorio</span>
      </div>
    </div>
  )
}
