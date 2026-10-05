import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
const links:[string,string][]=[['/','Home'],['/vehicles','Vehicles'],['/configurator','Configurator'],['/performance','Performance'],['/technology','Technology'],['/showroom','Showroom'],['/compare','Compare'],['/about','About']]
export function Navbar(){
  const [open,setOpen]=useState(false); const [small,setSmall]=useState(false)
  useEffect(()=>{ const f=()=>setSmall(window.scrollY>40); f(); window.addEventListener('scroll',f,{passive:true}); return ()=>window.removeEventListener('scroll',f)},[])
  return <header className={`apex-nav ${small?'small':''}`}><nav className="container d-flex align-items-center justify-content-between" aria-label="Main">
    <Link to="/" className="logo" onClick={()=>setOpen(false)}>APEX</Link>
    <button className="menu-btn d-lg-none" aria-expanded={open} aria-label="Toggle menu" onClick={()=>setOpen(!open)}><i className={`bi ${open?'bi-x-lg':'bi-list'}`}/></button>
    <ul className={`nav-links ${open?'open':''}`}>{links.map(([to,l])=><li key={to}><NavLink to={to} end={to==='/'} onClick={()=>setOpen(false)}>{l}</NavLink></li>)}
      <li className="d-lg-none"><Link className="btn-apex" to="/test-drive" onClick={()=>setOpen(false)}>Book a Test Drive</Link></li></ul>
    <Link className="btn-apex d-none d-lg-inline-block" to="/test-drive">Book a Test Drive</Link></nav></header>
}
export function Footer(){
  return <footer className="apex-footer"><div className="container">
    <div className="logo">APEX MOTORS</div><p>Engineering Motion. Designing Emotion.</p>
    <ul className="foot-links">{[['/vehicles','Vehicles'],['/configurator','Configurator'],['/technology','Technology'],['/showroom','Showroom'],['/compare','Compare'],['/about','About'],['/test-drive','Contact']].map(([t,l])=><li key={t}><Link to={t}>{l}</Link></li>)}</ul>
    <div className="socials">{[['github','GitHub','https://github.com'],['linkedin','LinkedIn','https://linkedin.com'],['instagram','Instagram','https://instagram.com'],['youtube','YouTube','https://youtube.com']].map(([i,l,u])=><a key={i} href={u} aria-label={l} target="_blank" rel="noreferrer"><i className={`bi bi-${i}`}/></a>)}</div>
    <small>© 2026 APEX MOTORS. All rights reserved.</small></div></footer>
}
export function Loading({done}:{done:()=>void}){
  const [p,setP]=useState(0)
  useEffect(()=>{ const t=setInterval(()=>setP(v=>Math.min(100,v+4)),40); return ()=>clearInterval(t)},[])
  useEffect(()=>{ if(p>=100){ const t=setTimeout(done,250); return ()=>clearTimeout(t)} },[p,done])
  return <div className="loader" role="status"><div className="wheel"/><h1>APEX MOTORS</h1><div className="pct">{p}%</div></div>
}
