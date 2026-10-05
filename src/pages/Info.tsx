import { useState } from 'react'
import { Link } from 'react-router-dom'
import { technologies, vehicles } from '../data'
import Car from '../components/Car'
import { useCount, useLocalStorage } from '../hooks'
import type { Booking } from '../types'

export function Performance(){
  const [speed,setSpeed]=useState(120); const hp=useCount(780)
  const bars:[string,number,string][]=[['0–100 km/h',92,'2.4 s'],['0–200 km/h',85,'6.1 s'],['Top speed',95,'380 km/h'],['Torque',88,'1,100 Nm'],['Range',70,'720 km'],['Drag coefficient',80,'Cd 0.21']]
  return <main className="page container"><h1 className="h1x">Performance Without Compromise</h1><div className="row g-4 align-items-center">
    <div className="col-md-6"><div className="gauge"><svg viewBox="0 0 200 120" role="img" aria-label={`Speedometer ${speed} km/h`}><path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="#333" strokeWidth="10"/>
      <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="#c4161c" strokeWidth="10" pathLength="100" strokeDasharray={`${speed/3.8} 100`}/>
      <line x1="100" y1="110" x2="100" y2="40" stroke="#fff" strokeWidth="3" style={{transformOrigin:'100px 110px',transform:`rotate(${speed/380*180-90}deg)`,transition:'transform .3s'}}/></svg>
      <div className="gauge-n">{speed}<small> km/h</small></div></div>
      <label className="d-block mt-2">Speed<input className="form-range" type="range" min={0} max={380} value={speed} onChange={e=>setSpeed(+e.target.value)}/></label></div>
    <div className="col-md-6">{bars.map(([l,p,t])=><div key={l} className="bar-row"><span>{l}</span><b>{t}</b><div className="bar"><i style={{width:`${p}%`}}/></div></div>)}</div></div>
    <p className="display sm mt-4">{Math.round(hp)} HP</p></main>
}
export function Technology(){
  return <main className="page container"><h1 className="h1x">Technology</h1><div className="row g-4">{technologies.map(t=><div className="col-md-6 col-lg-4" key={t.title}>
    <article className="vcard tilt"><div className="tech-stat">{t.stat}</div><h2>{t.title}</h2><p className="muted">{t.text}</p></article></div>)}</div></main>
}
const zones=[{n:'Performance Zone',id:'r',c:'#b0121f',spots:['780 HP twin-turbo V8','Carbon-ceramic brakes']},{n:'Electric Zone',id:'x1',c:'#1d5bd6',spots:['800 V fast charging','560 km range']},{n:'Luxury Zone',id:'eon',c:'#e9edf0',spots:['Hand-stitched leather','Air suspension']}]
export function Showroom(){
  const [z,setZ]=useState(0); const [h,setH]=useState(''); const zone=zones[z]
  return <main className="page container"><h1 className="h1x">Virtual Showroom</h1>
    <div className="d-flex flex-wrap gap-2 mb-3">{zones.map((x,i)=><button key={x.n} className={`chip ${z===i?'on':''}`} onClick={()=>{setZ(i);setH('')}}>{x.n}</button>)}</div>
    <div className="showroom" key={zone.n}><div className="ceil">{[0,1,2,3].map(i=><i key={i}/>)}</div><p className="sign">APEX</p>
      <div className="platform"><Car color={zone.c} scale={0.9}/></div>
      <div className="hotspots">{zone.spots.map((s,i)=><button key={s} className="hotspot" style={{left:`${25+i*40}%`,top:`${30+i*15}%`}} aria-label={s} onClick={()=>setH(s)}><i className="bi bi-plus"/></button>)}</div>
      <div className="screen">{h||`Select a hotspot · ${vehicles.find(v=>v.id===zone.id)?.name}`}</div></div></main>
}
export function Compare(){
  const [a,setA]=useState('x1'); const [b,setB]=useState('gt')
  const A=vehicles.find(v=>v.id===a)!, B=vehicles.find(v=>v.id===b)!
  const rows:[string,keyof typeof A,boolean][]=[['Price','price',false],['Horsepower','hp',true],['Torque','torque',true],['0–100 km/h','accel',false],['Top speed','top',true],['Range','range',true],['Weight','weight',false]]
  const sel=(v:string,f:(s:string)=>void,l:string)=><label className="d-block">{l}<select className="form-select apex-in" value={v} onChange={e=>f(e.target.value)}>{vehicles.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
  return <main className="page container"><h1 className="h1x">Compare</h1><div className="row g-3 mb-4"><div className="col-6">{sel(a,setA,'Vehicle A')}</div><div className="col-6">{sel(b,setB,'Vehicle B')}</div></div>
    {rows.map(([l,k,hi])=>{ const x=A[k] as number, y=B[k] as number, aw=hi?x>=y:x<=y, bw=hi?y>=x:y<=x, m=Math.max(x,y)
      return <div key={l} className="cmp"><div className="cmp-l">{l}</div><div className="cmp-b"><div className={`cb ${aw?'win':''}`} style={{width:`${x/m*100}%`}}>{x.toLocaleString()}</div></div>
      <div className="cmp-b"><div className={`cb ${bw?'win':''}`} style={{width:`${y/m*100}%`}}>{y.toLocaleString()}</div></div></div>})}
    <p className="muted">Drive: {A.drive} vs {B.drive} · Battery/engine: {A.battery} vs {B.battery}. Highlighted bars show the better value.</p></main>
}
export function TestDrive(){
  const empty:Booking={name:'',email:'',phone:'',vehicle:'x1',date:'',time:'10:00',location:'Downtown Studio'}
  const [f,setF]=useState<Booking>(empty); const [,setStore]=useLocalStorage<Booking[]>('apex-bookings',[]); const [done,setDone]=useState(false)
  const up=(k:keyof Booking)=>(e:{target:{value:string}})=>setF({...f,[k]:e.target.value})
  const submit=(e:React.FormEvent)=>{ e.preventDefault(); let prev:Booking[]=[]; try{ prev=JSON.parse(localStorage.getItem('apex-bookings')||'[]') as Booking[] }catch{ prev=[] }
    setStore([...prev,f]); setDone(true) }
  const inp=(k:keyof Booking,l:string,t='text')=><label className="d-block mb-3">{l}<input required type={t} className="form-control apex-in" value={f[k]} onChange={up(k)} min={t==='date'?new Date().toISOString().slice(0,10):undefined}/></label>
  return <main className="page container"><h1 className="h1x">Book a Test Drive</h1>
    <form className="panel" onSubmit={submit}><div className="row"><div className="col-md-6">{inp('name','Name')}{inp('email','Email','email')}{inp('phone','Phone','tel')}</div>
      <div className="col-md-6"><label className="d-block mb-3">Vehicle<select className="form-select apex-in" value={f.vehicle} onChange={up('vehicle')}>{vehicles.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}</select></label>
      {inp('date','Preferred date','date')}{inp('time','Preferred time','time')}
      <label className="d-block mb-3">Location<select className="form-select apex-in" value={f.location} onChange={up('location')}>{['Downtown Studio','Airport Track','Coastal Showroom'].map(l=><option key={l}>{l}</option>)}</select></label></div></div>
      <button className="btn-apex" type="submit">Request test drive</button></form>
    {done&&<div className="modal-apex" role="dialog" aria-modal="true" aria-labelledby="ok"><div className="panel text-center"><div className="check"><i className="bi bi-check-lg"/></div>
      <h2 id="ok">Your test drive request has been received.</h2><p className="muted">We will confirm {f.date} at {f.time} by email.</p>
      <button className="btn-apex" onClick={()=>{setDone(false);setF(empty)}}>Done</button></div></div>}</main>
}
export function About(){
  const t:[string,string][]=[['2020','Foundation'],['2022','First Prototype'],['2024','Electric Platform'],['2026','APEX X1'],['2030','Future Mobility']]
  return <main className="page container"><h1 className="h1x">Our Story</h1><div className="row g-4 mb-5">{[['Our Vision','Cars that make every journey feel intentional.'],['Engineering','Lightweight structures, 800 V electrics and software-defined dynamics.'],['Design Philosophy','One continuous surface, no unnecessary lines.'],['Sustainability','Recycled aluminium, renewable-powered factories, and battery second life.'],['Future Mobility','Solid-state packs and autonomous highway driving by 2030.']].map(([h,p])=>
    <div className="col-md-6" key={h}><h2>{h}</h2><p className="muted">{p}</p></div>)}</div>
    <ol className="timeline">{t.map(([y,l])=><li key={y}><b>{y}</b><span>{l}</span></li>)}</ol></main>
}
export function NotFound(){
  return <main className="page container text-center"><Car color="#444" auto/><h1 className="display">404</h1><p className="muted">This road doesn't lead anywhere.</p><Link className="btn-apex" to="/">Back home</Link></main>
}
