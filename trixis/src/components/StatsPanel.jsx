const TYPE_LABELS = {
  NOUN:'Sustantivos', VERB:'Verbos', ADJ:'Adjetivos', ADV:'Adverbios',
  DET:'Determinantes', PRON:'Pronombres', PREP:'Preposiciones',
  CONJ:'Conjunciones', NUM:'Numerales', INTERJ:'Interjecciones',
  PUNCT:'Puntuación', CONTR:'Contracciones',
}
const TYPE_COLORS = {
  NOUN:'#80b4ff', VERB:'#00ffcc', ADJ:'#ffc040', ADV:'#40ffe0',
  DET:'#c080ff', PRON:'#ff60c0', PREP:'#d080ff', CONJ:'#b090d0',
  NUM:'#40e8ff', INTERJ:'#ff9060', PUNCT:'#8060a0', CONTR:'#c060ff',
}

export default function StatsPanel({ stats }) {
  if (!stats || stats.length === 0) return null
  const max = Math.max(...stats.map(s => s.count), 1)
  const total = stats.reduce((a,s) => a+s.count, 0)

  return (
    <div style={{ padding:'12px 14px', borderTop:'1px solid rgba(150,50,255,0.1)', background:'rgba(0,0,10,0.6)' }}>
      <p style={{ fontSize:11, fontWeight:700, color:'rgba(192,96,255,0.8)', fontFamily:'var(--mono)', letterSpacing:1, marginBottom:12 }}>📊 DISTRIBUCIÓN DE CATEGORÍAS GRAMATICALES</p>
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        {stats.sort((a,b) => b.count-a.count).map(({ type, count }) => {
          const color = TYPE_COLORS[type] || '#888'
          const pct   = Math.round((count/total)*100)
          const bar   = Math.round((count/max)*100)
          return (
            <div key={type} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:9, fontFamily:'var(--mono)', fontWeight:700, color, width:90, flexShrink:0, letterSpacing:0.5 }}>{TYPE_LABELS[type]||type}</span>
              <div style={{ flex:1, height:14, background:'rgba(0,0,10,0.5)', borderRadius:7, overflow:'hidden', border:'1px solid rgba(150,50,255,0.12)' }}>
                <div style={{ width:`${bar}%`, height:'100%', background:`linear-gradient(90deg,${color}80,${color})`, borderRadius:7, boxShadow:`0 0 6px ${color}60`, transition:'width 0.5s ease' }}/>
              </div>
              <span style={{ fontSize:10, fontFamily:'var(--mono)', color, width:30, textAlign:'right', fontWeight:700 }}>{count}</span>
              <span style={{ fontSize:9, fontFamily:'var(--mono)', color:'rgba(96,48,112,1)', width:32, textAlign:'right' }}>{pct}%</span>
            </div>
          )
        })}
      </div>
      <p style={{ fontSize:10, color:'rgba(96,48,112,0.6)', fontFamily:'var(--mono)', marginTop:10, textAlign:'right' }}>Total: {total} tokens analizados</p>
    </div>
  )
}
