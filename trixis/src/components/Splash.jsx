import { useEffect, useRef, useState } from 'react'

export default function Splash({ onEnter }) {
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    setTimeout(() => setReady(true), 300)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    // Partículas ultraviolet
    const COLORS = ['#ff00b4','#9632ff','#6400ff','#d060ff']
    const pts = Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.4,
      dx: (Math.random()-0.5)*0.35,
      dy: (Math.random()-0.5)*0.35,
      color: COLORS[i%4],
      alpha: Math.random()*0.6+0.15,
    }))

    // Edificios silueta
    const buildings = Array.from({ length: 20 }, (_, i) => ({
      x: (i / 20) * window.innerWidth * 1.1 - window.innerWidth*0.05,
      w: 30 + Math.random()*60,
      h: 60 + Math.random()*180,
      color: Math.random() > 0.5 ? 'rgba(255,0,180,0.18)' : 'rgba(100,0,255,0.15)',
    }))

    let offset = 0, raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      offset += 0.4

      // Grid ultraviolet
      ctx.lineWidth = 0.4
      const gs = 55
      for (let x = (offset%gs)-gs; x < canvas.width+gs; x+=gs) {
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height)
        ctx.strokeStyle = 'rgba(100,0,255,0.06)'; ctx.stroke()
      }
      for (let y = (offset%gs)-gs; y < canvas.height+gs; y+=gs) {
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y)
        ctx.strokeStyle = 'rgba(255,0,180,0.04)'; ctx.stroke()
      }

      // Edificios
      buildings.forEach(b => {
        ctx.fillStyle = b.color
        ctx.fillRect(b.x, canvas.height-b.h, b.w, b.h)
        ctx.strokeStyle = b.color.replace(/[\d.]+\)$/, '0.5)')
        ctx.lineWidth = 0.8
        ctx.strokeRect(b.x, canvas.height-b.h, b.w, b.h)
        // Ventanas
        for (let wy = canvas.height-b.h+8; wy < canvas.height-8; wy+=14) {
          for (let wx = b.x+4; wx < b.x+b.w-4; wx+=10) {
            if (Math.random() > 0.5) {
              ctx.fillStyle = Math.random()>0.5 ? 'rgba(255,0,180,0.6)' : 'rgba(150,50,255,0.5)'
              ctx.fillRect(wx, wy, 5, 5)
            }
          }
        }
      })

      // Reflejo neón en suelo
      const grad = ctx.createLinearGradient(0, canvas.height-40, 0, canvas.height)
      grad.addColorStop(0, 'rgba(150,50,255,0.2)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad; ctx.fillRect(0, canvas.height-40, canvas.width, 40)

      // Línea reflejo
      ctx.beginPath(); ctx.moveTo(0, canvas.height-42); ctx.lineTo(canvas.width, canvas.height-42)
      const lg = ctx.createLinearGradient(0,0,canvas.width,0)
      lg.addColorStop(0,'transparent'); lg.addColorStop(0.3,'#ff00b4')
      lg.addColorStop(0.7,'#9632ff'); lg.addColorStop(1,'transparent')
      ctx.strokeStyle = lg; ctx.lineWidth = 1.5; ctx.stroke()

      // Partículas
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill()
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r*3, 0, Math.PI*2)
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha*0.1; ctx.fill()
        p.x+=p.dx; p.y+=p.dy
        if(p.x<0||p.x>canvas.width) p.dx*=-1
        if(p.y<0||p.y>canvas.height) p.dy*=-1
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const enter = () => { setLeaving(true); setTimeout(onEnter, 600) }

  return (
    <div style={{
      position:'fixed', inset:0,
      background:'#04000e',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      zIndex:1000,
      opacity: leaving ? 0 : 1,
      transition:'opacity 0.6s ease',
    }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0 }}/>

      {/* Logo diamante τ grande */}
      <div style={{ position:'relative', zIndex:2, textAlign:'center', opacity: ready?1:0, transform: ready?'translateY(0)':'translateY(30px)', transition:'opacity 0.8s ease, transform 0.8s ease' }}>

        <svg width="90" height="90" viewBox="0 0 60 60" style={{ marginBottom:20 }}>
          <defs>
            <linearGradient id="splg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff00b4"/>
              <stop offset="50%" stopColor="#9632ff"/>
              <stop offset="100%" stopColor="#6400ff"/>
            </linearGradient>
            <filter id="splglow">
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <polygon points="30,5 50,25 30,55 10,25" fill="rgba(4,0,14,0.92)" stroke="url(#splg)" strokeWidth="2.5" filter="url(#splglow)"/>
          <line x1="30" y1="5" x2="30" y2="55" stroke="rgba(150,50,255,0.3)" strokeWidth="0.8"/>
          <line x1="10" y1="25" x2="50" y2="25" stroke="rgba(255,0,180,0.25)" strokeWidth="0.8"/>
          <line x1="10" y1="25" x2="30" y2="5" stroke="rgba(100,0,255,0.22)" strokeWidth="0.6"/>
          <line x1="50" y1="25" x2="30" y2="5" stroke="rgba(255,0,180,0.22)" strokeWidth="0.6"/>
          <text x="30" y="38" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="18" fontWeight="900" fill="url(#splg)" filter="url(#splglow)">τ</text>
          <circle cx="30" cy="5" r="3.5" fill="#ff00b4" opacity="0.95" filter="url(#splglow)"/>
        </svg>

        <h1 style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:72, letterSpacing:12, background:'linear-gradient(135deg,#ffe0ff,#ff00b4,#9632ff,#6400ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1, marginBottom:10, filter:'drop-shadow(0 0 24px rgba(150,50,255,0.6))' }}>TRIXIS</h1>

        <p style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', fontSize:16, color:'rgba(150,50,255,0.7)', letterSpacing:5, marginBottom:6, textShadow:'0 0 12px rgba(150,50,255,0.5)' }}>τριξίς</p>
        <p style={{ fontSize:10, color:'rgba(255,224,255,0.3)', letterSpacing:4, fontFamily:'var(--mono)', marginBottom:8 }}>COMPILADOR LINGÜÍSTICO INTELIGENTE</p>

        <div style={{ height:2, width:280, margin:'16px auto 28px', background:'linear-gradient(90deg,#ff00b4,#9632ff,#6400ff)', borderRadius:2, boxShadow:'0 0 16px rgba(150,50,255,0.6)' }}/>

        <div style={{ display:'flex', gap:12, justifyContent:'center', marginBottom:36 }}>
          {[{l:'Léxico',c:'#ff00b4'},{l:'Sintáctico',c:'#9632ff'},{l:'Semántico',c:'#6400ff'}].map(({l,c}) => (
            <div key={l} style={{ padding:'6px 16px', borderRadius:20, border:`1px solid ${c}`, background:`${c}20`, color:c, fontSize:10, fontWeight:700, fontFamily:'var(--mono)', letterSpacing:1, boxShadow:`0 0 14px ${c}60` }}>{l}</div>
          ))}
        </div>

        <button onClick={enter} style={{ padding:'14px 52px', background:'linear-gradient(135deg,#ff00b4,#7a00cc,#9632ff,#6400ff)', backgroundSize:'200%', color:'#fff', fontSize:13, fontWeight:800, letterSpacing:4, borderRadius:50, border:'none', cursor:'pointer', boxShadow:'0 0 40px rgba(150,50,255,0.5), 0 8px 30px rgba(0,0,0,0.5)', fontFamily:'var(--mono)', textTransform:'uppercase' }}
          onMouseOver={e => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 0 60px rgba(150,50,255,0.7), 0 12px 40px rgba(0,0,0,0.6)' }}
          onMouseOut={e  => { e.target.style.transform='translateY(0)';   e.target.style.boxShadow='0 0 40px rgba(150,50,255,0.5), 0 8px 30px rgba(0,0,0,0.5)' }}>
          INICIAR ›
        </button>

        <p style={{ marginTop:22, fontSize:10, color:'rgba(255,224,255,0.18)', fontFamily:'var(--mono)', letterSpacing:5 }}>ENGLISH  ↔  ESPAÑOL</p>
      </div>

      <p style={{ position:'absolute', bottom:20, fontSize:9, color:'rgba(150,50,255,0.2)', fontFamily:'var(--mono)', letterSpacing:2, zIndex:2, opacity: ready?1:0, transition:'opacity 1.2s ease' }}>
        UNIVERSIDAD MARIANO GÁLVEZ · COMPILADORES 2026
      </p>
    </div>
  )
}
