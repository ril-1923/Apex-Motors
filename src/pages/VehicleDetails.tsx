import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { vehicles, colors } from '../data'
import Car from '../components/Car'
import { useCount } from '../hooks'
function Stat({label,value,unit,dec=0}:{label:string;value:number;unit:string;dec?:number}){
  const n=useCount(value); return <div className="stat"><b>{n.toFixed(dec)}</b><span>{unit}</span><small>{label}</small></div>
}
export default function VehicleDetails(){
  const {id}=useParams(); const v=vehicles.find(x=>x.id===id)
  const [color,setColor]=useState('Racing Red'); const [angle,setAngle]=useState<number|undefined>(undefined)
  const [lights,setLights]=useState(true); const [env,setEnv]=useState('studio')
  if(!v) return <main className="page container"><h1 className="h1x">Vehicle not found</h1><Link className="btn-apex" to="/vehicles">Back to vehicles</Link></main>
  return <main className="page container"><p className="muted">{v.category}</p><h1 className="h1x">{v.name}</h1>
    <div className={`viewer env-${env}`}><Car color={colors[color]} lights={lights} angle={angle} auto={angle===undefined}/></div>
    <div className="d-flex flex-wrap gap-2 my-3">
      {([['Front',-90],['Side',0],['Rear',90]] as [string,number][]).map(([l,a])=><button key={l} className="chip" onClick={()=>setAngle(a)}>{l}</button>)}
      <button className="chip" onClick={()=>setAngle(undefined)}>Reset</button>
      <button className="chip" aria-pressed={lights} onClick={()=>setLights(!lights)}>Headlights</button>
      {['studio','night','sunset'].map(e=><button key={e} className={`chip ${env===e?'on':''}`} onClick={()=>setEnv(e)}>{e}</button>)}</div>
    <div className="d-flex flex-wrap gap-2 mb-4" role="radiogroup" aria-label="Colour">{Object.entries(colors).map(([n,c])=>
      <button key={n} role="radio" aria-checked={color===n} aria-label={n} title={n} className={`swatch ${color===n?'on':''}`} style={{background:c}} onClick={()=>setColor(n)}/>)}</div>
    <div className="stats"><Stat label="Horsepower" value={v.hp} unit="HP"/><Stat label="Torque" value={v.torque} unit="Nm"/><Stat label="0–100 km/h" value={v.accel} unit="s" dec={1}/>
      <Stat label="Top speed" value={v.top} unit="km/h"/><Stat label="Range" value={v.range} unit="km"/></div>
    <p className="muted mt-3">Battery / engine: {v.battery} · Drive: {v.drive}</p>
    <Link className="btn-apex" to="/configurator">Configure this car</Link></main>
}
