import { useState } from 'react'

const TEAM = [
  {
    name: 'Karen Jiménez Galicia',
    role: 'Desarrolladora',
    area: 'Análisis Léxico',
    photo: '/team/karen.jpg',
    desc: 'Responsable del módulo léxico: tokenización, diccionario y clasificación morfológica de palabras en inglés y español.',
    icon: '🔴',
    color: '#ff00b4',
    glow: 'rgba(255,0,180,0.45)',
    skills: ['Lexer', 'Diccionario', 'Morfología', 'React'],
  },
  {
    name: 'Edgar Chinchilla',
    role: 'Desarrollador',
    area: 'Análisis Sintáctico',
    photo: '/team/edgar.jpg',
    desc: 'Responsable del módulo sintáctico: gramática BNF, árbol de derivación y validación de estructura gramatical.',
    icon: '🟣',
    color: '#9632ff',
    glow: 'rgba(150,50,255,0.45)',
    skills: ['Parser', 'BNF', 'Árbol', 'JavaScript'],
  },
  {
    name: 'Alejandro Osorio',
    role: 'Desarrollador',
    area: 'Análisis Semántico',
    photo: '/team/alejandro.jpg',
    desc: 'Responsable del módulo semántico: validación de significado, detección de errores lógicos y coherencia del texto.',
    icon: '🔵',
    color: '#6400ff',
    glow: 'rgba(100,0,255,0.45)',
    skills: ['Semántica', 'IA', 'Traducción', 'API'],
  },
]

const FEATURES = [
  { icon:'🔤', title:'Análisis Léxico',     color:'#ff00b4', desc:'Identificamos cada palabra, la clasificamos en su categoría gramatical y construimos la tabla de tokens con más de 600 palabras en diccionario.' },
  { icon:'🌳', title:'Análisis Sintáctico', color:'#9632ff', desc:'Verificamos la estructura gramatical de la oración usando reglas BNF. Generamos el árbol de derivación interactivo con zoom y descarga.' },
  { icon:'🧠', title:'Análisis Semántico',  color:'#6400ff', desc:'Analizamos el significado: detectamos doble negación, oraciones sin sujeto, falta de puntuación y errores lógicos.' },
  { icon:'🤖', title:'Traducción con IA',   color:'#c060ff', desc:'Traducción profesional EN↔ES impulsada por Inteligencia Artificial. Rápida, precisa y contextual.' },
  { icon:'🎤', title:'Reconocimiento de Voz', color:'#ff00b4', desc:'Dictado inteligente: habla y TRIXIS transcribe, analiza y traduce tu texto automáticamente.' },
  { icon:'🔊', title:'Text-to-Speech',      color:'#9632ff', desc:'Escucha la pronunciación correcta de cualquier traducción en inglés o español con voz natural.' },
  { icon:'⚡', title:'Análisis en Tiempo Real', color:'#6400ff', desc:'Modo LIVE: TRIXIS analiza tu texto mientras escribes, sin necesidad de presionar ningún botón.' },
  { icon:'📊', title:'Estadísticas Visuales', color:'#c060ff', desc:'Gráficas de distribución gramatical: visualiza cuántos sustantivos, verbos, adjetivos y más tiene tu texto.' },
  { icon:'🎯', title:'Modo Práctica',        color:'#ff00b4', desc:'Ejercicios interactivos para practicar gramática en inglés y español con verificación automática y puntaje.' },
]

const COMPETITORS = [
  { feature:'Análisis Léxico',         trixis:true,  google:false, deepl:false },
  { feature:'Árbol Sintáctico BNF',    trixis:true,  google:false, deepl:false },
  { feature:'Análisis Semántico',      trixis:true,  google:false, deepl:false },
  { feature:'Tabla de Tokens',         trixis:true,  google:false, deepl:false },
  { feature:'Tabla de Símbolos',       trixis:true,  google:false, deepl:false },
  { feature:'Detección de Errores',    trixis:true,  google:false, deepl:false },
  { feature:'Traducción EN↔ES',        trixis:true,  google:true,  deepl:true  },
  { feature:'Reconocimiento de Voz',   trixis:true,  google:true,  deepl:false },
  { feature:'Text-to-Speech',          trixis:true,  google:true,  deepl:false },
  { feature:'Modo Práctica',           trixis:true,  google:false, deepl:false },
  { feature:'Exportar Reporte',        trixis:true,  google:false, deepl:false },
  { feature:'Análisis en Tiempo Real', trixis:true,  google:false, deepl:true  },
  { feature:'Gratuito',                trixis:true,  google:true,  deepl:true  },
]

const TABS = [
  { id:'inicio',    icon:'🏠', label:'Inicio'         },
  { id:'equipo',    icon:'👥', label:'Quiénes Somos'  },
  { id:'ofrece',    icon:'🚀', label:'Qué Ofrecemos'  },
  { id:'mision',    icon:'🎯', label:'Misión y Visión' },
  { id:'mercado',   icon:'📈', label:'Estrategia'     },
]

export default function LandingPage({ onEnterApp }) {
  const [tab, setTab] = useState('inicio')

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-0)', display:'flex', flexDirection:'column' }}>

      {/* ── NAV ── */}
      <nav style={{ background:'rgba(7,0,20,0.97)', borderBottom:'1px solid rgba(150,50,255,0.2)', position:'sticky', top:3, zIndex:100, backdropFilter:'blur(20px)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 1.5rem', display:'flex', alignItems:'center', gap:8, overflowX:'auto' }}>

          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 0', marginRight:16, flexShrink:0 }}>
            <svg width="28" height="28" viewBox="0 0 60 60">
              <defs><linearGradient id="navlg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff00b4"/><stop offset="50%" stopColor="#9632ff"/><stop offset="100%" stopColor="#6400ff"/></linearGradient></defs>
              <polygon points="30,5 50,25 30,55 10,25" fill="rgba(4,0,14,0.9)" stroke="url(#navlg)" strokeWidth="2"/>
              <line x1="30" y1="5" x2="30" y2="55" stroke="rgba(150,50,255,0.3)" strokeWidth="0.8"/>
              <line x1="10" y1="25" x2="50" y2="25" stroke="rgba(255,0,180,0.2)" strokeWidth="0.8"/>
              <text x="30" y="37" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="16" fontWeight="900" fill="url(#navlg)">τ</text>
              <circle cx="30" cy="5" r="2.5" fill="#ff00b4" opacity="0.9"/>
            </svg>
            <span style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:18, letterSpacing:4, background:'linear-gradient(135deg,#ff00b4,#9632ff,#6400ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>TRIXIS</span>
          </div>

          {/* Tabs */}
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display:'flex', alignItems:'center', gap:5, padding:'14px 14px', fontSize:12, fontWeight: tab===t.id?700:500, color: tab===t.id?'#c080ff':'rgba(150,100,180,0.55)', background:'transparent', border:'none', borderBottom:`2px solid ${tab===t.id?'#9632ff':'transparent'}`, cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.15s', letterSpacing:0.3 }}>
              <span style={{ fontSize:14 }}>{t.icon}</span>{t.label}
            </button>
          ))}

          {/* CTA */}
          <button onClick={onEnterApp} style={{ marginLeft:'auto', padding:'8px 18px', background:'linear-gradient(135deg,#ff00b4,#9632ff)', color:'#fff', fontSize:11, fontWeight:800, borderRadius:50, border:'none', cursor:'pointer', boxShadow:'0 0 18px rgba(150,50,255,0.35)', letterSpacing:1, fontFamily:'var(--mono)', flexShrink:0 }}>
            ABRIR APP →
          </button>
        </div>
      </nav>

      {/* ── CONTENIDO ── */}
      <div style={{ flex:1, maxWidth:1100, margin:'0 auto', width:'100%', padding:'2rem 1.5rem' }}>

        {/* ════ INICIO ════ */}
        {tab === 'inicio' && (
          <div style={{ animation:'fadeUp 0.5s ease' }}>

            {/* Hero */}
            <div style={{ textAlign:'center', padding:'3rem 1rem 2.5rem', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:500, height:250, background:'radial-gradient(ellipse,rgba(150,50,255,0.12),transparent 70%)', pointerEvents:'none' }}/>

              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 16px', borderRadius:20, border:'1px solid rgba(150,50,255,0.3)', background:'rgba(150,50,255,0.1)', marginBottom:24 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'#9632ff', boxShadow:'0 0 8px #9632ff' }}/>
                <span style={{ fontSize:11, color:'#c080ff', fontFamily:'var(--mono)', fontWeight:700, letterSpacing:1 }}>COMPILADORES 2026 · UMG CAMPUS JUTIAPA</span>
              </div>

              <h1 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:'clamp(42px,6vw,72px)', letterSpacing:8, background:'linear-gradient(135deg,#ffe0ff,#ff00b4,#9632ff,#6400ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1.1, marginBottom:16, filter:'drop-shadow(0 0 30px rgba(150,50,255,0.4))' }}>
                TRIXIS
              </h1>
              <p style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', fontSize:18, color:'rgba(150,50,255,0.7)', letterSpacing:4, marginBottom:8 }}>τριξίς</p>
              <p style={{ fontSize:18, color:'rgba(192,128,208,0.8)', maxWidth:580, margin:'0 auto 12px', lineHeight:1.7, fontWeight:500 }}>
                El primer compilador lingüístico inteligente que analiza, traduce y enseña inglés y español en tiempo real.
              </p>
              <p style={{ fontSize:13, color:'rgba(150,50,255,0.5)', fontFamily:'var(--mono)', letterSpacing:2, marginBottom:36 }}>ANÁLISIS LÉXICO · SINTÁCTICO · SEMÁNTICO · TRADUCCIÓN IA</p>

              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <button onClick={onEnterApp} style={{ padding:'13px 36px', background:'linear-gradient(135deg,#ff00b4,#7a00cc,#9632ff)', color:'#fff', fontSize:14, fontWeight:800, borderRadius:50, border:'none', cursor:'pointer', boxShadow:'0 0 40px rgba(150,50,255,0.45), 0 8px 28px rgba(0,0,0,0.5)', letterSpacing:1 }}
                  onMouseOver={e => e.currentTarget.style.transform='translateY(-2px)'}
                  onMouseOut={e  => e.currentTarget.style.transform='translateY(0)'}>
                  Abrir TRIXIS →
                </button>
                <button onClick={() => setTab('equipo')} style={{ padding:'13px 28px', background:'transparent', color:'#c080ff', fontSize:13, fontWeight:600, borderRadius:50, border:'1px solid rgba(150,50,255,0.35)', cursor:'pointer' }}>
                  Conocer el equipo
                </button>
              </div>
            </div>

            {/* Features preview */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
              {FEATURES.slice(0,6).map(f => (
                <div key={f.title} style={{ padding:'16px', borderRadius:12, background:'rgba(0,0,10,0.6)', border:`1px solid ${f.color}25`, transition:'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor=`${f.color}50`; e.currentTarget.style.background='rgba(0,0,10,0.8)' }}
                  onMouseOut={e  => { e.currentTarget.style.borderColor=`${f.color}25`; e.currentTarget.style.background='rgba(0,0,10,0.6)' }}>
                  <div style={{ fontSize:22, marginBottom:8 }}>{f.icon}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:f.color, marginBottom:4 }}>{f.title}</div>
                  <div style={{ fontSize:11, color:'rgba(192,128,208,0.7)', lineHeight:1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ QUIÉNES SOMOS ════ */}
        {tab === 'equipo' && (
          <div style={{ animation:'fadeUp 0.5s ease' }}>
            <div style={{ textAlign:'center', marginBottom:36 }}>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:36, letterSpacing:4, background:'linear-gradient(135deg,#ffe0ff,#9632ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:10 }}>Quiénes Somos</h2>
              <p style={{ fontSize:14, color:'rgba(192,128,208,0.7)', maxWidth:560, margin:'0 auto', lineHeight:1.7 }}>
                Somos tres estudiantes de Ingeniería en Sistemas de la Universidad Mariano Gálvez, Campus Jutiapa. Unidos por la pasión por el lenguaje y la tecnología, creamos TRIXIS.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:40 }}>
              {TEAM.map(m => (
                <div key={m.name} style={{ borderRadius:18, overflow:'hidden', background:'rgba(0,0,10,0.8)', border:`1px solid ${m.color}25`, boxShadow:`0 0 30px ${m.color}12`, transition:'transform 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'}
                  onMouseOut={e  => e.currentTarget.style.transform='translateY(0)'}>

                  {/* Foto o avatar */}
                  <div style={{ height:220, background:`linear-gradient(180deg,${m.color}20,rgba(0,0,10,0.9))`, position:'relative', overflow:'hidden' }}>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center center' }}/>
                    ) : (
                      <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:10 }}>
                        {/* Avatar placeholder elegante */}
                        <div style={{ width:90, height:90, borderRadius:'50%', background:`linear-gradient(135deg,${m.color}40,${m.color}15)`, border:`2px solid ${m.color}60`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, boxShadow:`0 0 24px ${m.color}40` }}>
                          {m.icon}
                        </div>
                        <p style={{ fontSize:10, color:`${m.color}80`, fontFamily:'var(--mono)', letterSpacing:1 }}>foto pendiente</p>
                      </div>
                    )}
                    {/* Overlay gradient bottom */}
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:60, background:`linear-gradient(to top,rgba(0,0,10,0.9),transparent)` }}/>
                    {/* Badge rol */}
                    <div style={{ position:'absolute', top:12, right:12, padding:'3px 10px', borderRadius:20, background:`${m.color}25`, border:`1px solid ${m.color}50`, fontSize:9, color:m.color, fontFamily:'var(--mono)', fontWeight:700, backdropFilter:'blur(4px)' }}>{m.role}</div>
                  </div>

                  <div style={{ padding:'16px 18px 20px' }}>
                    <h3 style={{ fontSize:15, fontWeight:800, color:'#ffe0ff', marginBottom:3, letterSpacing:0.3 }}>{m.name}</h3>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:m.color, boxShadow:`0 0 8px ${m.glow}` }}/>
                      <span style={{ fontSize:11, color:m.color, fontFamily:'var(--mono)', fontWeight:700, letterSpacing:0.5 }}>{m.area}</span>
                    </div>
                    <p style={{ fontSize:12, color:'rgba(192,128,208,0.75)', lineHeight:1.6, marginBottom:12 }}>{m.desc}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                      {m.skills.map(s => (
                        <span key={s} style={{ fontSize:9, padding:'2px 8px', borderRadius:4, background:`${m.color}18`, border:`1px solid ${m.color}35`, color:m.color, fontFamily:'var(--mono)', fontWeight:700 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Universidad */}
            <div style={{ padding:'22px', borderRadius:16, background:'rgba(0,0,10,0.7)', border:'1px solid rgba(150,50,255,0.2)', textAlign:'center', boxShadow:'0 0 40px rgba(100,0,255,0.08)' }}>
              <p style={{ fontSize:12, color:'rgba(150,50,255,0.6)', fontFamily:'var(--mono)', letterSpacing:2, marginBottom:8 }}>INSTITUCIÓN EDUCATIVA</p>
              <p style={{ fontSize:18, fontWeight:700, color:'#ffe0ff', marginBottom:4 }}>Universidad Mariano Gálvez de Guatemala</p>
              <p style={{ fontSize:13, color:'rgba(192,128,208,0.7)' }}>Campus Jutiapa · Ingeniería en Sistemas · Compiladores 2026</p>
              <p style={{ fontSize:11, color:'rgba(150,50,255,0.5)', marginTop:6, fontFamily:'var(--mono)' }}>Catedrática: Dra. Sheyla Esquivel</p>
            </div>
          </div>
        )}

        {/* ════ QUÉ OFRECEMOS ════ */}
        {tab === 'ofrece' && (
          <div style={{ animation:'fadeUp 0.5s ease' }}>
            <div style={{ textAlign:'center', marginBottom:36 }}>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:36, letterSpacing:4, background:'linear-gradient(135deg,#ffe0ff,#ff00b4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:10 }}>Qué Ofrecemos</h2>
              <p style={{ fontSize:14, color:'rgba(192,128,208,0.7)', maxWidth:560, margin:'0 auto', lineHeight:1.7 }}>
                TRIXIS es más que un traductor. Es un compilador lingüístico completo que analiza el lenguaje desde adentro.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:36 }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ padding:'20px', borderRadius:14, background:'rgba(0,0,10,0.7)', border:`1px solid ${f.color}25`, transition:'all 0.2s', cursor:'default' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor=`${f.color}55`; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 8px 30px ${f.color}20` }}
                  onMouseOut={e  => { e.currentTarget.style.borderColor=`${f.color}25`; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ fontSize:28, marginBottom:10 }}>{f.icon}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:f.color, marginBottom:6, letterSpacing:0.3 }}>{f.title}</div>
                  <div style={{ fontSize:11, color:'rgba(192,128,208,0.75)', lineHeight:1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>

            {/* Comparativa */}
            <div style={{ marginBottom:20 }}>
              <h3 style={{ fontSize:18, fontWeight:700, color:'#ffe0ff', marginBottom:16, textAlign:'center' }}>TRIXIS vs Competidores</h3>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
                  <thead>
                    <tr style={{ background:'rgba(0,0,10,0.8)' }}>
                      <th style={{ padding:'10px 14px', textAlign:'left', color:'rgba(150,50,255,0.7)', fontFamily:'var(--mono)', fontSize:10, letterSpacing:1, borderBottom:'1px solid rgba(150,50,255,0.2)' }}>CARACTERÍSTICA</th>
                      {[['TRIXIS','#9632ff'],['Google Translate','rgba(192,128,208,0.5)'],['DeepL','rgba(192,128,208,0.5)']].map(([n,c]) => (
                        <th key={n} style={{ padding:'10px 14px', textAlign:'center', color:c, fontFamily:'var(--mono)', fontSize:10, letterSpacing:1, fontWeight:800, borderBottom:'1px solid rgba(150,50,255,0.2)' }}>{n}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPETITORS.map((row, i) => (
                      <tr key={i} style={{ borderBottom:'1px solid rgba(100,0,255,0.08)' }}
                        onMouseOver={e => e.currentTarget.style.background='rgba(150,50,255,0.04)'}
                        onMouseOut={e  => e.currentTarget.style.background='transparent'}>
                        <td style={{ padding:'9px 14px', color:'rgba(192,128,208,0.85)', fontWeight:500 }}>{row.feature}</td>
                        <td style={{ padding:'9px 14px', textAlign:'center', fontSize:16 }}>{row.trixis  ? <span style={{ color:'#9632ff', textShadow:'0 0 8px rgba(150,50,255,0.6)' }}>✓</span> : <span style={{ color:'rgba(100,50,120,0.4)' }}>—</span>}</td>
                        <td style={{ padding:'9px 14px', textAlign:'center', fontSize:16 }}>{row.google  ? <span style={{ color:'rgba(192,128,208,0.6)' }}>✓</span> : <span style={{ color:'rgba(100,50,120,0.4)' }}>—</span>}</td>
                        <td style={{ padding:'9px 14px', textAlign:'center', fontSize:16 }}>{row.deepl   ? <span style={{ color:'rgba(192,128,208,0.6)' }}>✓</span> : <span style={{ color:'rgba(100,50,120,0.4)' }}>—</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════ MISIÓN Y VISIÓN ════ */}
        {tab === 'mision' && (
          <div style={{ animation:'fadeUp 0.5s ease' }}>
            <div style={{ textAlign:'center', marginBottom:36 }}>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:36, letterSpacing:4, background:'linear-gradient(135deg,#ffe0ff,#6400ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:10 }}>Misión y Visión</h2>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
              {/* Misión */}
              <div style={{ padding:'28px', borderRadius:18, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(255,0,180,0.25)', boxShadow:'0 0 30px rgba(255,0,180,0.08)' }}>
                <div style={{ fontSize:32, marginBottom:14 }}>🎯</div>
                <h3 style={{ fontSize:18, fontWeight:800, color:'#ff00b4', marginBottom:12, letterSpacing:1, fontFamily:'var(--mono)' }}>MISIÓN</h3>
                <p style={{ fontSize:13, color:'rgba(192,128,208,0.85)', lineHeight:1.8 }}>
                  Desarrollar herramientas tecnológicas accesibles que democraticen el aprendizaje del análisis lingüístico, brindando a estudiantes, docentes y profesionales una plataforma intuitiva para entender la estructura profunda del lenguaje en inglés y español.
                </p>
              </div>
              {/* Visión */}
              <div style={{ padding:'28px', borderRadius:18, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(100,0,255,0.25)', boxShadow:'0 0 30px rgba(100,0,255,0.08)' }}>
                <div style={{ fontSize:32, marginBottom:14 }}>🔭</div>
                <h3 style={{ fontSize:18, fontWeight:800, color:'#6400ff', marginBottom:12, letterSpacing:1, fontFamily:'var(--mono)' }}>VISIÓN</h3>
                <p style={{ fontSize:13, color:'rgba(192,128,208,0.85)', lineHeight:1.8 }}>
                  Convertirnos en la plataforma de referencia en Centroamérica para el análisis lingüístico computacional, integrando Inteligencia Artificial y procesamiento de lenguaje natural para transformar la manera en que las personas aprenden y comprenden los idiomas.
                </p>
              </div>
            </div>

            {/* Valores */}
            <h3 style={{ fontSize:16, fontWeight:700, color:'#ffe0ff', marginBottom:16, textAlign:'center', letterSpacing:2, fontFamily:'var(--mono)' }}>VALORES</h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:28 }}>
              {[
                { icon:'💡', val:'Innovación',    desc:'Soluciones tecnológicas de vanguardia para problemas lingüísticos reales.', c:'#ff00b4' },
                { icon:'🎓', val:'Educación',     desc:'Comprometidos con el aprendizaje accesible y significativo.', c:'#9632ff' },
                { icon:'🤝', val:'Colaboración',  desc:'Tres mentes, una visión. El trabajo en equipo es nuestra fortaleza.', c:'#6400ff' },
                { icon:'⚡', val:'Eficiencia',    desc:'Resultados precisos y rápidos, sin sacrificar profundidad.', c:'#c060ff' },
                { icon:'🌐', val:'Accesibilidad', desc:'Tecnología de calidad disponible para todos, sin barreras.', c:'#ff00b4' },
                { icon:'🔬', val:'Rigor',         desc:'Análisis fundamentado en lingüística y ciencias de la computación.', c:'#9632ff' },
              ].map(v => (
                <div key={v.val} style={{ padding:'16px', borderRadius:12, background:'rgba(0,0,10,0.6)', border:`1px solid ${v.c}20`, textAlign:'center' }}>
                  <div style={{ fontSize:24, marginBottom:8 }}>{v.icon}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:v.c, marginBottom:5, letterSpacing:0.5 }}>{v.val}</div>
                  <div style={{ fontSize:11, color:'rgba(192,128,208,0.7)', lineHeight:1.5 }}>{v.desc}</div>
                </div>
              ))}
            </div>

            {/* Eslogan */}
            <div style={{ textAlign:'center', padding:'24px', borderRadius:16, background:'linear-gradient(135deg,rgba(255,0,180,0.08),rgba(150,50,255,0.12),rgba(100,0,255,0.08))', border:'1px solid rgba(150,50,255,0.2)' }}>
              <p style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', fontSize:20, color:'rgba(192,128,208,0.9)', letterSpacing:2, marginBottom:6 }}>
                "Las palabras son el código fuente de la humanidad."
              </p>
              <p style={{ fontSize:11, color:'rgba(150,50,255,0.5)', fontFamily:'var(--mono)', letterSpacing:2 }}>TRIXIS — τριξίς · 2026</p>
            </div>
          </div>
        )}

        {/* ════ ESTRATEGIA ════ */}
        {tab === 'mercado' && (
          <div style={{ animation:'fadeUp 0.5s ease' }}>
            <div style={{ textAlign:'center', marginBottom:36 }}>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:36, letterSpacing:4, background:'linear-gradient(135deg,#ffe0ff,#c060ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:10 }}>Estrategia de Mercado</h2>
              <p style={{ fontSize:14, color:'rgba(192,128,208,0.7)', maxWidth:560, margin:'0 auto' }}>Plan de lanzamiento y posicionamiento de TRIXIS como producto comercial.</p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
              {/* Público objetivo */}
              <div style={{ padding:'22px', borderRadius:16, background:'rgba(0,0,10,0.7)', border:'1px solid rgba(255,0,180,0.2)' }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:'#ff00b4', marginBottom:14, letterSpacing:1, fontFamily:'var(--mono)' }}>👥 PÚBLICO OBJETIVO</h3>
                {[
                  { seg:'Estudiantes universitarios', desc:'Ingeniería, lingüística, traducción', pct:'45%' },
                  { seg:'Docentes de idiomas',         desc:'Institutos y colegios',               pct:'25%' },
                  { seg:'Profesionales bilingües',     desc:'Empresas y call centers',             pct:'20%' },
                  { seg:'Entusiastas del lenguaje',    desc:'Autodidactas y curiosos',             pct:'10%' },
                ].map(s => (
                  <div key={s.seg} style={{ marginBottom:10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                      <span style={{ fontSize:12, color:'#ffe0ff', fontWeight:600 }}>{s.seg}</span>
                      <span style={{ fontSize:11, color:'#ff00b4', fontFamily:'var(--mono)', fontWeight:700 }}>{s.pct}</span>
                    </div>
                    <div style={{ fontSize:10, color:'rgba(150,50,255,0.6)', fontFamily:'var(--mono)', marginBottom:5 }}>{s.desc}</div>
                    <div style={{ height:6, background:'rgba(0,0,10,0.5)', borderRadius:3, overflow:'hidden' }}>
                      <div style={{ width:s.pct, height:'100%', background:'linear-gradient(90deg,#ff00b4,#9632ff)', borderRadius:3 }}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Precio y plataformas */}
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ padding:'22px', borderRadius:16, background:'rgba(0,0,10,0.7)', border:'1px solid rgba(150,50,255,0.2)', flex:1 }}>
                  <h3 style={{ fontSize:14, fontWeight:700, color:'#9632ff', marginBottom:14, letterSpacing:1, fontFamily:'var(--mono)' }}>💰 MODELO DE PRECIOS</h3>
                  {[
                    { plan:'Básico',     price:'Gratis',   desc:'Análisis básico, 10/día',     c:'rgba(192,128,208,0.6)' },
                    { plan:'Estudiantil', price:'Q25/mes', desc:'Ilimitado + historial',        c:'#9632ff' },
                    { plan:'Profesional', price:'Q75/mes', desc:'API + exportación + soporte',  c:'#ff00b4' },
                  ].map(p => (
                    <div key={p.plan} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, padding:'8px 10px', borderRadius:8, background:`rgba(0,0,10,0.4)`, border:`1px solid ${p.c}25` }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:p.c }}>{p.plan}</div>
                        <div style={{ fontSize:10, color:'rgba(150,50,255,0.5)', fontFamily:'var(--mono)' }}>{p.desc}</div>
                      </div>
                      <div style={{ fontSize:14, fontWeight:800, color:p.c, fontFamily:'var(--mono)' }}>{p.price}</div>
                    </div>
                  ))}
                </div>

                <div style={{ padding:'22px', borderRadius:16, background:'rgba(0,0,10,0.7)', border:'1px solid rgba(100,0,255,0.2)', flex:1 }}>
                  <h3 style={{ fontSize:14, fontWeight:700, color:'#6400ff', marginBottom:12, letterSpacing:1, fontFamily:'var(--mono)' }}>💻 PLATAFORMAS</h3>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {['🌐 Web App (React + Vite)','🔌 API REST (Anthropic)','📄 Archivos .txt'].map(p => (
                      <span key={p} style={{ fontSize:11, padding:'4px 10px', borderRadius:20, background:'rgba(100,0,255,0.15)', border:'1px solid rgba(100,0,255,0.3)', color:'rgba(192,128,208,0.9)', fontWeight:600 }}>{p}</span>
                    ))}
                  </div>
                  <p style={{ marginTop:12, fontSize:11, color:'rgba(150,50,255,0.6)', fontFamily:'var(--mono)', lineHeight:1.6 }}>
                    TRIXIS es una aplicación web que corre en cualquier navegador moderno. No requiere instalación. Accesible desde computadoras de escritorio y laptops.
                  </p>
                </div>
              </div>
            </div>

            {/* Propuesta de lanzamiento */}
            <div style={{ padding:'22px', borderRadius:16, background:'rgba(0,0,10,0.7)', border:'1px solid rgba(150,50,255,0.2)', marginBottom:16 }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:'#c060ff', marginBottom:14, letterSpacing:1, fontFamily:'var(--mono)' }}>🚀 PLAN DE LANZAMIENTO</h3>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
                {[
                  { fase:'Fase 1', plazo:'Mayo 2026', accion:'MVP y presentación universitaria', c:'#ff00b4' },
                  { fase:'Fase 2', plazo:'Jul 2026',  accion:'Beta pública y feedback de usuarios', c:'#9632ff' },
                  { fase:'Fase 3', plazo:'Sep 2026',  accion:'Versión premium con historial en la nube', c:'#6400ff' },
                  { fase:'Fase 4', plazo:'2027',      accion:'Expansión a más idiomas y mercados', c:'#c060ff' },
                ].map(f => (
                  <div key={f.fase} style={{ padding:'14px', borderRadius:10, background:`rgba(0,0,10,0.5)`, border:`1px solid ${f.c}25`, textAlign:'center' }}>
                    <div style={{ fontSize:10, color:f.c, fontFamily:'var(--mono)', fontWeight:700, letterSpacing:1, marginBottom:4 }}>{f.fase}</div>
                    <div style={{ fontSize:10, color:'rgba(150,50,255,0.5)', marginBottom:6, fontFamily:'var(--mono)' }}>{f.plazo}</div>
                    <div style={{ fontSize:11, color:'rgba(192,128,208,0.8)', lineHeight:1.5 }}>{f.accion}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ventajas */}
            <div style={{ padding:'22px', borderRadius:16, background:'linear-gradient(135deg,rgba(255,0,180,0.06),rgba(150,50,255,0.08),rgba(100,0,255,0.06))', border:'1px solid rgba(150,50,255,0.15)' }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:'#c060ff', marginBottom:12, letterSpacing:1, fontFamily:'var(--mono)' }}>✦ VENTAJAS COMPETITIVAS</h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                {[
                  'Único compilador lingüístico EN↔ES con análisis de 3 niveles',
                  'Árbol BNF interactivo descargable — sin competencia directa',
                  'Reconocimiento de voz integrado sin costo adicional',
                  'Desarrollado localmente — adaptado a Guatemala y Centroamérica',
                  'Código educativo transparente — ideal para instituciones',
                  'Gratuito en versión básica — barrera de entrada cero',
                ].map((v, i) => (
                  <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', padding:'8px 10px', borderRadius:8, background:'rgba(0,0,10,0.3)' }}>
                    <span style={{ color:'#9632ff', flexShrink:0, fontSize:14, lineHeight:1.4 }}>✓</span>
                    <span style={{ fontSize:12, color:'rgba(192,128,208,0.8)', lineHeight:1.5 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── CTA FLOTANTE ── */}
      <div style={{ position:'sticky', bottom:0, borderTop:'1px solid rgba(150,50,255,0.15)', background:'rgba(4,0,14,0.97)', backdropFilter:'blur(20px)', padding:'12px 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
        <div>
          <span style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:16, letterSpacing:3, background:'linear-gradient(135deg,#ff00b4,#9632ff,#6400ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>TRIXIS</span>
          <span style={{ fontSize:11, color:'rgba(150,50,255,0.4)', fontFamily:'var(--mono)', marginLeft:12, letterSpacing:1 }}>τριξίς · Compilador Lingüístico · UMG 2026</span>
        </div>
        <button onClick={onEnterApp} style={{ padding:'10px 28px', background:'linear-gradient(135deg,#ff00b4,#9632ff,#6400ff)', color:'#fff', fontSize:12, fontWeight:800, borderRadius:50, border:'none', cursor:'pointer', boxShadow:'0 0 24px rgba(150,50,255,0.4)', letterSpacing:1 }}>
          Ir al Compilador →
        </button>
      </div>
    </div>
  )
}
