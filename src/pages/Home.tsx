import { Link } from 'react-router-dom'
import Car from '../components/Car'
import { useState } from 'react'
export default function Home(){
  const [lights,setLights]=useState(true)
  return <section className="hero"><div className="streaks" aria-hidden/><div className="container hero-grid">
    <div><h1 className="display">APEX MOTORS</h1><p className="tag">Engineering Motion. Designing Emotion.</p>
      <p className="muted">Discover a new generation of performance, technology and design.</p>
      <div className="d-flex flex-wrap gap-3"><Link className="btn-apex" to="/vehicles">Explore Vehicles</Link><Link className="btn-ghost" to="/configurator">Enter 3D Configurator</Link>
      <button className="btn-ghost" onClick={()=>setLights(!lights)}>Headlights {lights?'off':'on'}</button></div></div>
    <div className="hero-car"><Car color="#b0121f" lights={lights}/></div></div>
    <a className="scroll-ind" href="#/vehicles" aria-label="Scroll to vehicles"><i className="bi bi-chevron-double-down"/></a></section>
}
