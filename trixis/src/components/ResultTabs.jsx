import { TYPE_STYLE } from '../App.jsx'
import BNFTree from './BNFTree.jsx'
import { BNF_EN, BNF_ES } from '../data/compiler.js'

function Chip({ token, type }) {
  const s = TYPE_STYLE[type] || { bg:'#111', tc:'#777', bd:'#333' }
  return <span style={{ fontSize:10, padding:'2px 8px', borderRadius:5, background:s.bg, color:s.tc, border:`1px solid ${s.bd}`, fontFamily:'var(--mono)', fontWeight:700, letterSpacing:0.5 }}>{token}</span>
}

const TABS = [
  { id:'anotado',   icon:'◈', label:'Vista anotada'  },
  { id:'tokens',    icon:'⬡', label:'Tokens'         },
  { id:'simbolos',  icon:'⊞', label:'Símbolos'       },
  { id:'errores',   icon:'⚠', label:'Errores'        },
  { id:'grafica',   icon:'📈', label:'Gráfica'        },
  { id:'arbol',     icon:'⋔', label:'Árbol BNF'      },
  { id:'gramatica', icon:'{}', label:'Gramática BNF' },
]

const CAT_COLORS = {
  NOUN:'#80b4ff', VERB:'#00ffcc', ADJ:'#ffc040', ADV:'#40ffe0',
  PRON:'#ff60c0', DET:'#c080ff', PREP:'#d080ff', CONJ:'#b090d0',
  NUM:'#40e8ff',  INTERJ:'#ff9060', PUNCT:'#8060a0', CONTR:'#c060ff',
}
const CAT_LABELS = {
  NOUN:'Sustantivo', VERB:'Verbo', ADJ:'Adjetivo', ADV:'Adverbio',
  PRON:'Pronombre', DET:'Determinante', PREP:'Preposición', CONJ:'Conjunción',
  NUM:'Numeral', INTERJ:'Interjección', PUNCT:'Puntuación', CONTR:'Contracción',
}

function CategoryChart({ tokens }) {
  const counts = {}
  tokens.forEach(t => {
    const k = t.type || 'Otro'
    counts[k] = (counts[k] || 0) + 1
  })
  const total = tokens.length || 1
  const sorted = Object.entries(counts).sort((a,b) => b[1]-a[1])
  const max = sorted[0]?.[1] || 1

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <p style={{ fontSize:12, color:'rgba(96,48,112,1)', marginBottom:8, fontFamily:'var(--mono)' }}>
        Distribución de {tokens.length} tokens por categoría gramatical
      </p>
      {sorted.map(([type, count]) => {
        const color = CAT_COLORS[type] || '#9060b0'
        const pct = Math.round((count/total)*100)
        const barW = Math.round((count/max)*100)
        return (
          <div key={type} style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ width:88, fontSize:11, color, fontFamily:'var(--mono)', fontWeight:700, flexShrink:0, textAlign:'right' }}>
              {CAT_LABELS[type] || type}
            </span>
            <div style={{ flex:1, height:22, background:'rgba(0,0,10,0.5)', borderRadius:6, overflow:'hidden', border:'1px solid rgba(150,50,255,0.1)', position:'relative' }}>
              <div style={{ width:`${barW}%`, height:'100%', background:`linear-gradient(90deg,${color}90,${color})`, borderRadius:6, transition:'width 0.6s ease', boxShadow:`0 0 8px ${color}60` }}/>
              <span style={{ position:'absolute', left:8, top:'50%', transform:'translateY(-50%)', fontSize:10, color:'rgba(255,255,255,0.85)', fontFamily:'var(--mono)', fontWeight:700 }}>{count}</span>
            </div>
            <span style={{ width:34, fontSize:11, color:'rgba(150,50,255,0.7)', fontFamily:'var(--mono)', fontWeight:700, flexShrink:0 }}>{pct}%</span>
          </div>
        )
      })}
    </div>
  )
}

export default function ResultTabs({ result, tab, setTab, lang, srcText, outText }) {
  const errCount  = result.errors.length
  const critCount = result.errors.filter(e => e.kind !== 'Léxico').length
  const tokCount  = result.tokens.length
  const wrdCount  = result.tokens.filter(t => t.type !== 'PUNCT').length

  return (
    <div style={{ display:'flex', flexDirection:'column', borderTop:'1px solid rgba(150,50,255,0.12)' }}>

      {/* Status */}
      <div style={{ display:'flex', alignItems:'center', padding:'8px 14px', background:'rgba(0,0,10,0.8)', borderBottom:'1px solid rgba(100,0,255,0.08)', gap:12 }}>
        <span style={{ fontSize:11, padding:'3px 12px', borderRadius:20, border:'1px solid', fontWeight:600, fontFamily:'var(--mono)', ...(critCount>0 ? { background:'rgba(255,0,180,0.1)', color:'#ff00b4', borderColor:'rgba(255,0,180,0.35)' } : { background:'rgba(100,0,255,0.1)', color:'#9632ff', borderColor:'rgba(100,0,255,0.3)' }) }}>
          {critCount > 0 ? `⚠ ${critCount} error${critCount>1?'es':''} crítico${critCount>1?'s':''}` : '✓ Sintaxis correcta'}
        </span>
        <span style={{ fontSize:11, color:'rgba(96,48,112,1)', fontFamily:'var(--mono)' }}>
          {tokCount} tokens · {wrdCount} palabras · {errCount} errores
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', overflowX:'auto', background:'rgba(0,0,10,0.6)', borderBottom:'1px solid rgba(150,50,255,0.12)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ display:'flex', alignItems:'center', gap:5, padding:'10px 15px', fontSize:11, fontWeight: tab===t.id?700:500, color: tab===t.id?'#c060ff':'rgba(96,48,112,1)', background:'transparent', border:'none', borderBottom:`2px solid ${tab===t.id?'#c060ff':'transparent'}`, cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.15s', ...(tab===t.id?{background:'rgba(150,50,255,0.04)',textShadow:'0 0 8px rgba(192,96,255,0.4)'}:{}) }}>
            <span>{t.icon}</span>{t.label}
            {t.id==='errores' && errCount>0 && <span style={{ fontSize:9, padding:'1px 6px', borderRadius:4, background:'rgba(255,0,180,0.18)', color:'#ff00b4', fontWeight:700 }}>{errCount}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxHeight:460, overflowY:'auto', padding:14 }}>

        {/* VISTA ANOTADA */}
        {tab==='anotado' && (
          <div>
            <p style={{ fontSize:12, color:'rgba(96,48,112,1)', marginBottom:12, fontFamily:'var(--mono)' }}>Cada palabra marcada con su categoría. ~ = clasificación heurística.</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'10px 5px', alignItems:'flex-end', padding:16, background:'rgba(0,0,8,0.8)', borderRadius:12, border:'1px solid rgba(150,50,255,0.12)', marginBottom:14, boxShadow:'inset 0 0 30px rgba(0,0,0,0.4)' }}>
              {result.tokens.map((t,i) => {
                const s = TYPE_STYLE[t.type] || { bg:'#111', tc:'#555', bd:'#333' }
                return (
                  <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                    <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'2px 5px', borderRadius:4, border:`1px solid ${s.bd}`, color: t.unknown?'rgba(96,48,112,0.7)':s.tc, background:'rgba(0,0,0,0.3)', letterSpacing:0.5, fontWeight:700, opacity: t.unknown?0.65:1 }}>{t.token}{t.unknown?' ~':''}</span>
                    <span style={{ fontSize:15, fontWeight:500, padding:'0 3px 4px', borderBottom:`2px solid ${t.unknown?'rgba(96,48,112,0.3)':s.bd}`, color: t.unknown?'rgba(192,128,208,0.4)':'#ffe0ff' }}>{t.value}</span>
                  </div>
                )
              })}
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {Object.entries(TYPE_STYLE).map(([type, s]) => (
                <div key={type} style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, padding:'2px 9px', borderRadius:5, background:s.bg, border:`1px solid ${s.bd}`, fontFamily:'var(--mono)', color:s.tc, fontWeight:700 }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:s.tc, boxShadow:`0 0 4px ${s.tc}` }}/>{type}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOKENS */}
        {tab==='tokens' && (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead><tr style={{ background:'rgba(0,0,10,0.8)' }}>
                {['#','Lexema','Token','Categoría Gramatical','Tipo','✓'].map(h => (
                  <th key={h} style={{ padding:'8px 10px', textAlign:'left', fontSize:10, fontWeight:700, color:'rgba(96,48,112,1)', letterSpacing:1, textTransform:'uppercase', borderBottom:'1px solid rgba(150,50,255,0.15)' }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {result.tokens.map((t,i) => (
                  <tr key={i} style={{ borderBottom:'1px solid rgba(100,0,255,0.06)' }}
                    onMouseOver={e => e.currentTarget.style.background='rgba(150,50,255,0.04)'}
                    onMouseOut={e  => e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'7px 10px', color:'rgba(96,48,112,1)', fontFamily:'var(--mono)', fontSize:11 }}>{t.id}</td>
                    <td style={{ padding:'7px 10px', fontFamily:'var(--mono)', fontWeight:700, color:'#ffe0ff' }}>{t.value}</td>
                    <td style={{ padding:'7px 10px' }}><Chip token={t.token} type={t.type}/></td>
                    <td style={{ padding:'7px 10px', color:'rgba(192,128,208,0.8)', fontSize:11 }}>{t.cat}</td>
                    <td style={{ padding:'7px 10px' }}><span style={{ fontSize:10, padding:'2px 7px', borderRadius:4, background:'rgba(0,0,10,0.5)', color:'rgba(150,50,255,0.6)', fontFamily:'var(--mono)', border:'1px solid rgba(100,0,255,0.15)' }}>{t.type}</span></td>
                    <td style={{ padding:'7px 10px', textAlign:'center', fontSize:12, color: t.unknown?'#ff00b4':'#9632ff', fontWeight:700 }}>{t.unknown?'~':'✓'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SÍMBOLOS */}
        {tab==='simbolos' && (
          <div style={{ overflowX:'auto' }}>
            <p style={{ fontSize:12, color:'rgba(96,48,112,1)', marginBottom:10, fontFamily:'var(--mono)' }}>{result.symTable.length} palabras únicas identificadas</p>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead><tr style={{ background:'rgba(0,0,10,0.8)' }}>
                {['Lexema','Categoría','Tipo','Token','Frec.'].map(h => (
                  <th key={h} style={{ padding:'8px 10px', textAlign:'left', fontSize:10, fontWeight:700, color:'rgba(96,48,112,1)', letterSpacing:1, textTransform:'uppercase', borderBottom:'1px solid rgba(150,50,255,0.15)' }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {result.symTable.map((s,i) => (
                  <tr key={i} style={{ borderBottom:'1px solid rgba(100,0,255,0.06)' }}
                    onMouseOver={e => e.currentTarget.style.background='rgba(150,50,255,0.04)'}
                    onMouseOut={e  => e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'7px 10px', fontFamily:'var(--mono)', fontWeight:700, color:'#ffe0ff' }}>{s.word}</td>
                    <td style={{ padding:'7px 10px', color:'rgba(192,128,208,0.8)', fontSize:11 }}>{s.cat}</td>
                    <td style={{ padding:'7px 10px' }}><span style={{ fontSize:10, padding:'2px 7px', borderRadius:4, background:'rgba(0,0,10,0.5)', color:'rgba(150,50,255,0.6)', fontFamily:'var(--mono)', border:'1px solid rgba(100,0,255,0.15)' }}>{s.type}</span></td>
                    <td style={{ padding:'7px 10px' }}><Chip token={s.token} type={s.type}/></td>
                    <td style={{ padding:'7px 10px', textAlign:'center', fontWeight:800, color:'#ff00b4', fontSize:14, textShadow:'0 0 8px rgba(255,0,180,0.4)' }}>{s.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ERRORES */}
        {tab==='errores' && (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {result.errors.length === 0 ? (
              <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
                <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(100,0,255,0.1)', border:'1px solid rgba(100,0,255,0.35)', color:'#9632ff', fontSize:26, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:'0 0 20px rgba(100,0,255,0.2)' }}>✓</div>
                <p style={{ fontSize:16, fontWeight:700, color:'#ffe0ff', marginBottom:6 }}>Sin errores detectados</p>
                <p style={{ fontSize:12, color:'rgba(96,48,112,1)', fontFamily:'var(--mono)' }}>El texto pasó los tres análisis correctamente</p>
              </div>
            ) : result.errors.map((e,i) => {
              const KS = {
                Léxico:     { bg:'rgba(255,165,0,0.08)',  tc:'#ffa500', bd:'rgba(255,165,0,0.3)'  },
                Sintáctico: { bg:'rgba(255,0,180,0.08)',  tc:'#ff00b4', bd:'rgba(255,0,180,0.3)'  },
                Semántico:  { bg:'rgba(150,50,255,0.08)', tc:'#9632ff', bd:'rgba(150,50,255,0.3)' },
              }
              const k = KS[e.kind] || { bg:'#111', tc:'#777', bd:'#333' }
              return (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'10px 13px', borderRadius:10, background:k.bg, border:`1px solid ${k.bd}` }}>
                  <span style={{ fontSize:10, fontWeight:700, fontFamily:'var(--mono)', padding:'2px 9px', borderRadius:4, border:`1px solid ${k.bd}`, color:k.tc, background:'rgba(0,0,0,0.3)', whiteSpace:'nowrap', letterSpacing:0.5, marginTop:1 }}>{e.kind}</span>
                  <div style={{ flex:1, display:'flex', flexWrap:'wrap', gap:5, alignItems:'baseline' }}>
                    {e.word && e.word!=='-' && <span style={{ fontFamily:'var(--mono)', fontSize:13, fontWeight:700, color:k.tc }}>"{e.word}"</span>}
                    {e.pos  && e.pos!=='-'  && <span style={{ fontSize:10, color:'rgba(96,48,112,1)', fontFamily:'var(--mono)' }}>pos.{e.pos}</span>}
                    <span style={{ fontSize:12, color:'rgba(192,128,208,0.8)' }}>{e.desc}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* GRÁFICA DE CATEGORÍAS */}
        {tab==='grafica' && (
          <div style={{ padding:'4px 0' }}>
            <CategoryChart tokens={result.tokens} />
          </div>
        )}

        {/* ÁRBOL BNF */}
        {tab==='arbol' && (
          <div>
            <p style={{ fontSize:12, color:'rgba(96,48,112,1)', marginBottom:12, fontFamily:'var(--mono)' }}>Árbol de derivación sintáctica — interactivo</p>
            {result.tree
              ? <BNFTree tree={result.tree} lang={lang}/>
              : <p style={{ fontSize:12, color:'#ff00b4', fontFamily:'var(--mono)' }}>No se pudo generar el árbol. Verifica que el texto tenga al menos un verbo.</p>
            }
          </div>
        )}

        {/* GRAMÁTICA BNF */}
        {tab==='gramatica' && (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[[lang==='en'?'EN':'ES', lang==='en'?BNF_EN:BNF_ES, '#ff00b4'],
              [lang==='en'?'ES':'EN', lang==='en'?BNF_ES:BNF_EN, '#9632ff']
            ].map(([badge, bnf, color]) => (
              <div key={badge}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                  <span style={{ fontSize:11, fontWeight:700, fontFamily:'var(--mono)', padding:'3px 10px', borderRadius:5, background:color, color:'#fff', letterSpacing:1 }}>{badge}</span>
                  <span style={{ fontSize:12, fontWeight:500, color:'rgba(192,128,208,0.7)' }}>Gramática BNF — {badge==='EN'?'Inglés':'Español'}</span>
                </div>
                <pre style={{ padding:14, background:'rgba(0,0,8,0.8)', borderRadius:12, border:'1px solid rgba(150,50,255,0.12)', fontSize:11, lineHeight:1.85, overflowX:'auto', color:'rgba(192,128,208,0.85)', fontFamily:'var(--mono)', boxShadow:'inset 0 0 20px rgba(0,0,0,0.3)' }}>{bnf}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

