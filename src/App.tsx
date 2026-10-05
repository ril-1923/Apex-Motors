import { Suspense, useCallback, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Loading, Navbar } from './components/Shell'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import VehicleDetails from './pages/VehicleDetails'
import Configurator from './pages/Configurator'
import { About, Compare, NotFound, Performance, Showroom, Technology, TestDrive } from './pages/Info'
function Routed(){
  const loc=useLocation()
  return <div key={loc.pathname} className="page-in"><Routes>
    <Route path="/" element={<Home/>}/><Route path="/vehicles" element={<Vehicles/>}/><Route path="/vehicles/:id" element={<VehicleDetails/>}/>
    <Route path="/configurator" element={<Configurator/>}/><Route path="/performance" element={<Performance/>}/><Route path="/technology" element={<Technology/>}/>
    <Route path="/showroom" element={<Showroom/>}/><Route path="/compare" element={<Compare/>}/><Route path="/test-drive" element={<TestDrive/>}/>
    <Route path="/about" element={<About/>}/><Route path="*" element={<NotFound/>}/></Routes></div>
}
export default function App(){
  const [ready,setReady]=useState(false); const done=useCallback(()=>setReady(true),[])
  if(!ready) return <Loading done={done}/>
  return <HashRouter><Navbar/><Suspense fallback={null}><Routed/></Suspense><Footer/></HashRouter>
}
