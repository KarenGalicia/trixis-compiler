import { useState, useRef, useCallback } from 'react'

const NODE_COLORS = { S:'#ff00b4', O:'#ff00b4', NP:'#9632ff', SN:'#9632ff', VP:'#6400ff', SV:'#6400ff', PP:'#c060ff', SP:'#c060ff' }

function TreeNode({ node, depth=0, onNodeClick, selectedNode }) {
  if (!node) return null
  const bg = NODE_COLORS[node.label] || '#503060'
  const isSelected = selectedNode === node.label

  if (node.leaf) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'0 5px' }}>
      <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'2px 6px', borderRadius:4, background:'rgba(0,0,10,0.5)', border:'1px solid rgba(150,50,255,0.2)', color:'rgba(192,128,208,0.8)' }}>{node.label}</span>
      <div style={{ width:1, height:12, background:'rgba(150,50,255,0.3)' }}/>
      <span style={{ fontSize:12, fontFamily:'var(--mono)', fontWeight:600, color:'#ffe0ff', padding:'3px 10px', background:'rgba(0,0,10,0.6)', borderRadius:5, border:'1px solid rgba(150,50,255,0.2)', cursor:'pointer', transition:'all 0.15s', ...(isSelected?{background:'rgba(150,50,255,0.2)',borderColor:'rgba(150,50,255,0.5)'}:{}) }}
        onClick={() => onNodeClick && onNodeClick(node)}>
        "{node.leaf}"
      </span>
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ padding:'4px 14px', borderRadius:6, background:bg, color:'#fff', fontSize:11, fontWeight:700, fontFamily:'var(--mono)', letterSpacing:0.5, cursor:'pointer', boxShadow:`0 0 12px ${bg}80, 0 2px 8px rgba(0,0,0,0.4)`, transition:'transform 0.15s', ...(isSelected?{transform:'scale(1.05)',boxShadow:`0 0 20px ${bg}`}:{}) }}
        onClick={() => onNodeClick && onNodeClick(node)}>
        {node.label}
      </div>
      {node.children?.length > 0 && (
        <>
          <div style={{ width:1, height:14, background:'rgba(150,50,255,0.4)' }}/>
          <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
            {node.children.map((c,i) => <TreeNode key={i} node={c} depth={depth+1} onNodeClick={onNodeClick} selectedNode={selectedNode}/>)}
          </div>
        </>
      )}
    </div>
  )
}

const NODE_DESCRIPTIONS = {
  S:'Sentence — Oración completa en inglés',
  O:'Oración — Oración completa en español',
  NP:'Noun Phrase — Frase nominal en inglés',
  SN:'Sintagma Nominal — Frase nominal en español',
  VP:'Verb Phrase — Frase verbal en inglés',
  SV:'Sintagma Verbal — Frase verbal en español',
  PP:'Prepositional Phrase — Frase preposicional en inglés',
  SP:'Sintagma Preposicional — Frase preposicional en español',
  ART_DEF:'Artículo Definido — Determina un sustantivo conocido',
  ART_INDEF:'Artículo Indefinido — Introduce un sustantivo nuevo',
  SUST:'Sustantivo — Nombre de persona, cosa o lugar',
  VERB:'Verbo — Acción o estado del sujeto',
  VERB_MOD:'Verbo Modal — Expresa posibilidad o necesidad',
  ADJ:'Adjetivo — Modifica o califica al sustantivo',
  ADV_TIEMPO:'Adverbio de Tiempo — Indica cuándo ocurre la acción',
  ADV_LUGAR:'Adverbio de Lugar — Indica dónde ocurre la acción',
  ADV_MODO:'Adverbio de Modo — Indica cómo ocurre la acción',
  ADV_CANT:'Adverbio de Cantidad — Indica cuánto',
  ADV_NEG:'Adverbio de Negación — Niega la acción',
  ADV_AFIRM:'Adverbio de Afirmación — Confirma la acción',
  ADV_DUDA:'Adverbio de Duda — Expresa incertidumbre',
  PREP:'Preposición — Relaciona palabras en la oración',
  CONJ_COORD:'Conjunción Coordinante — Une elementos del mismo nivel',
  CONJ_SUB:'Conjunción Subordinante — Introduce proposición dependiente',
  PRON_PERS:'Pronombre Personal — Sustituye a una persona',
  PRON_DEM:'Pronombre Demostrativo — Señala un elemento',
  PRON_INT:'Pronombre Interrogativo — Introduce pregunta',
  PRON_REFL:'Pronombre Reflexivo — La acción recae sobre el sujeto',
  POS_DET:'Determinante Posesivo — Indica pertenencia',
  DET_INDEF:'Determinante Indefinido — Cantidad indefinida',
  NUM_CARD:'Numeral Cardinal — Número de cantidad',
  NUM_ORD:'Numeral Ordinal — Número de orden',
  CONTR:'Contracción — Fusión de dos palabras',
  INTERJ:'Interjección — Expresa emoción o sentimiento',
  PUNT_FIN:'Punto final — Cierre de oración',
  PUNT_COMA:'Coma — Separación de elementos',
  PUNT_EXCL:'Signo de exclamación — Énfasis o emoción',
  PUNT_INT:'Signo de interrogación — Pregunta directa',
  PUNT_PCOMA:'Punto y coma — Separación de cláusulas',
}

export default function BNFTree({ tree, lang }) {
  const [zoom, setZoom]   = useState(1)
  const [pan,  setPan]    = useState({ x:0, y:0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [nodeInfo, setNodeInfo] = useState(null)
  const containerRef = useRef(null)

  const handleNodeClick = useCallback(node => {
    setSelectedNode(node.label)
    const desc = NODE_DESCRIPTIONS[node.label] || `Nodo: ${node.label}${node.leaf ? ` → "${node.leaf}"` : ''}`
    setNodeInfo({ label: node.label, desc, leaf: node.leaf })
  }, [])

  const handleMouseDown = e => { setDragging(true); setDragStart({ x: e.clientX-pan.x, y: e.clientY-pan.y }) }
  const handleMouseMove = e => { if (!dragging || !dragStart) return; setPan({ x: e.clientX-dragStart.x, y: e.clientY-dragStart.y }) }
  const handleMouseUp   = () => setDragging(false)
  const handleWheel     = e => { e.preventDefault(); setZoom(z => Math.max(0.4, Math.min(2.5, z - e.deltaY*0.001))) }

  // Descargar árbol como PNG
  const downloadTree = () => {
    const el = containerRef.current
    if (!el) return
    // Canvas approach
    const canvas = document.createElement('canvas')
    canvas.width  = el.scrollWidth  + 60
    canvas.height = el.scrollHeight + 60
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#04000e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#ffe0ff'
    ctx.font = '14px JetBrains Mono'
    ctx.fillText('TRIXIS — Árbol BNF / τριξίς', 20, 30)

    // Usa html2canvas approach simplificado - SVG export
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
      <rect width="100%" height="100%" fill="#04000e"/>
      <text x="20" y="30" fill="#ffe0ff" font-size="14" font-family="monospace">TRIXIS — Árbol de Derivación BNF — τριξίς</text>
      <foreignObject x="10" y="50" width="${canvas.width-20}" height="${canvas.height-60}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="background:#04000e;padding:10px;color:#ffe0ff;font-family:monospace;font-size:11px;">
          ${generateTextTree(tree)}
        </div>
      </foreignObject>
    </svg>`

    const blob = new Blob([svgStr], { type:'image/svg+xml' })
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
          Zoom: {Math.round(zoom*100)}%
        </span>
        {[['−', () => setZoom(z=>Math.max(0.4,z-0.15))], ['+', () => setZoom(z=>Math.min(2.5,z+0.15))], ['Reset', () => {setZoom(1);setPan({x:0,y:0})}]].map(([l,fn]) => (
          <button key={l} onClick={fn} style={{ padding:'4px 10px', fontSize:11, borderRadius:6, border:'1px solid rgba(150,50,255,0.25)', background:'rgba(0,0,10,0.5)', color:'rgba(192,128,208,0.8)', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:700 }}>{l}</button>
        ))}
        <button onClick={downloadTree} style={{ padding:'4px 12px', fontSize:11, borderRadius:6, border:'1px solid rgba(255,0,180,0.3)', background:'rgba(255,0,180,0.1)', color:'#ff00b4', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:700 }}>📥 Descargar SVG</button>
        <span style={{ fontSize:10, color:'rgba(100,0,255,0.4)', fontFamily:'var(--mono)' }}>Arrastra · Scroll=zoom · Click en nodo = info</span>
      </div>

      {/* Info del nodo seleccionado */}
      {nodeInfo && (
        <div style={{ padding:'8px 12px', borderRadius:8, background:'rgba(150,50,255,0.1)', border:'1px solid rgba(150,50,255,0.3)', display:'flex', gap:10, alignItems:'flex-start' }}>
          <span style={{ fontSize:11, fontWeight:700, fontFamily:'var(--mono)', color:'#c080ff', flexShrink:0 }}>{nodeInfo.label}</span>
          {nodeInfo.leaf && <span style={{ fontSize:11, color:'#ff00b4', fontFamily:'var(--mono)' }}>"{nodeInfo.leaf}"</span>}
          <span style={{ fontSize:11, color:'rgba(192,128,208,0.8)' }}>{nodeInfo.desc}</span>
          <button onClick={() => { setNodeInfo(null); setSelectedNode(null) }} style={{ marginLeft:'auto', background:'transparent', border:'none', color:'rgba(150,50,255,0.5)', cursor:'pointer', fontSize:16, flexShrink:0 }}>×</button>
        </div>
      )}

      {/* Árbol interactivo */}
      <div
        style={{ overflow:'hidden', background:'rgba(0,0,8,0.8)', borderRadius:12, border:'1px solid rgba(150,50,255,0.15)', minHeight:250, cursor: dragging?'grabbing':'grab', position:'relative' }}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div ref={containerRef} style={{ transform:`translate(${pan.x}px,${pan.y}px) scale(${zoom})`, transformOrigin:'top center', padding:'24px 20px', display:'inline-flex', flexDirection:'column', alignItems:'center', minWidth:'100%', userSelect:'none' }}>
          <TreeNode node={tree} depth={0} onNodeClick={handleNodeClick} selectedNode={selectedNode}/>
        </div>
      </div>

      {/* Leyenda */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {[['S/O','Oración','#ff00b4'],['NP/SN','Frase nominal','#9632ff'],['VP/SV','Frase verbal','#6400ff'],['PP/SP','Frase preposicional','#c060ff']].map(([l,d,c]) => (
          <div key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'rgba(192,128,208,0.7)' }}>
            <div style={{ width:10, height:10, borderRadius:2, background:c, boxShadow:`0 0 5px ${c}` }}/>
            <strong style={{ color:c, fontFamily:'var(--mono)', fontSize:10 }}>{l}</strong>
            <span>— {d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function generateTextTree(node, indent=0) {
  if (!node) return ''
  const pad = '  '.repeat(indent)
  if (node.leaf) return `${pad}[${node.label}] "${node.leaf}"\n`
  let out = `${pad}${node.label}\n`
  if (node.children) node.children.forEach(c => { out += generateTextTree(c, indent+1) })
  return out
}
