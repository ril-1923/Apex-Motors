import { useEffect, useRef } from 'react'
interface BoxProps { w:number; h:number; d:number; x:number; y:number; z:number; c:string; glow?:boolean }
function Box({w,h,d,x,y,z,c,glow}:BoxProps){
  const f=(fw:number,fh:number,t:string,sh:number,k:string)=>(
    <div key={k} style={{position:'absolute',width:fw,height:fh,left:-fw/2,top:-fh/2,background:c,transform:t,filter:`brightness(${sh})`,boxShadow:glow?`0 0 26px 6px ${c}`:undefined,borderRadius:2}}/>)
  return <div style={{position:'absolute',transformStyle:'preserve-3d',transform:`translate3d(${x}px,${y}px,${z}px)`}}>
    {f(w,h,`translateZ(${d/2}px)`,1,'a')}{f(w,h,`rotateY(180deg) translateZ(${d/2}px)`,.8,'b')}
    {f(d,h,`rotateY(90deg) translateZ(${w/2}px)`,.9,'c')}{f(d,h,`rotateY(-90deg) translateZ(${w/2}px)`,.7,'d')}
    {f(w,d,`rotateX(90deg) translateZ(${h/2}px)`,1.25,'e')}{f(w,d,`rotateX(-90deg) translateZ(${h/2}px)`,.5,'f')}</div>
}
interface CarProps { color:string; lights?:boolean; angle?:number; auto?:boolean; scale?:number; wheelSize?:number }
export default function Car({color,lights=true,angle,auto=true,scale=1,wheelSize=34}:CarProps){
  const ref=useRef<HTMLDivElement>(null)
  const st=useRef({y:-35,drag:false,x:0,reduce:false})
  useEffect(()=>{ st.current.reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches; let id=0
    const tick=()=>{ const s=st.current; if(!s.drag&&auto&&!s.reduce) s.y+=0.3
      if(ref.current) ref.current.style.transform=`rotateX(-12deg) rotateY(${s.y}deg)`; id=requestAnimationFrame(tick) }
    id=requestAnimationFrame(tick); return ()=>cancelAnimationFrame(id) },[auto])
  useEffect(()=>{ if(angle!==undefined) st.current.y=angle },[angle])
  const wheels:[number,number][]=[[78,56],[78,-56],[-78,56],[-78,-56]]
  return <div className="car-stage" role="img" aria-label="Interactive 3D APEX sports car. Drag to rotate."
    style={{touchAction:'pan-y'}}
    onPointerDown={e=>{st.current.drag=true;st.current.x=e.clientX;e.currentTarget.setPointerCapture(e.pointerId)}}
    onPointerMove={e=>{ if(st.current.drag){ st.current.y+=(e.clientX-st.current.x)*0.6; st.current.x=e.clientX } }}
    onPointerUp={()=>{st.current.drag=false}}>
    <div className="car-floor"/>
    <div style={{transform:`scale(${scale})`}} className="car-wrap">
      <div ref={ref} className="car-3d">
        <Box w={250} h={40} d={104} x={0} y={0} z={0} c={color}/>
        <Box w={130} h={32} d={88} x={-14} y={-36} z={0} c="#1b2430"/>
        <Box w={80} h={8} d={96} x={80} y={-22} z={0} c={color}/>
        {wheels.map(([x,z])=><Box key={`${x}${z}`} w={wheelSize} h={wheelSize} d={14} x={x} y={24} z={z>0?z+4:z-4} c="#0a0a0c"/>)}
        {[-30,30].map(z=><Box key={`h${z}`} w={4} h={8} d={22} x={126} y={-6} z={z} c={lights?'#fffbe6':'#555'} glow={lights}/>)}
        {[-30,30].map(z=><Box key={`t${z}`} w={4} h={6} d={26} x={-126} y={-6} z={z} c="#e01020" glow/>)}
      </div></div></div>
}
