import { useState } from 'react'
import { runLexer, runParser } from '../data/compiler.js'

const EXERCISES = {
  en: [
    { sentence:"The student reads a book.", hint:"Artículo + Sustantivo + Verbo + Artículo + Sustantivo + Punt." },
    { sentence:"She can speak English well.", hint:"Pronombre + Modal + Verbo + Sustantivo + Adverbio + Punt." },
    { sentence:"I love learning languages!", hint:"Pronombre + Verbo + Verbo + Sustantivo + Punt." },
    { sentence:"The compiler analyzes the text correctly.", hint:"Artículo + Sustantivo + Verbo + Artículo + Sustantivo + Adverbio + Punt." },
    { sentence:"We must study every day.", hint:"Pronombre + Modal + Verbo + Det. + Sustantivo + Punt." },
  ],
  es: [
    { sentence:"El estudiante lee un libro.", hint:"Artículo + Sustantivo + Verbo + Artículo + Sustantivo + Punt." },
    { sentence:"Ella puede hablar español.", hint:"Pronombre + Modal + Verbo + Sustantivo + Punt." },
    { sentence:"Me gusta aprender idiomas.", hint:"Pronombre + Verbo + Verbo + Sustantivo + Punt." },
    { sentence:"El compilador analiza el texto.", hint:"Artículo + Sustantivo + Verbo + Artículo + Sustantivo + Punt." },
    { sentence:"Nosotros debemos estudiar cada día.", hint:"Pronombre + Modal + Verbo + Det. + Sustantivo + Punt." },
  ],
}

export default function PracticeMode({ lang, onClose }) {
  const [idx,    setIdx]    = useState(0)
  const [input,  setInput]  = useState('')
  const [result, setResult] = useState(null)
  const [score,  setScore]  = useState(0)
  const [tried,  setTried]  = useState(0)

  const exercises = EXERCISES[lang]
  const current   = exercises[idx]

  const check = () => {
    const { tokens, lexErrors } = runLexer(input, lang)
    const { errors: synErr }    = runParser(tokens, lang)
    const allErrors = [...lexErrors, ...synErr]
    const correct   = allErrors.length === 0 && input.trim() !== ''
    setResult({ correct, errors: allErrors, tokens })
    setTried(t => t+1)
    if (correct) setScore(s => s+1)
  }

  const next = () => {
    setIdx(i => (i+1) % exercises.length)
    setInput('')
    setResult(null)
  }

  const loadExample = () => { setInput(current.sentence); setResult(null) }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(4,0,14,0.94)', zIndex:500, display:'flex', flexDirection:'column', animation:'fadeIn 0.2s ease' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px', borderBottom:'1px solid rgba(150,50,255,0.2)', background:'rgba(7,0,20,0.98)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <h2 style={{ fontSize:16, fontWeight:800, color:'#ffe0ff', fontFamily:'var(--serif)', letterSpacing:2 }}>🎯 MODO PRÁCTICA</h2>
          <span style={{ fontSize:11, fontFamily:'var(--mono)', padding:'3px 10px', borderRadius:20, background:'rgba(150,50,255,0.2)', color:'#c080ff', border:'1px solid rgba(150,50,255,0.3)' }}>
            ✓ {score} / {tried} correctas
          </span>
        </div>
        <button onClick={onClose} style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,0,180,0.15)', border:'1px solid rgba(255,0,180,0.3)', color:'#ff00b4', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:24, maxWidth:700, margin:'0 auto', width:'100%' }}>

        {/* Ejercicio */}
        <div style={{ marginBottom:20, padding:'16px', borderRadius:12, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(150,50,255,0.2)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <span style={{ fontSize:10, fontFamily:'var(--mono)', fontWeight:700, padding:'2px 9px', borderRadius:20, background:'rgba(150,50,255,0.2)', color:'#c080ff', border:'1px solid rgba(150,50,255,0.3)' }}>Ejercicio {idx+1}/{exercises.length}</span>
            <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'rgba(96,48,112,1)' }}>{lang==='en'?'Inglés':'Español'}</span>
          </div>
          <p style={{ fontSize:13, color:'rgba(192,128,208,0.8)', marginBottom:8 }}>Escribe una oración gramaticalmente correcta en <strong style={{ color:'#c080ff' }}>{lang==='en'?'inglés':'español'}</strong>. Puedes inspirarte en:</p>
          <p style={{ fontSize:12, color:'rgba(96,48,112,0.7)', fontFamily:'var(--mono)', fontStyle:'italic' }}>💡 {current.hint}</p>
        </div>

        {/* Input */}
        <textarea
          value={input}
          onChange={e => { setInput(e.target.value); setResult(null) }}
          placeholder={`Escribe tu oración en ${lang==='en'?'inglés':'español'}…`}
          style={{ width:'100%', minHeight:80, padding:14, background:'rgba(0,0,10,0.7)', border:`1px solid ${result ? (result.correct?'rgba(100,0,255,0.4)':'rgba(255,0,180,0.4)') : 'rgba(150,50,255,0.22)'}`, borderRadius:10, color:'#ffe0ff', fontSize:14, fontFamily:'var(--font)', resize:'vertical', outline:'none', lineHeight:1.7, marginBottom:10 }}
        />

        {/* Botones */}
        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          <button onClick={check} style={{ padding:'9px 22px', background:'linear-gradient(135deg,#ff00b4,#9632ff)', color:'#fff', fontSize:13, fontWeight:700, borderRadius:50, border:'none', cursor:'pointer', boxShadow:'0 0 20px rgba(150,50,255,0.3)' }}>✓ Verificar</button>
          <button onClick={loadExample} style={{ padding:'9px 16px', background:'transparent', color:'rgba(150,50,255,0.6)', fontSize:12, fontWeight:600, borderRadius:8, border:'1px solid rgba(150,50,255,0.25)', cursor:'pointer', fontFamily:'var(--mono)' }}>Ver ejemplo</button>
          <button onClick={next} style={{ padding:'9px 16px', background:'transparent', color:'rgba(192,96,255,0.6)', fontSize:12, fontWeight:600, borderRadius:8, border:'1px solid rgba(192,96,255,0.25)', cursor:'pointer', fontFamily:'var(--mono)', marginLeft:'auto' }}>Siguiente →</button>
        </div>

        {/* Resultado */}
        {result && (
          <div style={{ padding:'14px', borderRadius:12, background: result.correct?'rgba(100,0,255,0.1)':'rgba(255,0,180,0.08)', border:`1px solid ${result.correct?'rgba(100,0,255,0.3)':'rgba(255,0,180,0.25)'}` }}>
            <p style={{ fontSize:14, fontWeight:700, color: result.correct?'#9632ff':'#ff00b4', marginBottom: result.errors.length?10:0 }}>
              {result.correct ? '🎉 ¡Correcto! Oración gramaticalmente válida.' : '❌ Hay errores en la oración.'}
            </p>
            {result.errors.map((e,i) => (
              <p key={i} style={{ fontSize:12, color:'rgba(192,128,208,0.8)', fontFamily:'var(--mono)', marginBottom:4 }}>
                <strong style={{ color:'#ff00b4' }}>[{e.kind}]</strong> {e.word && e.word!=='-' ? `"${e.word}" — ` : ''}{e.desc}
              </p>
            ))}
            {result.correct && (
              <div style={{ marginTop:10, display:'flex', flexWrap:'wrap', gap:5 }}>
                {result.tokens.filter(t=>t.type!=='PUNCT').map((t,i) => (
                  <span key={i} style={{ fontSize:10, fontFamily:'var(--mono)', padding:'2px 8px', borderRadius:4, background:'rgba(150,50,255,0.15)', border:'1px solid rgba(150,50,255,0.3)', color:'#c080ff' }}>
                    {t.value} <span style={{ opacity:0.6 }}>({t.token})</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
