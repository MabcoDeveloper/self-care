import React, { useEffect, useRef, useState } from 'react'
import './chatbot.css'
import { UseAppContext } from '../context/AppContext.jsx'
import Cookies from 'js-cookie'

const CHAT_API = 'https://ai-chatbot-8c3o.onrender.com/chat'

const genUserId = () => 'web_' + Math.random().toString(36).slice(2, 10)

export default function Chatbot(){
  const [open,setOpen] = useState(false)
  const [messages,setMessages] = useState([])
  const [input,setInput] = useState('')
  const [typing,setTyping] = useState(false)
  const { axios, getToken, products, cartItems, setCartItems, user, isSignedIn } = UseAppContext()
  const [connected,setConnected] = useState(false)
  const [checking,setChecking] = useState(false)
  const [processingAction, setProcessingAction] = useState(false)
  const [actionError, setActionError] = useState('')
  const userIdRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(()=>{
    const saved = sessionStorage.getItem('chat_user_id')
    if(saved) userIdRef.current = saved
    else { userIdRef.current = genUserId(); sessionStorage.setItem('chat_user_id', userIdRef.current)}
  },[])

  useEffect(()=>{ if(open){ const node = containerRef.current; node && node.scrollTo({top: node.scrollHeight, behavior:'smooth'}) } },[messages,open,typing])

  useEffect(()=>{
    const onClick = (e)=>{ if(open){ const root = document.getElementById('chatbot-root'); if(root && !root.contains(e.target)) setOpen(false) }}
    document.addEventListener('click', onClick)
    return ()=> document.removeEventListener('click', onClick)
  },[open])

  // connectivity check to the chat API
  const checkConnection = async () => {
    setChecking(true)
    try{
      if(!userIdRef.current){ userIdRef.current = genUserId(); sessionStorage.setItem('chat_user_id', userIdRef.current) }
      const controller = new AbortController()
      const timeoutId = setTimeout(()=>controller.abort(), 3000)
      const body = { user_id: userIdRef.current, message: '__ping__', timestamp: new Date().toISOString() }
      const res = await fetch(CHAT_API, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body), signal: controller.signal })
      clearTimeout(timeoutId)
      setConnected(res.ok)
    }catch(err){ setConnected(false) }
    finally{ setChecking(false) }
  }

  useEffect(()=>{ checkConnection(); const iv = setInterval(checkConnection, 30000); return ()=>clearInterval(iv) },[])
  useEffect(()=>{ if(open) checkConnection() },[open])

  const pushMessage = (m)=> setMessages(s=>[...s,m])

  const sendMessage = async () =>{
    if (typing) return
    const text = input.trim(); if(!text) return
    pushMessage({from:'user', text, avatar:'👨‍💼', ts: new Date().toISOString()})
    setInput('')
    setTyping(true)
    try{
      const body = { user_id: userIdRef.current, message: text, timestamp: new Date().toISOString() }
      const res = await fetch(CHAT_API, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
      if(!res.ok) throw new Error('http')
      const data = await res.json()
      console.log('chatbot:bot-response', data)
      if(data?.response) pushMessage({from:'bot', text: data.response, avatar:'🤖', ts: new Date().toISOString(), data})
      else pushMessage({from:'bot', text:'', avatar:'🤖', ts: new Date().toISOString(), data})

      // if the bot instructs to add to cart, perform the action
        try{
          const action = data?.data?.action
            if(action === 'start_add_to_cart'){
            setProcessingAction(true)
            setActionError('')
            console.log('chatbot:action-start', data.data)
            // support either product_id or product_title from bot response
            let productId = data.data.product_id
            const productTitle = data.data.product_title
            const size = data.data.selected_size
            const qty = 1

            // try to resolve productId from productTitle when id not provided
            let prod = null
            if(!productId && productTitle && Array.isArray(products)){
              const titleNorm = String(productTitle).trim().toLowerCase()
              prod = products.find(p => {
                const candidates = [p.title, p.name, p.product_title, p.title_ar, p.name_ar, p.slug].filter(Boolean)
                return candidates.some(c => String(c).trim().toLowerCase() === titleNorm) || (String(p._id || p.product_id || '').trim().toLowerCase() === titleNorm)
              })
              // fallback to includes
              if(!prod) prod = products.find(p => {
                const candidates = [p.title, p.name, p.product_title, p.title_ar, p.name_ar].filter(Boolean)
                return candidates.some(c => String(c).trim().toLowerCase().includes(titleNorm))
              })
              if(prod) productId = (prod._id && prod._id.toString()) || prod.product_id
            }

            // if still not found and we have backend access, try fetching fresh products
            if(!prod && productTitle){
              try{
                const { data: listData } = await axios.get('/api/products')
                if(listData && listData.success && Array.isArray(listData.products)){
                  const list = listData.products
                  const titleNorm = String(productTitle).trim().toLowerCase()
                  prod = list.find(p => {
                    const candidates = [p.title, p.title_ar].filter(Boolean)
                    return candidates.some(c => String(c).trim().toLowerCase() === titleNorm)
                  })
                  if(!prod) prod = list.find(p => {
                    const candidates = [p.title, p.title_ar].filter(Boolean)
                    return candidates.some(c => String(c).trim().toLowerCase().includes(titleNorm))
                  })
                  if(prod) productId = (prod._id && prod._id.toString()) || prod.product_id
                }
              }catch(err){ console.warn('chatbot:product-fetch-fallback', err) }
            }

            else if(productId && Array.isArray(products)){
              prod = products.find(p => String(p._id) === String(productId) || p.product_id === productId)
            }

            // if still no productId for signed-in user, notify and abort
            if(!productId && isSignedIn){
              const warn = `لم أتمكن من العثور على المنتج '${productTitle || ''}' لإضافته إلى السلة.`
              setActionError(warn)
              pushMessage({ from: 'bot', text: warn, avatar: '🤖', ts: new Date().toISOString() })
              setProcessingAction(false)
              return
            }

            let addResult = { success: false, message: 'failed' }
            if(isSignedIn && getToken){
              try{
                const token = await getToken()
                console.log('chatbot:calling-add-by-id', { productId, size, qty })
                const resp = await axios.post('/api/cart/add-by-id', { productId, size, quantity: qty }, { headers: { Authorization: `Bearer ${token}` } })
                addResult = resp.data || addResult
              }catch(err){ addResult = { success: false, message: err.message || String(err) } }
              // reflect server-side change in client state so UI updates
              if(addResult.success){
                try{
                  const localCart = structuredClone(cartItems || {})
                  const key = productId || productTitle || ('unknown_' + Date.now())
                  localCart[key] = localCart[key] || {}
                  localCart[key][size || 'default'] = (localCart[key][size || 'default'] || 0) + qty
                  // persist cookie for consistency
                  try{ Cookies.set('cart', JSON.stringify(localCart), { expires: 7 }) }catch(e){}
                  setCartItems(localCart)
                  console.log('chatbot:client-sync-after-server-add', localCart)
                }catch(e){ console.warn('chatbot:client-sync-error', e) }
              }
            } else {
              // guest: set cookie if provided by bot response
              const set_cookie = data.data.set_cookie
              if(set_cookie && set_cookie.name && set_cookie.value){
                try{ Cookies.set(set_cookie.name, set_cookie.value, { expires: (set_cookie.max_age || 2592000) / 86400 }) }catch(e){}
              }
              try{
                const localCart = structuredClone(cartItems || {})
                const localKey = productId || productTitle || ('unknown_' + Date.now())
                localCart[localKey] = localCart[localKey] || {}
                localCart[localKey][size || 'default'] = (localCart[localKey][size || 'default'] || 0) + qty
                // persist cookie immediately for reliability
                try{ Cookies.set('cart', JSON.stringify(localCart), { expires: 7 }) }catch(e){}
                setCartItems(localCart)
                console.log('chatbot:local-cart-updated', localCart)
                addResult = { success: true, message: 'Added to local cart' }
              }catch(e){ addResult = { success: false, message: e.message } }
            }

            if(!addResult.success){
              setActionError(addResult.message || 'Unknown error')
            } else {
              setActionError('')
            }

            console.log('chatbot:add-result', addResult)
            const title = prod ? (prod.title || prod.name || prod.product_title || productTitle || productId) : (productTitle || productId)
            const confirmText = addResult.success ? `تمت إضافة ${title} إلى سلة التسوق. هل تود الذهاب إلى سلة التسوق الآن لعرض المنتج أم متابعة التسوق؟` : `حاولت إضافة ${title} إلى السلة ولكن حدث خطأ: ${addResult.message}`
            pushMessage({ from: 'bot', text: confirmText, avatar: '🤖', ts: new Date().toISOString() })
            setProcessingAction(false)
          }
        }catch(err){ console.error('cart-action', err); setActionError(err?.message || String(err)); setProcessingAction(false) }
    }catch(err){ pushMessage({from:'bot', text:'حدث خطأ، حاول مرة اخرى لاحقاً', avatar:'🤖', ts: new Date().toISOString()}) }
    setTyping(false)
  }

  const onKeyDown = (e)=>{
    if(e.key === 'Enter'){ e.preventDefault(); if(!typing) sendMessage() }
    if(e.key === 'Escape'){ setInput('') }
  }

  return (
    <div id="chatbot-root" className={`chatbot-wrap ${open? 'open':''}`}>
      <div className="chat-toggle" onClick={()=>setOpen(o=>!o)} aria-label="فتح الدردشة">

          
            <div class="toggle-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                </svg>
            </div>
            <div class="toggle-glow"></div>
       
      </div>
      <div className="chat-window" role="dialog" aria-hidden={!open}>
        <div id="chat-box" className="">
          <div id="chat-header" className="chat-header">
            <div className="header-content">
              <div className="header-avatar">
                <div className="avatar-inner">AI</div>
                <div className="avatar-ring"></div>
              </div>
              <div className="header-text">
                <div className="header-title">المساعد الذكي</div>
                <div className="header-status">
                  <span className={`status-dot ${checking? 'connecting': connected? 'online':'offline'}`}></span>
                  <span className="status-text">{checking? 'جارٍ التحقق' : connected? 'متصل الآن' : 'غير متصل'}</span>
                </div>
                {actionError && <div className="header-error" role="status">{actionError}</div>}
              </div>
            </div>
            <div className="header-actions">
              <button id="chat-close" className="header-btn" title="إغلاق" onClick={()=>setOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="chat-body" ref={containerRef}>
          {messages.map((m,i)=> (
            <div key={i} className={`chat-message ${m.from==='user'? 'from-user':'from-bot'}`} dir="rtl">
              <div className="avatar">{m.avatar}</div>
              <div className="bubble">
                <div className="text">{m.text}</div>
                {m.data?.categories && (
                  <div className="categories">
                    {m.data.categories.map((cat,ci)=> (
                      <div key={ci} className="category">
                        <div className="cat-name">{cat.name}</div>
                        <div className="cat-count">{cat.count ?? ''}</div>
                        <div className="cat-products">
                          {(cat.products||[]).slice(0,3).map((p,pi)=> (
                            <div key={pi} className="cat-product">
                              <div className="p-title">{p.title}</div>
                              {p.price && <div className="p-price">{p.price}</div>}
                              {p.inStock!==undefined && <div className={`p-stock ${p.inStock? 'instock':'out'}`}>{p.inStock? 'موجود':'غير متوفر'}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="typing" dir="rtl"><div className="avatar">🤖</div><div className="dots"><span></span><span></span><span></span></div></div>
          )}
        </div>
        <div className="chat-input" dir="rtl">
          <textarea id="chat-input" name="chat-input" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKeyDown} placeholder={(typing||processingAction)? 'بانتظار رد المساعد...' : 'اكتب رسالتك ثم اضغط Enter'} disabled={typing||processingAction} />
          <button className="send" onClick={sendMessage} aria-label="إرسال" disabled={typing||processingAction}>إرسال</button>
        </div>
      </div>
    </div>
  )
}
