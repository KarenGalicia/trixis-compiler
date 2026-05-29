export default function Header({ lang, onFlip, onHistory, onLanding, darkMode, onToggleDark }) {
  const s = (c, g) => ({ color:c, boxShadow:`0 0 8px ${g}` })
  return (
    <header style={{ background:'rgba(7,0,20,0.96)', borderBottom:'1px solid rgba(150,50,255,0.18)', position:'relative', overflow:'hidden' }}>
      {/* Fondo radial */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 30% 50%,rgba(255,0,180,0.06),transparent 50%),radial-gradient(ellipse at 70% 50%,rgba(100,0,255,0.05),transparent 50%)', pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'center', gap:'1.25rem', padding:'12px 1.5rem', flexWrap:'wrap' }}>

        {/* Brand */}
        <div style={{ display:'flex', alignItems:'center', gap:13, flex:1, minWidth:220 }}>
          {/* Logo ventana τριξίς */}
          <div style={{ position:'relative', flexShrink:0 }}>
            {/* Ventana principal */}
            <div style={{ width:72, height:44, borderRadius:10, background:'linear-gradient(135deg,rgba(30,0,60,0.97),rgba(10,0,30,0.99))', border:'1px solid rgba(150,50,255,0.55)', boxShadow:'0 0 18px rgba(150,50,255,0.35), 0 0 40px rgba(255,0,180,0.12), inset 0 1px 0 rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
              {/* Barra de título de ventana */}
              <div style={{ height:12, background:'rgba(150,50,255,0.18)', borderBottom:'1px solid rgba(150,50,255,0.22)', display:'flex', alignItems:'center', gap:3, padding:'0 6px' }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:'#ff00b4', boxShadow:'0 0 5px #ff00b4' }}/>
                <div style={{ width:5, height:5, borderRadius:'50%', background:'#9632ff', boxShadow:'0 0 5px #9632ff' }}/>
                <div style={{ width:5, height:5, borderRadius:'50%', background:'#6400ff', boxShadow:'0 0 5px #6400ff' }}/>
              </div>
              {/* Contenido: τριξίς */}
              <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', fontWeight:700, fontSize:17, letterSpacing:2, background:'linear-gradient(135deg,#ff00b4 0%,#c060ff 50%,#9632ff 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', filter:'drop-shadow(0 0 6px rgba(255,0,180,0.5))' }}>τριξίς</span>
              </div>
            </div>
          </div>
          <div>
            <h1 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:26, letterSpacing:5, background:'linear-gradient(135deg,#ff00b4,#9632ff,#6400ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1, marginBottom:4, filter:'drop-shadow(0 0 8px rgba(150,50,255,0.4))' }}>TRIXIS</h1>
            <div style={{ fontSize:10, color:'rgba(192,128,208,0.7)', display:'flex', alignItems:'center', gap:6, fontFamily:'var(--mono)' }}>
              Compilador Lingüístico
              <span style={{ fontSize:9, fontWeight:700, padding:'1px 7px', borderRadius:4, border:'1px solid rgba(255,0,180,0.4)', color:'#ff00b4', background:'rgba(255,0,180,0.1)', boxShadow:'0 0 8px rgba(255,0,180,0.25)', letterSpacing:1 }}>EN</span>
              <span style={{ color:'rgba(100,0,255,0.5)' }}>↔</span>
              <span style={{ fontSize:9, fontWeight:700, padding:'1px 7px', borderRadius:4, border:'1px solid rgba(100,0,255,0.4)', color:'#9632ff', background:'rgba(100,0,255,0.1)', boxShadow:'0 0 8px rgba(100,0,255,0.2)', letterSpacing:1 }}>ES</span>
            </div>
          </div>
        </div>

        {/* Fases */}
        <div style={{ display:'flex', gap:18, flexWrap:'wrap' }}>
          {[['Léxico','#ff00b4'],['Sintáctico','#9632ff'],['Semántico','#6400ff'],['Traducción','#c060ff']].map(([l,c]) => (
            <div key={l} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:c, boxShadow:`0 0 8px ${c}, 0 0 16px ${c}60`, flexShrink:0 }}/>
              <span style={{ fontSize:10, fontFamily:'var(--mono)', fontWeight:700, color:c, textShadow:`0 0 8px ${c}80`, letterSpacing:0.5 }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Extras toolbar */}
        <div style={{ display:'flex', gap:5, flexWrap:'wrap', alignItems:'center' }}>
          <button onClick={onToggleLive} style={{ padding:'5px 11px', fontSize:10, borderRadius:7, border:`1px solid ${liveMode?'#9632ff':'rgba(150,50,255,0.25)'}`, background: liveMode?'rgba(150,50,255,0.18)':'transparent', color: liveMode?'#c080ff':'rgba(150,50,255,0.5)', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:700, boxShadow: liveMode?'0 0 12px rgba(150,50,255,0.25)':'none' }}>
            ⚡ {liveMode ? 'LIVE ON' : 'LIVE'}
          </button>
          <button onClick={onToggleDark} title={darkMode?'Modo claro':'Modo oscuro'} style={{ padding:'5px 11px', fontSize:10, borderRadius:7, border:'1px solid rgba(150,50,255,0.2)', background:'transparent', color:'rgba(192,128,208,0.6)', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:700 }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={onLanding} style={{ padding:'5px 11px', fontSize:10, borderRadius:7, border:'1px solid rgba(150,50,255,0.2)', background:'transparent', color:'rgba(150,50,255,0.4)', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:700 }}>🏠 Empresa</button>
          <button onClick={onHistory} style={{ padding:'5px 11px', fontSize:10, borderRadius:7, border:'1px solid rgba(255,0,180,0.25)', background:'transparent', color:'rgba(255,0,180,0.5)', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:700 }}>📋 Historial</button>
        </div>

        {/* Lang switch */}
        <div style={{ display:'flex', alignItems:'center', gap:5, padding:'4px', background:'rgba(0,0,10,0.8)', border:'1px solid rgba(150,50,255,0.22)', borderRadius:12, boxShadow:'0 0 16px rgba(150,50,255,0.07)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:9, fontSize:11, fontWeight:600, ...(lang==='en' ? { background:'rgba(255,255,255,0.05)', color:'#ffe0ff', border:'1px solid rgba(150,50,255,0.28)', boxShadow:'0 0 10px rgba(150,50,255,0.14)' } : { color:'rgba(96,48,112,1)', border:'1px solid transparent' }) }}>
            🇺🇸 Inglés
          </div>
          <button onClick={onFlip} style={{ width:30, height:30, borderRadius:8, background:'rgba(0,0,10,0.7)', border:'1px solid rgba(255,255,255,0.09)', color:'rgba(192,128,208,0.7)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, cursor:'pointer' }}>⇄</button>
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:9, fontSize:11, fontWeight:600, ...(lang==='es' ? { background:'rgba(255,255,255,0.05)', color:'#ffe0ff', border:'1px solid rgba(150,50,255,0.28)', boxShadow:'0 0 10px rgba(150,50,255,0.14)' } : { color:'rgba(96,48,112,1)', border:'1px solid transparent' }) }}>
            🇪🇸 Español
          </div>
        </div>
      </div>

      <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(255,0,180,0.4),rgba(150,50,255,0.6),rgba(100,0,255,0.4),transparent)', boxShadow:'0 0 8px rgba(150,50,255,0.3)' }}/>
    </header>
  )
}
