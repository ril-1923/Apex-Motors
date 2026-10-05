import { useState } from 'react'
import { Link } from 'react-router-dom'
import { vehicles, colors } from '../data'
import Car from '../components/Car'
const cats=['All','Electric','Performance','Luxury','SUV','Concept']
const tones=Object.values(colors)
export default function Vehicles(){
  const [f,setF]=useState('All')
  const list=vehicles.filter(v=>f==='All'||v.tags.includes(f))
  return <main className="page container"><h1 className="h1x">The Collection</h1>
    <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter vehicles">{cats.map(c=><button key={c} className={`chip ${f===c?'on':''}`} aria-pressed={f===c} onClick={()=>setF(c)}>{c}</button>)}</div>
    <div className="row g-4">{list.map((v,i)=><div className="col-12 col-md-6 col-xl-4 pop" key={v.id}>
      <article className="vcard tilt"><div className="vcard-car"><Car color={tones[i%tones.length]} scale={0.7}/></div>
        <p className="muted m-0">{v.category}</p><h2>{v.name}</h2>
        <dl className="mini"><div><dt>Power</dt><dd>{v.hp} HP</dd></div><div><dt>0–100</dt><dd>{v.accel}s</dd></div><div><dt>Top speed</dt><dd>{v.top} km/h</dd></div></dl>
        <div className="d-flex gap-2"><Link className="btn-apex" to={`/vehicles/${v.id}`}>View Details</Link><Link className="btn-ghost" to="/configurator">Configure</Link></div></article></div>)}</div></main>
}
