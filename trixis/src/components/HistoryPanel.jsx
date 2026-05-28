export default function HistoryPanel({ history, onClose, onLoad }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(4,0,14,0.92)', zIndex:500, display:'flex', flexDirection:'column', animation:'fadeIn 0.2s ease' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px', borderBottom:'1px solid rgba(150,50,255,0.2)', background:'rgba(7,0,20,0.98)' }}>
        <h2 style={{ fontSize:16, fontWeight:800, color:'#ffe0ff', fontFamily:'var(--serif)', letterSpacing:2 }}>📋 HISTORIAL DE TRADUCCIONES</h2>
        <button onClick={onClose} style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,0,180,0.15)', border:'1px solid rgba(255,0,180,0.3)', color:'#ff00b4', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:20 }}>
        {history.length === 0 ? (
          <div style={{ textAlign:'center', padding:'3rem', color:'rgba(96,48,112,0.6)', fontFamily:'var(--mono)' }}>
            <p style={{ fontSize:32, marginBottom:10 }}>📭</p>
            <p>Sin historial aún. Traduce algo primero.</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {history.map((item, i) => (
              <div key={item.id} style={{ padding:'12px 14px', borderRadius:12, background:'rgba(0,0,10,0.8)', border:'1px solid rgba(150,50,255,0.18)', display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6, flexWrap:'wrap' }}>
                    <span style={{ fontSize:9, fontFamily:'var(--mono)', padding:'2px 7px', borderRadius:3, background:'rgba(255,0,180,0.15)', color:'#ff00b4', border:'1px solid rgba(255,0,180,0.3)', fontWeight:700 }}>{item.lang==='en'?'EN→ES':'ES→EN'}</span>
                    <span style={{ fontSize:9, color:'rgba(96,48,112,0.7)', fontFamily:'var(--mono)' }}>{item.date}</span>
                    <span style={{ fontSize:9, color:'rgba(150,50,255,0.6)', fontFamily:'var(--mono)' }}>{item.tokens} tokens · {item.errors} errores</span>
                  </div>
                  <p style={{ fontSize:12, color:'#ffe0ff', marginBottom:4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}><strong>EN:</strong> {item.src}</p>
                  <p style={{ fontSize:12, color:'rgba(192,128,208,0.8)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}><strong>ES:</strong> {item.out}</p>
                </div>
                <button onClick={() => onLoad(item)} style={{ padding:'6px 12px', fontSize:10, borderRadius:7, border:'1px solid rgba(150,50,255,0.3)', background:'rgba(150,50,255,0.15)', color:'#c080ff', cursor:'pointer', fontFamily:'var(--mono)', fontWeight:700, flexShrink:0 }}>Cargar</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
