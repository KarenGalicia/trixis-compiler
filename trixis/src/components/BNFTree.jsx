import { useState, useRef, useCallback, useEffect } from 'react'

const NODE_COLORS = {
  S:'#ff00b4', O:'#ff00b4',
  NP:'#9632ff', SN:'#9632ff',
  VP:'#6400ff', SV:'#6400ff',
  PP:'#c060ff', SP:'#c060ff',
  DEFAULT:'#503080'
}

const TOKEN_COLORS = {
  VERB:'#00ffcc', VERB_MOD:'#00ffcc',
  NOUN:'#80b4ff', SUST:'#80b4ff',
  ADJ:'#ffc040',
  ADV_MODO:'#40ffe0', ADV_TIEMPO:'#40ffe0', ADV_LUGAR:'#40ffe0',
  ADV_CANT:'#40ffe0', ADV_NEG:'#ff6060', ADV_AFIRM:'#80ff80', ADV_DUDA:'#ffa040',
  PRON_PERS:'#ff60c0', PRON_DEM:'#ff60c0', PRON_INT:'#ff60c0', PRON_REFL:'#ff60c0',
  DET_INDEF:'#c080ff', POS_DET:'#c080ff',
  ART_DEF:'#c080ff', ART_INDEF:'#c080ff',
  PREP:'#d080ff',
  CONJ_COORD:'#b090d0', CONJ_SUB:'#b090d0', CONJ_DIST:'#b090d0',
  CONJ_EXPLIC:'#b090d0', CONJ_CONSEC:'#b090d0', CONJ_COMP:'#b090d0', CONJ_FIN:'#b090d0',
  NUM_CARD:'#40e8ff', NUM_ORD:'#40e8ff',
  INTERJ:'#ff9060',
  CONTR:'#c060ff',
  PUNT_FIN:'#8060a0', PUNT_COMA:'#8060a0', PUNT_EXCL:'#ff9060', PUNT_INT:'#40e8ff',
}

const NODE_DESCRIPTIONS = {
  S:'Sentence — Oración completa en inglés',
  O:'Oración — Oración completa en español',
  NP:'Noun Phrase — Frase nominal (sujeto o complemento)',
  SN:'Sintagma Nominal — Frase nominal en español',
  VP:'Verb Phrase — Frase verbal (predicado)',
  SV:'Sintagma Verbal — Frase verbal en español',
  PP:'Prepositional Phrase — Frase preposicional',
  SP:'Sintagma Preposicional — Frase preposicional en español',
  ART_DEF:'Artículo Definido — Determina un sustantivo conocido (the, el, la)',
  ART_INDEF:'Artículo Indefinido — Introduce un sustantivo nuevo (a, an, un, una)',
  SUST:'Sustantivo — Nombre de persona, cosa o lugar',
  VERB:'Verbo — Acción principal de la oración',
  VERB_MOD:'Verbo Modal — Expresa posibilidad o necesidad (can, must, should)',
  ADJ:'Adjetivo — Modifica o califica al sustantivo',
  ADV_MODO:'Adverbio de Modo — Indica cómo ocurre la acción',
  ADV_TIEMPO:'Adverbio de Tiempo — Indica cuándo ocurre',
  ADV_LUGAR:'Adverbio de Lugar — Indica dónde ocurre',
  ADV_CANT:'Adverbio de Cantidad — Indica cuánto',
  ADV_NEG:'Adverbio de Negación — Niega la acción (not, no)',
  PRON_PERS:'Pronombre Personal — Sustituye a una persona (I, you, he, she)',
  PREP:'Preposición — Relaciona palabras en la oración',
  CONJ_COORD:'Conjunción Coordinante — Une elementos del mismo nivel',
  CONJ_SUB:'Conjunción Subordinante — Introduce proposición dependiente',
  INTERJ:'Interjección — Expresa emoción o sentimiento',
  CONTR:'Contracción — Fusión de dos palabras (don\'t, can\'t, al, del)',
}

// ── Calcular posiciones de nodos en el árbol ──────────────────
function layoutTree(node, depth = 0, counter = { val: 0 }) {
  if (!node) return null
  const laid = { ...node, depth, x: 0, y: depth * 90, children: [] }
  if (node.children && node.children.length > 0) {
    laid.children = node.children.map(c => layoutTree(c, depth + 1, counter))
    const xs = laid.children.map(c => c.x)
    laid.x = (Math.min(...xs) + Math.max(...xs)) / 2
  } else {
    laid.x = counter.val * 110
    counter.val++
  }
  return laid
}

function fixPositions(node) {
  if (!node) return
  if (node.children && node.children.length > 0) {
    node.children.forEach(fixPositions)
    const xs = node.children.map(c => c.x)
    node.x = (Math.min(...xs) + Math.max(...xs)) / 2
  }
}

function countLeaves(node) {
  if (!node) return 0
  if (!node.children || node.children.length === 0) return 1
  return node.children.reduce((s, c) => s + countLeaves(c), 0)
}

function assignX(node, start = 0, gap = 110) {
  if (!node) return start
  if (!node.children || node.children.length === 0) {
    node.x = start + gap / 2
    return start + gap
  }
  let cur = start
  node.children.forEach(c => { cur = assignX(c, cur, gap) })
  const xs = node.children.map(c => c.x)
  node.x = (Math.min(...xs) + Math.max(...xs)) / 2
  return cur
}

function collectNodes(node, result = []) {
  if (!node) return result
  result.push(node)
  if (node.children) node.children.forEach(c => collectNodes(c, result))
  return result
}

function collectEdges(node, result = []) {
  if (!node || !node.children) return result
  node.children.forEach(c => {
    result.push({ x1: node.x, y1: node.y, x2: c.x, y2: c.y, color: NODE_COLORS[node.label] || '#9632ff' })
    collectEdges(c, result)
  })
  return result
}

// ── Componente principal ──────────────────────────────────────
export default function BNFTree({ tree, lang }) {
  const [zoom, setZoom]       = useState(1)
  const [pan,  setPan]        = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [nodeInfo, setNodeInfo]   = useState(null)
  const svgRef = useRef(null)

  if (!tree) return (
    <div style={{ textAlign:'center', padding:'2rem', color:'rgba(150,50,255,0.5)', fontFamily:'var(--mono)', fontSize:13 }}>
      No se pudo generar el árbol. Verifica que el texto tenga al menos un verbo.
    </div>
  )

  // Layout
  const root = JSON.parse(JSON.stringify(tree))
  assignX(root, 0, 120)
  root.y = 0
  const assignY = (n, d = 0) => { n.y = d * 90; if (n.children) n.children.forEach(c => assignY(c, d + 1)) }
  assignY(root)

  const nodes = collectNodes(root)
  const edges = collectEdges(root)

  const allX = nodes.map(n => n.x)
  const allY = nodes.map(n => n.y)
  const minX = Math.min(...allX) - 70
  const maxX = Math.max(...allX) + 70
  const minY = 0
  const maxY = Math.max(...allY) + 80

  const svgW = Math.max(maxX - minX, 400)
  const svgH = maxY - minY + 60

  const handleWheel = e => {
    e.preventDefault()
    setZoom(z => Math.max(0.3, Math.min(3, z - e.deltaY * 0.001)))
  }

  const handleMouseDown = e => {
    setDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }
  const handleMouseMove = e => {
    if (!dragging || !dragStart) return
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }
  const handleMouseUp = () => setDragging(false)

  const handleNodeClick = node => {
    const desc = NODE_DESCRIPTIONS[node.label] || (node.leaf ? `Token: "${node.leaf}"` : `Nodo: ${node.label}`)
    setNodeInfo({ label: node.label, desc, leaf: node.leaf })
  }

  const downloadSVG = () => {
    const el = svgRef.current
    if (!el) return
    const data = new XMLSerializer().serializeToString(el)
    const blob = new Blob([data], { type: 'image/svg+xml' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'TRIXIS_ArbolBNF.svg'
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>

      {/* Toolbar */}
      <div style={{ display:'flex', gap:6, alignItems:'center', flexWrap:'wrap' }}>
        <span style={{ fontSize:11, color:'rgba(150,50,255,0.6)', fontFamily:'var(--mono)' }}>
          Zoom: {Math.round(zoom * 100)}%
        </span>
        {[['−', () => setZoom(z => Math.max(0.3, z - 0.15))],
          ['+', () => setZoom(z => Math.min(3,   z + 0.15))],
          ['Reset', () => { setZoom(1); setPan({ x:0, y:0 }) }]
        ].map(([l, fn]) => (
          <button key={l} onClick={fn} style={{ padding:'4px 10px', fontSize:11, borderRadius:6, border:'1px solid rgba(150,50,255,0.3)', background:'rgba(0,0,10,0.5)', color:'rgba(192,128,208,0.8)', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:700 }}>{l}</button>
        ))}
        <button onClick={downloadSVG} style={{ padding:'4px 12px', fontSize:11, borderRadius:6, border:'1px solid rgba(255,0,180,0.3)', background:'rgba(255,0,180,0.1)', color:'#ff00b4', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:700 }}>📥 Descargar SVG</button>
        <span style={{ fontSize:10, color:'rgba(100,0,255,0.4)', fontFamily:'var(--mono)' }}>Arrastra · Scroll=zoom · Click en nodo = info</span>
      </div>

      {/* Info del nodo */}
      {nodeInfo && (
        <div style={{ padding:'8px 12px', borderRadius:8, background:'rgba(150,50,255,0.1)', border:'1px solid rgba(150,50,255,0.3)', display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ fontSize:11, fontWeight:700, fontFamily:'var(--mono)', color:'#c080ff' }}>{nodeInfo.label}</span>
          {nodeInfo.leaf && <span style={{ fontSize:11, color:'#ff00b4', fontFamily:'var(--mono)' }}>"{nodeInfo.leaf}"</span>}
          <span style={{ fontSize:11, color:'rgba(192,128,208,0.8)', flex:1 }}>{nodeInfo.desc}</span>
          <button onClick={() => setNodeInfo(null)} style={{ background:'transparent', border:'none', color:'rgba(150,50,255,0.5)', cursor:'pointer', fontSize:18 }}>×</button>
        </div>
      )}

      {/* SVG del árbol */}
      <div
        style={{ overflow:'hidden', background:'rgba(0,0,8,0.9)', borderRadius:12, border:'1px solid rgba(150,50,255,0.2)', minHeight:280, cursor:dragging?'grabbing':'grab', position:'relative', boxShadow:'inset 0 0 40px rgba(0,0,0,0.5)' }}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg
          ref={svgRef}
          width={svgW} height={svgH}
          style={{ transform:`translate(${pan.x}px,${pan.y}px) scale(${zoom})`, transformOrigin:'top center', display:'block', overflow:'visible', padding:'20px' }}
          viewBox={`${minX} ${minY - 20} ${svgW} ${svgH}`}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow2">
              <feGaussianBlur stdDeviation="5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Aristas */}
          {edges.map((e, i) => (
            <line key={i}
              x1={e.x1} y1={e.y1 + 16} x2={e.x2} y2={e.y2 - 16}
              stroke={e.color} strokeWidth={1.5} strokeOpacity={0.5}
              strokeDasharray="none"
            />
          ))}

          {/* Nodos */}
          {nodes.map((n, i) => {
            const isLeaf   = !n.children || n.children.length === 0
            const bgColor  = isLeaf ? (TOKEN_COLORS[n.label] || '#c080ff') : (NODE_COLORS[n.label] || '#503080')
            const rx = isLeaf ? 6 : 8

            if (isLeaf) {
              // Nodo hoja — token terminal
              const w = Math.max(n.leaf ? n.leaf.length * 9 + 20 : 60, 60)
              return (
                <g key={i} style={{ cursor:'pointer' }} onClick={() => handleNodeClick(n)}>
                  {/* Token label arriba */}
                  <rect x={n.x - 30} y={n.y - 26} width={60} height={18} rx={4}
                    fill="rgba(0,0,10,0.7)" stroke={bgColor} strokeWidth={0.8} strokeOpacity={0.4}/>
                  <text x={n.x} y={n.y - 13} textAnchor="middle"
                    fill={bgColor} fontSize={9} fontFamily="monospace" fontWeight="bold">
                    {n.label}
                  </text>
                  {/* Línea vertical pequeña */}
                  <line x1={n.x} y1={n.y - 8} x2={n.x} y2={n.y - 2} stroke={bgColor} strokeWidth={1} strokeOpacity={0.5}/>
                  {/* Caja de la palabra */}
                  <rect x={n.x - w/2} y={n.y} width={w} height={26} rx={rx}
                    fill="rgba(0,0,15,0.8)" stroke={bgColor} strokeWidth={1.5}
                    filter="url(#glow2)"/>
                  <text x={n.x} y={n.y + 17} textAnchor="middle"
                    fill="#ffe0ff" fontSize={13} fontFamily="monospace" fontWeight="600">
                    {n.leaf || n.label}
                  </text>
                </g>
              )
            }

            // Nodo interno — categoría gramatical
            const w = Math.max(n.label.length * 9 + 20, 50)
            return (
              <g key={i} style={{ cursor:'pointer' }} onClick={() => handleNodeClick(n)}>
                <rect x={n.x - w/2} y={n.y - 14} width={w} height={28} rx={rx}
                  fill={bgColor} stroke={bgColor} strokeWidth={1}
                  filter="url(#glow)"/>
                <text x={n.x} y={n.y + 4} textAnchor="middle"
                  fill="white" fontSize={12} fontFamily="Arial, sans-serif" fontWeight="bold">
                  {n.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Leyenda */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {[
          ['S/O','Oración','#ff00b4'],
          ['NP/SN','Frase nominal','#9632ff'],
          ['VP/SV','Frase verbal','#6400ff'],
          ['PP/SP','Frase preposicional','#c060ff'],
          ['Nodos rosas','Tokens terminales','#ffe0ff'],
        ].map(([l,d,c]) => (
          <div key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'rgba(192,128,208,0.7)' }}>
            <div style={{ width:9, height:9, borderRadius:2, background:c, boxShadow:`0 0 4px ${c}` }}/>
            <strong style={{ color:c, fontFamily:'var(--mono)', fontSize:9 }}>{l}</strong>
            <span>— {d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
