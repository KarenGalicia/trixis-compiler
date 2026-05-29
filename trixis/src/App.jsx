import { useState, useRef, useCallback, useEffect } from 'react'
import { runLexer, runParser, buildSymTable, buildStats, buildAST, BNF_EN, BNF_ES } from './data/compiler.js'
import Splash        from './components/Splash.jsx'
import LandingPage   from './components/LandingPage.jsx'
import Header        from './components/Header.jsx'
import TranslatorPanel from './components/TranslatorPanel.jsx'
import PhaseBar      from './components/PhaseBar.jsx'
import ResultTabs    from './components/ResultTabs.jsx'
import StatsPanel    from './components/StatsPanel.jsx'
import HistoryPanel  from './components/HistoryPanel.jsx'

export const TYPE_STYLE = {
  DET:    { bg:'rgba(150,50,255,0.12)',  tc:'#c080ff', bd:'rgba(150,50,255,0.4)'  },
  PRON:   { bg:'rgba(255,0,180,0.12)',   tc:'#ff60c0', bd:'rgba(255,0,180,0.4)'   },
  VERB:   { bg:'rgba(0,220,180,0.10)',   tc:'#00ffcc', bd:'rgba(0,220,180,0.38)'  },
  NOUN:   { bg:'rgba(100,160,255,0.12)', tc:'#80b4ff', bd:'rgba(100,160,255,0.4)' },
  ADJ:    { bg:'rgba(255,180,0,0.10)',   tc:'#ffc040', bd:'rgba(255,180,0,0.38)'  },
  ADV:    { bg:'rgba(0,255,200,0.09)',   tc:'#40ffe0', bd:'rgba(0,255,200,0.35)'  },
  PREP:   { bg:'rgba(200,120,255,0.10)', tc:'#d080ff', bd:'rgba(200,120,255,0.38)'},
  CONJ:   { bg:'rgba(160,120,200,0.10)', tc:'#b090d0', bd:'rgba(160,120,200,0.35)'},
  NUM:    { bg:'rgba(0,220,255,0.09)',   tc:'#40e8ff', bd:'rgba(0,220,255,0.35)'  },
  INTERJ: { bg:'rgba(255,120,80,0.10)',  tc:'#ff9060', bd:'rgba(255,120,80,0.38)' },
  PUNCT:  { bg:'rgba(100,80,140,0.10)',  tc:'#8060a0', bd:'rgba(100,80,140,0.3)'  },
  CONTR:  { bg:'rgba(180,80,255,0.10)',  tc:'#c060ff', bd:'rgba(180,80,255,0.35)' },
}

export default function App() {
  const [screen,       setScreen]       = useState('splash')
  const [srcText,      setSrcText]      = useState('')
  const [outText,      setOutText]      = useState('')
  const [lang,         setLang]         = useState('en')
  const [tab,          setTab]          = useState('anotado')
  const [result,       setResult]       = useState(null)
  const [analyzing,    setAnalyzing]    = useState(false)
  const [translating,  setTranslating]  = useState(false)
  const [listening,    setListening]    = useState(false)
  const [phase,        setPhase]        = useState(0)
  const [history,      setHistory]      = useState([])
  const [showHistory,  setShowHistory]  = useState(false)
  const [showStats,    setShowStats]    = useState(false)
  const [liveMode,     setLiveMode]     = useState(false)
  const [speaking,     setSpeaking]     = useState(false)
  const [darkMode,     setDarkMode]     = useState(true)
  const [typedText,    setTypedText]    = useState('')
  const [showChart,    setShowChart]    = useState(false)
  const fileRef    = useRef(null)
  const recRef     = useRef(null)
  const liveTimer  = useRef(null)
  const typeTimer  = useRef(null)

  useEffect(() => {
    if (!liveMode || !srcText.trim()) return
    clearTimeout(liveTimer.current)
    liveTimer.current = setTimeout(() => doAnalyze(false), 800)
    return () => clearTimeout(liveTimer.current)
  }, [srcText, lang, liveMode])

  const doAnalyze = useCallback((withPhases = true) => {
    if (!srcText.trim()) return
    if (withPhases) { setAnalyzing(true); setPhase(0); setResult(null) }
    const d = withPhases ? 280 : 0
    setTimeout(() => { if (withPhases) setPhase(1) }, d)
    setTimeout(() => {
      const { tokens, lexErrors } = runLexer(srcText, lang)
      if (withPhases) setPhase(2)
      setTimeout(() => {
        const { errors: synErr, tree } = runParser(tokens, lang)
        if (withPhases) setPhase(3)
        setResult({ tokens, errors:[...lexErrors,...synErr], symTable:buildSymTable(tokens), tree, ast:buildAST(tokens), stats:buildStats(tokens) })
        if (withPhases) { setAnalyzing(false); setPhase(4); setTab('anotado') }
      }, withPhases ? 350 : 0)
    }, withPhases ? 350 : 0)
  }, [srcText, lang])

  const doTranslate = useCallback(async () => {
    if (!srcText.trim()) return
    setTranslating(true)
    try {
      const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY
      if (!API_KEY) {
        setOutText('⚠️ API Key no configurada. Crea el archivo .env con VITE_ANTHROPIC_API_KEY=tu-clave.')
        setTranslating(false)
        return
      }
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1000,
          system: 'You are a professional translator. Respond ONLY with valid JSON: {"translation":"..."}. No markdown, no explanation.',
          messages: [{ role: 'user', content: `Translate from ${lang === 'en' ? 'English to Spanish' : 'Spanish to English'}: "${srcText}"` }]
        })
      })
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}))
        setOutText(`❌ Error ${resp.status}: ${err?.error?.message || 'Revisa tu API Key en el archivo .env'}`)
        setTranslating(false)
        return
      }
      const data = await resp.json()
      const raw = data.content?.find(b => b.type === 'text')?.text || '{}'
      const { translation } = JSON.parse(raw.replace(/```json|```/g, '').trim())
      const tr = translation || 'Error en la traducción.'
      setTypedText('')
      clearTimeout(typeTimer.current)
      let i = 0
      const typeNext = () => {
        if (i <= tr.length) { setTypedText(tr.slice(0, i)); i++; typeTimer.current = setTimeout(typeNext, 18) }
        else setOutText(tr)
      }
      typeNext()
      setHistory(prev => [{ id: Date.now(), src: srcText, out: tr, lang, date: new Date().toLocaleString('es-GT'), errors: result?.errors?.length || 0, tokens: result?.tokens?.length || 0 }, ...prev.slice(0, 19)])
    } catch (e) {
      setOutText('❌ Error al conectar con el servicio de traducción. Verifica tu conexión y la API Key.')
    }
    setTranslating(false)
  }, [srcText, lang, result])

  const doAll = useCallback(() => { doAnalyze(); doTranslate() }, [doAnalyze, doTranslate])

  const speak = useCallback(() => {
    const text = outText || srcText; if (!text) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = outText ? (lang==='en'?'es-ES':'en-US') : (lang==='en'?'en-US':'es-ES')
    utt.rate = 0.9
    utt.onstart = () => setSpeaking(true); utt.onend = () => setSpeaking(false); utt.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utt)
  }, [srcText, outText, lang])

  const exportPDF = useCallback(() => {
    if (!result) return
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF()

      // Fondo oscuro
      doc.setFillColor(4, 0, 14)
      doc.rect(0, 0, 210, 297, 'F')

      // Título
      doc.setTextColor(192, 128, 255)
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.text('TRIXIS — REPORTE DE ANALISIS', 105, 20, { align: 'center' })

      doc.setTextColor(150, 50, 255)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.text('Compilador Linguistico EN <-> ES · UMG 2026', 105, 28, { align: 'center' })

      // Línea
      doc.setDrawColor(150, 50, 255)
      doc.line(15, 33, 195, 33)

      let y = 42

      // Texto analizado
      doc.setTextColor(255, 0, 180)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('TEXTO:', 15, y)
      doc.setTextColor(224, 192, 240)
      doc.setFont('helvetica', 'normal')
      const textoWrapped = doc.splitTextToSize(srcText, 160)
      doc.text(textoWrapped, 40, y)
      y += textoWrapped.length * 6 + 6

      // Traducción
      doc.setTextColor(255, 0, 180)
      doc.setFont('helvetica', 'bold')
      doc.text('TRADUCCION:', 15, y)
      doc.setTextColor(224, 192, 240)
      doc.setFont('helvetica', 'normal')
      const tradWrapped = doc.splitTextToSize(outText || '(sin traduccion)', 150)
      doc.text(tradWrapped, 52, y)
      y += tradWrapped.length * 6 + 6

      // Idioma
      doc.setTextColor(255, 0, 180)
      doc.setFont('helvetica', 'bold')
      doc.text('IDIOMA:', 15, y)
      doc.setTextColor(224, 192, 240)
      doc.setFont('helvetica', 'normal')
      doc.text(lang === 'en' ? 'EN -> ES' : 'ES -> EN', 40, y)
      y += 10

      // Línea
      doc.setDrawColor(100, 0, 255)
      doc.line(15, y, 195, y)
      y += 8

      // Tokens
      doc.setTextColor(255, 0, 180)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('TOKENS:', 15, y)
      y += 7

      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      result.tokens.forEach(t => {
        if (y > 270) { doc.addPage(); doc.setFillColor(4,0,14); doc.rect(0,0,210,297,'F'); y = 20 }
        doc.setTextColor(192, 128, 255)
        doc.text(`[${t.token}]`, 20, y)
        doc.setTextColor(224, 192, 240)
        doc.text(`"${t.value}" → ${t.cat}`, 50, y)
        y += 6
      })

      y += 4
      // Línea
      doc.setDrawColor(100, 0, 255)
      doc.line(15, y, 195, y)
      y += 8

      // Errores
      doc.setTextColor(255, 0, 180)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('ERRORES:', 15, y)
      y += 7

      if (result.errors.length === 0) {
        doc.setTextColor(100, 0, 255)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.text('Sin errores detectados', 20, y)
        y += 8
      } else {
        result.errors.forEach(e => {
          if (y > 270) { doc.addPage(); doc.setFillColor(4,0,14); doc.rect(0,0,210,297,'F'); y = 20 }
          doc.setTextColor(255, 150, 0)
          doc.setFontSize(9)
          doc.text(`[${e.kind}] "${e.word}": ${e.desc}`, 20, y)
          y += 6
        })
      }

      // Pie de página
      doc.setTextColor(100, 0, 255)
      doc.setFontSize(8)
      doc.text(`Generado por TRIXIS — ${new Date().toLocaleString('es-GT')}`, 105, 290, { align: 'center' })

      doc.save('TRIXIS_Reporte.pdf')
    })
  }, [result, srcText, outText, lang])

  const flip = () => { setSrcText(outText); setOutText(''); setLang(l=>l==='en'?'es':'en'); setResult(null); setPhase(0) }
  const handleFile = e => { const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>setSrcText(ev.target.result); r.readAsText(f); e.target.value='' }
  const toggleVoice = () => {
    if (listening) { recRef.current?.stop(); setListening(false); return }
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition
    if (!SR) { alert('Usa Chrome para reconocimiento de voz.'); return }
    const rec = new SR(); rec.lang=lang==='en'?'en-US':'es-ES'; rec.continuous=false; rec.interimResults=false
    rec.onresult=e=>setSrcText(p=>p+(p?' ':'')+e.results[0][0].transcript)
    rec.onend=()=>setListening(false); rec.onerror=()=>setListening(false)
    recRef.current=rec; rec.start(); setListening(true)
  }
  const clear = () => { setSrcText(''); setOutText(''); setResult(null); setPhase(0) }

  if (screen === 'splash')  return <Splash onEnter={() => setScreen('landing')} />
  if (screen === 'landing') return <LandingPage onEnterApp={() => setScreen('app')} />

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', animation:'fadeIn 0.5s ease', background: darkMode ? undefined : 'linear-gradient(135deg,#f0e6ff,#e6d0ff)', color: darkMode ? undefined : '#1a0030' }}>
      <Header lang={lang} onFlip={flip} liveMode={liveMode} onToggleLive={() => setLiveMode(l=>!l)} onHistory={() => setShowHistory(h=>!h)} onLanding={() => setScreen('landing')} darkMode={darkMode} onToggleDark={() => setDarkMode(d=>!d)} />

      <main style={{ flex:1, padding:'1.25rem 1.5rem', maxWidth:1100, margin:'0 auto', width:'100%' }}>
        {showHistory  && <HistoryPanel history={history} onClose={()=>setShowHistory(false)} onLoad={item=>{setSrcText(item.src);setOutText(item.out);setShowHistory(false)}} />}
        
        <div style={{ background: darkMode ? 'rgba(11,0,28,0.9)' : 'rgba(255,255,255,0.85)', border:'1px solid rgba(150,50,255,0.22)', borderRadius:18, overflow:'hidden', boxShadow:'0 0 0 1px rgba(255,255,255,0.02), 0 8px 50px rgba(0,0,0,0.4)', position:'relative' }}>
          <div style={{ height:1, background:'linear-gradient(90deg,transparent,#ff00b4,#9632ff,#6400ff,transparent)', boxShadow:'0 0 12px rgba(150,50,255,0.5)' }}/>
          <TranslatorPanel srcText={srcText} setSrcText={setSrcText} outText={outText} typedText={typedText} lang={lang} onAll={doAll} onAnalyze={()=>doAnalyze(true)} onTranslate={doTranslate} onVoice={toggleVoice} listening={listening} onSpeak={speak} onStopSpeak={()=>{window.speechSynthesis.cancel();setSpeaking(false)}} speaking={speaking} onFile={handleFile} fileRef={fileRef} onClear={clear} onExport={exportPDF} analyzing={analyzing} translating={translating} liveMode={liveMode} darkMode={darkMode}/>
          <PhaseBar phase={phase} analyzing={analyzing} />
          {result && (
            <div style={{ padding:'8px 14px', borderTop:'1px solid rgba(150,50,255,0.08)', display:'flex', gap:8 }}>
              <button onClick={()=>setShowStats(s=>!s)} style={{ padding:'5px 12px', fontSize:11, borderRadius:7, border:'1px solid rgba(150,50,255,0.25)', background:showStats?'rgba(150,50,255,0.15)':'transparent', color:showStats?'#c080ff':'rgba(150,50,255,0.6)', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:600 }}>📊 {showStats?'Ocultar':'Ver'} estadísticas</button>
              <button onClick={exportPDF} style={{ padding:'5px 12px', fontSize:11, borderRadius:7, border:'1px solid rgba(255,0,180,0.25)', background:'transparent', color:'rgba(255,0,180,0.6)', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:600 }}>📥 Exportar</button>
            </div>
          )}
          {showStats && result && <StatsPanel stats={result.stats} />}
          {!result && !analyzing && (
            <div style={{ textAlign:'center', padding:'2.5rem 1rem', borderTop:'1px solid rgba(100,0,255,0.08)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:16 }}>
                {['#ff00b4','#9632ff','#6400ff'].map((c,i)=><div key={i} style={{ width:12,height:12,borderRadius:'50%',background:c,boxShadow:`0 0 14px ${c}` }}/>)}
              </div>
              <p style={{ fontSize:14, fontWeight:600, color: darkMode?'rgba(255,224,255,0.6)':'rgba(80,0,140,0.7)', marginBottom:6 }}>{liveMode?'⚡ Modo LIVE activo — escribe para analizar':'Ingresa texto para comenzar el análisis'}</p>
              <p style={{ fontSize:11, color:'rgba(150,50,255,0.5)', fontFamily:'var(--mono)', letterSpacing:1 }}>LÉXICO · SINTÁCTICO · SEMÁNTICO · ÁRBOL BNF · TRADUCCIÓN · VOZ</p>
            </div>
          )}
          {result && <ResultTabs result={result} tab={tab} setTab={setTab} lang={lang} srcText={srcText} outText={outText}/>}
        </div>
      </main>

      <footer style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 1.5rem', borderTop:'1px solid rgba(150,50,255,0.1)', background:'rgba(4,0,14,0.9)', flexWrap:'wrap', gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontFamily:'Playfair Display,serif', fontWeight:900, fontSize:14, letterSpacing:4, background:'linear-gradient(135deg,#ff00b4,#9632ff,#6400ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>TRIXIS</span>
          <span style={{ fontFamily:'Playfair Display,serif', fontStyle:'italic', fontSize:12, color:'rgba(150,50,255,0.5)' }}>τριξίς</span>
        </div>
        <button onClick={()=>setScreen('landing')} style={{ fontSize:11, color:'rgba(150,50,255,0.5)', background:'transparent', border:'1px solid rgba(150,50,255,0.2)', borderRadius:6, padding:'4px 12px', cursor:'pointer', fontFamily:'var(--mono)' }}>← Inicio empresa</button>
        <span style={{ fontSize:10, color:'rgba(150,50,255,0.4)', fontFamily:'var(--mono)', letterSpacing:1 }}>Compilador Lingüístico EN ↔ ES · UMG · 2026</span>
        <div style={{ display:'flex', gap:6 }}>
          {['#ff00b4','#9632ff','#6400ff'].map((c,i)=><div key={i} style={{ width:7,height:7,borderRadius:'50%',background:c,boxShadow:`0 0 6px ${c}`,opacity:0.7 }}/>)}
        </div>
      </footer>
    </div>
  )
}