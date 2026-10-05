import { useEffect, useState } from 'react'
export function useLocalStorage<T>(key:string, initial:T): [T,(v:T)=>void] {
  const [v,setV]=useState<T>(()=>{ try{ const s=localStorage.getItem(key); return s?JSON.parse(s) as T:initial }catch{ return initial } })
  const set=(n:T)=>{ setV(n); try{ localStorage.setItem(key,JSON.stringify(n)) }catch{ /* storage unavailable */ } }
  return [v,set]
}
export function useCount(target:number, ms=1200): number {
  const [n,setN]=useState(0)
  useEffect(()=>{ let id=0; const t0=performance.now()
    const tick=(t:number)=>{ const p=Math.min(1,(t-t0)/ms); setN(target*(1-Math.pow(1-p,3))); if(p<1) id=requestAnimationFrame(tick) }
    id=requestAnimationFrame(tick); return ()=>cancelAnimationFrame(id) },[target,ms])
  return n
}
