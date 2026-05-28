const STEPS = [
  { label:'Léxico',     color:'#ff00b4', glow:'rgba(255,0,180,0.5)'   },
  { label:'Sintáctico', color:'#9632ff', glow:'rgba(150,50,255,0.5)'  },
  { label:'Semántico',  color:'#6400ff', glow:'rgba(100,0,255,0.45)'  },
  { label:'Completado', color:'#c060ff', glow:'rgba(192,96,255,0.4)'  },
]

export default function PhaseBar({ phase, analyzing }) {
  if (phase === 0) return null
  return (
    <div style={{ display:'flex', alignItems:'center', padding:'9px 14px', background:'rgba(0,0,10,0.8)', borderBottom:'1px solid rgba(150,50,255,0.1)', flexWrap:'wrap', gap:4, rowGap:6 }}>
      {STEPS.map(({ label, color, glow }, i) => {
        const step   = i+1
        const done   = phase >= step
        const active = phase === step-1 && analyzing
        return (
          <div key={label} style={{ display:'flex', alignItems:'center', gap:6 }}>
            {i > 0 && <div style={{ width:30, height:1, margin:'0 2px', background: done?color:'rgba(100,0,255,0.15)', boxShadow: done?`0 0 6px ${glow}`:'none', transition:'background 0.4s' }}/>}
            <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:22, height:22, borderRadius:'50%', border:`1.5px solid ${done?color:active?color:'rgba(150,50,255,0.2)'}`, background: done?color:active?`${color}30`:'rgba(0,0,10,0.8)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow: done?`0 0 10px ${glow}, 0 0 22px ${glow}60`:active?`0 0 14px ${glow}`:'none', transition:'all 0.35s', zIndex:1 }}>
                {done && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              {active && <div style={{ position:'absolute', width:34, height:34, borderRadius:'50%', border:`1.5px solid ${color}`, opacity:0, animation:'pulsate 1.4s ease-out infinite' }}/>}
            </div>
            <span style={{ fontSize:10, fontWeight:700, fontFamily:'var(--mono)', color: done||active?color:'rgba(100,0,255,0.4)', whiteSpace:'nowrap', letterSpacing:0.5, textShadow: done?`0 0 8px ${glow}`:'none', transition:'color 0.3s' }}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
