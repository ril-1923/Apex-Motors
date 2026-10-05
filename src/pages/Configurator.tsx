import { useState } from 'react'
import { Link } from 'react-router-dom'
import { colors, options } from '../data'
import Car from '../components/Car'
import { useLocalStorage } from '../hooks'
import type { Configuration } from '../types'
const def:Configuration={color:'Racing Red',wheels:'Sport 20"',interior:'Black Leather',lighting:'Matrix LED',pkg:'Essential'}
export default function Configurator(){
  const [saved,setSaved]=useLocalStorage<Configuration>('apex-config',def)
  const [c,setC]=useState<Configuration>(saved); const [toast,setToast]=useState('')
  const price=128000+options.wheels[c.wheels as keyof typeof options.wheels]+options.interior[c.interior as keyof typeof options.interior]+options.lighting[c.lighting as keyof typeof options.lighting]+options.pkg[c.pkg as keyof typeof options.pkg]
  const say=(m:string)=>{setToast(m);setTimeout(()=>setToast(''),2200)}
  const steps:[keyof Configuration,string,string[]][]=[['color','Exterior Color',Object.keys(colors).slice(0,5)],['wheels','Wheels',Object.keys(options.wheels)],['interior','Interior',Object.keys(options.interior)],['lighting','Lighting',Object.keys(options.lighting)],['pkg','Package',Object.keys(options.pkg)]]
  return <main className="page container"><h1 className="h1x">Build Your APEX</h1><div className="row g-4">
    <div className="col-lg-7"><div className="viewer"><Car color={colors[c.color]} lights wheelSize={26+parseInt(c.wheels.replace(/\D/g,'').slice(0,2))-19+8}/></div>
      {steps.map(([k,t,opts],i)=><fieldset key={k} className="step"><legend>Step {i+1} — {t}</legend><div className="d-flex flex-wrap gap-2">{opts.map(o=>
        <button key={o} className={`chip ${c[k]===o?'on':''}`} aria-pressed={c[k]===o} onClick={()=>setC({...c,[k]:o})}>{o}</button>)}</div></fieldset>)}</div>
    <aside className="col-lg-5"><div className="panel sticky"><h2>Your configuration</h2>
      <ul className="sum">{(Object.keys(c) as (keyof Configuration)[]).map(k=><li key={k}><span>{k}</span><b>{c[k]}</b></li>)}</ul>
      <p className="price">${price.toLocaleString()}</p><p className="muted">Estimated price, before taxes.</p>
      <div className="d-grid gap-2"><button className="btn-apex" onClick={()=>{setSaved(c);say('Configuration saved')}}>Save Configuration</button>
        <button className="btn-ghost" onClick={()=>{setC(def);setSaved(def);say('Configuration reset')}}>Reset Configuration</button>
        <Link className="btn-ghost text-center" to="/test-drive">Book Test Drive</Link></div></div></aside></div>
    {toast&&<div className="toast-apex" role="status">{toast}</div>}</main>
}
