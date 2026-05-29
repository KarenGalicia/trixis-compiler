import { EN_DICT, ES_DICT, PUNCT_MAP } from './dictionary.js'

/* ════════════════════════════════════════
   LEXER
════════════════════════════════════════ */
export function runLexer(text, lang) {
  const dict = lang === 'en' ? EN_DICT : ES_DICT
  const tokens = [], errors = []
  const raw = text.match(/[¿¡]|[\wáéíóúüñÁÉÍÓÚÜÑ']+|[.,!?;:()"]/g) || []

  raw.forEach((w, idx) => {
    const lower = w.toLowerCase()
    if (PUNCT_MAP[w]) { tokens.push({ id:idx+1, value:w, lower, pos:idx+1, ...PUNCT_MAP[w] }); return }
    if (/^\d+$/.test(w)) { tokens.push({ id:idx+1, value:w, lower, pos:idx+1, cat:'Numeral Cardinal', type:'NUM', token:'NUM_CARD' }); return }
    if (dict[lower]) { tokens.push({ id:idx+1, value:w, lower, pos:idx+1, ...dict[lower] }); return }

    if (lang==='en' && /n't$/i.test(w)) { tokens.push({ id:idx+1, value:w, lower, pos:idx+1, cat:'Contracción neg.', type:'VERB', token:'VERB', unknown:true }); return }
    if (lang==='en' && /'s$/i.test(w))  { tokens.push({ id:idx+1, value:w, lower, pos:idx+1, cat:'Contracción pos.', type:'DET',  token:'CONTR', unknown:true }); return }

    let gCat='Sustantivo', gType='NOUN', gToken='SUST'
    if (lang==='en') {
      if (/ly$/.test(lower))                         { gCat='Adv. Modo';    gType='ADV';  gToken='ADV_MODO' }
      else if (/tion$|ness$|ment$|ity$/.test(lower)) { gCat='Sustantivo' }
      else if (/ing$/.test(lower))                   { gCat='Verbo ger.';   gType='VERB'; gToken='VERB' }
      else if (/ed$/.test(lower))                    { gCat='Verbo pas.';   gType='VERB'; gToken='VERB' }
      else if (/ful$|less$|ous$|ive$|able$|al$/.test(lower)) { gCat='Adjetivo'; gType='ADJ'; gToken='ADJ' }
    } else {
      if (/mente$/.test(lower))                      { gCat='Adv. Modo';   gType='ADV';  gToken='ADV_MODO' }
      else if (/ción$|sión$|dad$|ura$/.test(lower))  { gCat='Sustantivo' }
      else if (/ando$|iendo$/.test(lower))           { gCat='Verbo ger.';  gType='VERB'; gToken='VERB' }
      else if (/ado$|ido$/.test(lower))              { gCat='Verbo part.'; gType='VERB'; gToken='VERB' }
      else if (/oso$|osa$|ivo$|iva$|able$|ible$/.test(lower)) { gCat='Adjetivo'; gType='ADJ'; gToken='ADJ' }
    }

    tokens.push({ id:idx+1, value:w, lower, pos:idx+1, cat:gCat, type:gType, token:gToken, unknown:true })
    errors.push({ kind:'Léxico', pos:idx+1, word:w, desc:`"${w}" no encontrada en el diccionario. Clasificada heurísticamente como: ${gCat}.` })
  })

  return { tokens, lexErrors: errors }
}

/* ════════════════════════════════════════
   PARSER + SEMÁNTICO
════════════════════════════════════════ */
export function runParser(tokens, lang) {
  const errors = []
  const wt = tokens.filter(t => t.type !== 'PUNCT')

  if (!wt.length) return { errors:[{ kind:'Sintáctico', pos:'-', word:'-', desc:'No hay palabras para analizar.' }], tree:null }

  if (!wt.some(t => t.type === 'VERB'))
    errors.push({ kind:'Sintáctico', pos:'-', word:'-', desc:'La oración no contiene ningún verbo.' })

  for (let i=1; i<wt.length; i++)
    if (wt[i].type==='DET' && wt[i-1].type==='DET')
      errors.push({ kind:'Sintáctico', pos:wt[i].pos, word:wt[i].value, desc:`Determinantes consecutivos: "${wt[i-1].value} ${wt[i].value}".` })

  if (lang==='en' && wt.filter(t=>t.token==='ADV_NEG').length >= 2)
    errors.push({ kind:'Semántico', pos:'-', word:'-', desc:'Doble negación detectada.' })

  const last = tokens[tokens.length-1]
  if (last && last.type !== 'PUNCT')
    errors.push({ kind:'Semántico', pos:last.pos, word:last.value, desc:'La oración no termina con signo de puntuación.' })

  const hasSubj = wt.some(t => t.type==='PRON' || t.type==='NOUN')
  const hasVerb = wt.some(t => t.type==='VERB')
  if (hasVerb && !hasSubj)
    errors.push({ kind:'Semántico', pos:'-', word:'-', desc:'No se detectó sujeto explícito.' })

  return { errors, tree: buildTree(wt, lang) }
}

/* ════════════════════════════════════════
   ÁRBOL DE DERIVACIÓN
════════════════════════════════════════ */
export function buildTree(wt, lang) {
  const isEN = lang === 'en'
  const root = { label: isEN ? 'S' : 'O', type: 'root', children: [] }
  let i = 0

  const np = { label: isEN ? 'NP' : 'SN', type: 'np', children: [] }
  while (i < wt.length && ['DET','PRON','NUM','ADJ'].includes(wt[i].type)) {
    np.children.push({ label: wt[i].token, leaf: wt[i].value, type: wt[i].type }); i++
    if (i < wt.length && wt[i].type === 'NOUN') {
      np.children.push({ label: wt[i].token, leaf: wt[i].value, type: wt[i].type }); i++
      break
    }
  }
  if (i < wt.length && wt[i].type === 'NOUN' && !np.children.length) {
    np.children.push({ label: wt[i].token, leaf: wt[i].value, type: wt[i].type }); i++
  }
  if (np.children.length) root.children.push(np)

  const vp = { label: isEN ? 'VP' : 'SV', type: 'vp', children: [] }
  while (i < wt.length && !['PREP','CONJ'].includes(wt[i].type)) {
    vp.children.push({ label: wt[i].token, leaf: wt[i].value, type: wt[i].type }); i++
  }
  if (vp.children.length) root.children.push(vp)

  if (i < wt.length) {
    const pp = { label: isEN ? 'PP' : 'SP', type: 'pp', children: [] }
    while (i < wt.length) {
      pp.children.push({ label: wt[i].token, leaf: wt[i].value, type: wt[i].type }); i++
    }
    if (pp.children.length) root.children.push(pp)
  }

  return root
}

/* ════════════════════════════════════════
   ÁRBOL SEMÁNTICO ABSTRACTO (AST)
════════════════════════════════════════ */
export function buildAST(tokens) {
  const wt = tokens.filter(t => !['DET','PUNCT','CONTR'].includes(t.type))
  if (!wt.length) return null

  const verbIdx = wt.findIndex(t => t.type === 'VERB')
  if (verbIdx === -1) {
    return { label: wt[0]?.value || '?', type: wt[0]?.type || 'NOUN', role: 'EXPR', val: wt[0]?.cat || '', children: [] }
  }

  const verb = wt[verbIdx]
  const root = { label: verb.value.toUpperCase(), type: 'VERB', role: 'PREDICADO', val: verb.cat, children: [] }

  const leftTokens = wt.slice(0, verbIdx)
  if (leftTokens.length) {
    if (leftTokens.length === 1) {
      root.children.push({ label: leftTokens[0].value, type: leftTokens[0].type, role: 'SUJETO', val: leftTokens[0].cat, children: [] })
    } else {
      root.children.push({
        label: 'SUJETO', type: 'NP', role: 'SUJETO',
        val: leftTokens.map(t=>t.value).join(' '),
        children: leftTokens.map(t => ({ label: t.value, type: t.type, role: t.type==='NOUN'?'NÚCLEO':'MOD', val: t.cat, children: [] }))
      })
    }
  }

  const rightTokens = wt.slice(verbIdx + 1)
  if (rightTokens.length) {
    if (rightTokens.length === 1) {
      root.children.push({ label: rightTokens[0].value, type: rightTokens[0].type, role: 'OBJETO', val: rightTokens[0].cat, children: [] })
    } else {
      root.children.push({
        label: 'OBJETO', type: 'NP', role: 'OBJETO',
        val: rightTokens.map(t=>t.value).join(' '),
        children: rightTokens.map(t => ({ label: t.value, type: t.type, role: t.type==='NOUN'?'NÚCLEO':'MOD', val: t.cat, children: [] }))
      })
    }
  }

  return root
}

/* ════════════════════════════════════════
   TABLA DE SÍMBOLOS
════════════════════════════════════════ */
export function buildSymTable(tokens) {
  return tokens
    .filter(t => t.type !== 'PUNCT')
    .reduce((acc, t) => {
      if (!acc.find(x => x.word === t.lower))
        acc.push({ word: t.lower, cat: t.cat, type: t.type, token: t.token, freq: tokens.filter(x => x.lower === t.lower).length })
      return acc
    }, [])
}

/* ════════════════════════════════════════
   ESTADÍSTICAS
════════════════════════════════════════ */
export function buildStats(tokens) {
  const types = ['NOUN','VERB','ADJ','ADV','DET','PRON','PREP','CONJ','NUM','INTERJ','PUNCT','CONTR']
  return types.map(type => ({ type, count: tokens.filter(t => t.type === type).length })).filter(s => s.count > 0)
}

/* ════════════════════════════════════════
   BNF
════════════════════════════════════════ */
export const BNF_EN = `<S>       ::= <NP> <VP> <PUNCT>?  |  <INTERJ> <PUNCT>?
<NP>      ::= <DET>? <ADJ>* <N> <PP>?  |  <PRON>  |  <NUM> <N>  |  <PRON_NUM>
<VP>      ::= <VERB_MOD>? <ADV>* <VERB> (<NP> | <ADJ> | <PP> | <ADV>)*
<PP>      ::= <PREP> <NP>
<VERB_MOD>::= 'will' | 'would' | 'can' | 'could' | 'shall' | 'should' | 'may' | 'might' | 'must'

── Conjunciones Coordinantes ──
<CONJ_COP>  ::= 'and' | 'e'                              (copulativas)
<CONJ_ADV>  ::= 'but' | 'yet'                            (adversativas)
<CONJ_DIS>  ::= 'or' | 'nor'                             (disyuntivas)
<CONJ_DIST> ::= 'either...or' | 'neither...nor'          (distributivas)
<CONJ_EXPLIC>::= 'namely' | 'thus' | 'therefore'         (explicativas)

── Conjunciones Subordinantes ──
<CONJ_COND> ::= 'if' | 'unless'                          (condicionales)
<CONJ_CAUS> ::= 'because' | 'since'                      (causales)
<CONJ_CONSEC>::= 'so' | 'consequently'                   (consecutivas)
<CONJ_CONCES>::= 'although' | 'even though'              (concesivas)
<CONJ_COMP> ::= 'as' | 'than'                            (comparativas)
<CONJ_FIN>  ::= 'so that' | 'in order to'               (finales)

✓  "The student reads a book."          →  NP VP PUNT
✓  "She can speak English well."        →  PRON MOD VERB NOUN ADV PUNT
✗  "The the student reads"              →  Error sint.: DET+DET consecutivos
✗  "She speaks"                         →  Error sem.: sin signo de puntuación
✗  "Reads books"                        →  Error sem.: sin sujeto explícito`

export const BNF_ES = `<O>       ::= <SN> <SV> <PUNT>?  |  <INTERJ> <PUNT>?
<SN>      ::= <DET>? <ADJ>* <SUST> <SP>?  |  <PRON>  |  <NUM> <SUST>  |  <PRON_NUM>
<SV>      ::= <ADV>* <VERB> (<SN> | <ADJ> | <SP> | <ADV>)*
<SP>      ::= <PREP> <SN>
<CONTR>   ::= 'al' (a + el)  |  'del' (de + el)

── Conjunciones Coordinantes ──
<CONJ_COP>  ::= 'y' | 'e' | 'ni'                        (copulativas)
<CONJ_ADV>  ::= 'pero' | 'sino' | 'mas'                 (adversativas)
<CONJ_DIS>  ::= 'o' | 'u'                               (disyuntivas)
<CONJ_DIST> ::= 'ora...ora' | 'ya...ya' | 'bien...bien' (distributivas)
<CONJ_EXPLIC>::= 'es decir' | 'pues' | 'o sea'         (explicativas)

── Conjunciones Subordinantes ──
<CONJ_COND> ::= 'si'                                    (condicionales)
<CONJ_CAUS> ::= 'porque' | 'pues' | 'ya que'           (causales)
<CONJ_CONSEC>::= 'así que' | 'conque' | 'luego'        (consecutivas)
<CONJ_CONCES>::= 'aunque' | 'si bien'                  (concesivas)
<CONJ_COMP> ::= 'como' | 'más que' | 'igual que'       (comparativas)
<CONJ_FIN>  ::= 'para que' | 'a fin de'               (finales)

✓  "El estudiante lee un libro."        →  SN SV PUNT
✓  "Ella puede hablar español."         →  PRON MOD VERB SUST PUNT
✗  "El el estudiante lee"              →  Error sint.: DET+DET consecutivos
✗  "Ella habla"                        →  Error sem.: sin signo de puntuación`