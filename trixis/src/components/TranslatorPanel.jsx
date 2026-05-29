import { useState } from 'react'

export default function TranslatorPanel({
  srcText, setSrcText, outText, typedText, lang,
  onAll, onAnalyze, onTranslate,
  onVoice, listening, onSpeak, onStopSpeak, speaking,
  onFile, fileRef, onClear, onExport,
  analyzing, translating, liveMode, darkMode,
}) {
  const [copied, setCopied] = useState(false)
  const words = srcText.trim() ? srcText.trim().split(/\s+/).length : 0
  const chars = srcText.length
  const srcL  = lang==='en' ? 'Inglés' : 'Español'
  const tgtL  = lang==='en' ? 'Español' : 'Inglés'

  const displayOut = typedText !== undefined && typedText !== '' && typedText !== outText
    ? typedText + '▌'
    : outText

  const copyTranslation = () => {
    if (!outText) return
    navigator.clipboard.writeText(outText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const dm = darkMode !== false // default dark

  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      {/* Text panels */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 44px 1fr', borderBottom:'1px solid rgba(150,50,255,0.1)' }}>

        {/* Entrada */}
        <div style={{ display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderBottom:'1px solid rgba(100,0,255,0.06)', background:'rgba(255,255,255,0.01)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:9, height:9, borderRadius:'50%', background:'#ff00b4', boxShadow:'0 0 9px #ff00b4, 0 0 20px rgba(255,0,180,0.4)' }}/>
              <span style={{ fontSize:12, fontWeight:700, color: dm?'#ffe0ff':'#1a0030', letterSpacing:0.5 }}>{srcL}</span>
              <span style={{ fontSize:9, color:'rgba(96,48,112,1)', fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:4, background:'rgba(0,0,10,0.5)', border:'1px solid rgba(100,0,255,0.12)', letterSpacing:1 }}>
                {liveMode ? '⚡ LIVE' : 'entrada'}
              </span>
            </div>
            {/* Contador palabras/caracteres */}
            <span style={{ fontSize:10, color:'rgba(150,50,255,0.6)', fontFamily:'var(--mono)' }}>
              {words} pal · {chars} car
            </span>
          </div>
          <textarea
            value={srcText}
            onChange={e => setSrcText(e.target.value)}
            placeholder={`Escribe o pega texto en ${srcL}…`}
            spellCheck={false}
            style={{ flex:1, padding:14, background:'transparent', border:'none', color: dm?'#e0c0f0':'#2a004a', fontSize:14, lineHeight:1.75, resize:'none', minHeight:155, fontFamily:'var(--font)' }}
          />
          <div style={{ padding:'7px 14px', borderTop:'1px solid rgba(100,0,255,0.05)' }}>
            <span style={{ fontSize:10, color:'rgba(96,48,112,0.6)', fontFamily:'var(--mono)', letterSpacing:0.5 }}>
              {listening ? '🔴 Escuchando… habla ahora' : 'Ctrl+Enter para analizar y traducir'}
            </span>
          </div>
        </div>

        {/* Divisor */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', borderLeft:'1px solid rgba(100,0,255,0.06)', borderRight:'1px solid rgba(100,0,255,0.06)', background:'rgba(150,50,255,0.015)' }}>
          <div style={{ flex:1, width:1, background:'linear-gradient(to bottom,transparent,rgba(150,50,255,0.3),transparent)' }}/>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(0,0,10,0.7)', border:'1px solid rgba(150,50,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 0 14px rgba(150,50,255,0.18)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
              <defs><linearGradient id="arrg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff00b4"/><stop offset="50%" stopColor="#9632ff"/><stop offset="100%" stopColor="#6400ff"/></linearGradient></defs>
              <path d="M5 12h14M12 5l7 7-7 7" stroke="url(#arrg)"/>
            </svg>
          </div>
          <div style={{ flex:1, width:1, background:'linear-gradient(to bottom,transparent,rgba(150,50,255,0.3),transparent)' }}/>
        </div>

        {/* Salida */}
        <div style={{ display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderBottom:'1px solid rgba(100,0,255,0.06)', background:'rgba(255,255,255,0.01)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:9, height:9, borderRadius:'50%', background:'#6400ff', boxShadow:'0 0 9px #6400ff, 0 0 20px rgba(100,0,255,0.4)' }}/>
              <span style={{ fontSize:12, fontWeight:700, color: dm?'#ffe0ff':'#1a0030', letterSpacing:0.5 }}>{tgtL}</span>
              <span style={{ fontSize:9, color:'rgba(96,48,112,1)', fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:4, background:'rgba(0,0,10,0.5)', border:'1px solid rgba(100,0,255,0.12)', letterSpacing:1 }}>traducción</span>
            </div>
            <div style={{ display:'flex', gap:6, alignItems:'center' }}>
              {translating && <span style={{ fontSize:10, color:'#9632ff', fontFamily:'var(--mono)', display:'flex', alignItems:'center', gap:5 }}><span style={{ width:10, height:10, borderRadius:'50%', border:'2px solid rgba(150,50,255,0.2)', borderTopColor:'#9632ff', display:'inline-block', animation:'spin 0.7s linear infinite' }}/> traduciendo…</span>}
              {!translating && outText && <span style={{ fontSize:11, color:'#6400ff', fontFamily:'var(--mono)', textShadow:'0 0 8px rgba(100,0,255,0.5)' }}>✓ listo</span>}
              {/* Botón Copiar */}
              {outText && (
                <button onClick={copyTranslation} title="Copiar traducción" style={{ padding:'3px 8px', fontSize:10, borderRadius:5, border:`1px solid ${copied?'rgba(0,220,180,0.5)':'rgba(100,0,255,0.3)'}`, background: copied?'rgba(0,220,180,0.1)':'transparent', color: copied?'#00ffcc':'rgba(100,0,255,0.6)', cursor:'pointer', fontFamily:'var(--mono)', transition:'all 0.2s' }}>
                  {copied ? '✓ copiado' : '📋'}
                </button>
              )}
              {outText && (
                <button onClick={speaking ? onStopSpeak : onSpeak} style={{ padding:'3px 8px', fontSize:10, borderRadius:5, border:`1px solid ${speaking?'rgba(255,0,180,0.4)':'rgba(100,0,255,0.3)'}`, background:'transparent', color: speaking?'#ff00b4':'rgba(100,0,255,0.6)', cursor:'pointer', fontFamily:'var(--mono)' }}>
                  {speaking ? '⏹' : '🔊'}
                </button>
              )}
            </div>
          </div>
          {/* Panel salida con typing effect */}
          <textarea
            value={displayOut}
            readOnly
            placeholder="La traducción aparecerá aquí…"
            style={{ flex:1, padding:14, background:'transparent', border:'none', color: dm?'rgba(192,128,208,0.9)':'#3a006a', fontSize:14, lineHeight:1.75, resize:'none', minHeight:155, fontFamily:'var(--font)', cursor:'default' }}
          />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'11px 14px', flexWrap:'wrap', background:'rgba(255,255,255,0.005)' }}>
        <button onClick={onAll} style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 22px', background:'linear-gradient(135deg,#ff00b4,#7a00cc,#9632ff)', color:'#fff', fontSize:13, fontWeight:800, borderRadius:50, boxShadow:'0 0 28px rgba(150,50,255,0.4), 0 5px 18px rgba(0,0,0,0.4)', letterSpacing:0.5, cursor:'pointer', border:'none' }}
          onMouseOver={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 0 44px rgba(150,50,255,0.6), 0 8px 24px rgba(0,0,0,0.5)'}}
          onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 0 28px rgba(150,50,255,0.4), 0 5px 18px rgba(0,0,0,0.4)'}}>
          ▶ Analizar y Traducir
        </button>

        {[
          { label: analyzing ? 'Analizando…' : 'Analizar',  onClick: onAnalyze,  disabled: analyzing },
          { label: translating ? 'Traduciendo…' : 'Traducir', onClick: onTranslate, disabled: translating },
        ].map(({label, onClick, disabled}) => (
          <button key={label} onClick={onClick} disabled={disabled} style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 13px', background:'rgba(0,0,10,0.5)', color:'rgba(192,128,208,0.85)', fontSize:11, fontWeight:600, borderRadius:9, border:'1px solid rgba(150,50,255,0.22)', cursor: disabled?'not-allowed':'pointer', opacity: disabled?0.4:1 }}>
            {label}
          </button>
        ))}

        <div style={{ display:'flex', gap:4 }}>
          {[
            { label: listening?'Detener':'🎤 Voz', onClick: onVoice, active: listening },
            { label:'📄 .txt',  onClick: () => fileRef.current?.click() },
            { label:'🗑 Limpiar', onClick: onClear },
          ].map(({label, onClick, active}) => (
            <button key={label} onClick={onClick} style={{ display:'flex', alignItems:'center', gap:4, padding:'7px 11px', background: active?'rgba(255,0,180,0.12)':'rgba(0,0,10,0.4)', color: active?'#ff00b4':'rgba(96,48,112,1)', fontSize:11, borderRadius:9, border:`1px solid ${active?'rgba(255,0,180,0.35)':'rgba(255,255,255,0.08)'}`, cursor:'pointer', boxShadow: active?'0 0 10px rgba(255,0,180,0.2)':'none' }}>
              {label}
            </button>
          ))}
          <input ref={fileRef} type="file" accept=".txt" style={{ display:'none' }} onChange={onFile}/>
        </div>
      </div>
    </div>
  )
}
