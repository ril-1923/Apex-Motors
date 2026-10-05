import type { Vehicle, TechnologyFeature } from './types'
export const vehicles: Vehicle[] = [
 {id:'x1',name:'APEX X1',category:'Electric Performance',tags:['Electric','Performance'],hp:620,torque:810,accel:3.2,top:285,range:560,battery:'100 kWh',drive:'AWD',weight:1980,price:128000},
 {id:'gt',name:'APEX GT',category:'Grand Touring',tags:['Performance','Luxury'],hp:540,torque:700,accel:3.8,top:300,range:720,battery:'V8 Hybrid',drive:'RWD',weight:1710,price:142000},
 {id:'r',name:'APEX R',category:'Track Performance',tags:['Performance'],hp:780,torque:850,accel:2.7,top:340,range:430,battery:'V8 Twin-Turbo',drive:'RWD',weight:1490,price:215000},
 {id:'eon',name:'APEX EON',category:'Electric Luxury',tags:['Electric','Luxury'],hp:510,torque:740,accel:4.1,top:250,range:640,battery:'110 kWh',drive:'AWD',weight:2180,price:119000},
 {id:'suvx',name:'APEX SUV-X',category:'Performance SUV',tags:['SUV','Performance'],hp:590,torque:760,accel:3.9,top:275,range:520,battery:'95 kWh',drive:'AWD',weight:2350,price:134000},
 {id:'vision',name:'APEX VISION',category:'Concept',tags:['Concept','Electric'],hp:900,torque:1100,accel:2.4,top:380,range:600,battery:'120 kWh Solid-State',drive:'Quad Motor AWD',weight:1650,price:390000}]
export const colors: Record<string,string> = {'Obsidian Black':'#15161a','Titanium Silver':'#9ea3ab','Racing Red':'#b0121f','Arctic White':'#e9edf0','Electric Blue':'#1d5bd6','Midnight Green':'#0f3b32'}
export const options = {
 wheels:{'Aero 19"':0,'Sport 20"':2500,'Carbon 21"':6500,'Performance 22"':8500},
 interior:{'Black Leather':0,'Tan Leather':1800,'Red Sport':2400,'Carbon Black':4200},
 lighting:{'Standard':0,'Matrix LED':3200,'Laser Vision':6800},
 pkg:{'Essential':0,'Performance':14000,'Track':26000}} as const
export const technologies: TechnologyFeature[] = [
 {title:'Intelligent Drive',text:'Eight cameras and radar keep lane position, adapt speed to traffic and brake for hazards.',stat:'Level 2+ assist'},
 {title:'APEX AI',text:'An onboard assistant learns your routes, pre-conditions the cabin and tunes the powertrain to your driving.',stat:'40 TOPS onboard'},
 {title:'Electric Architecture',text:'An 800-volt pack charges from 10 to 80 percent in 18 minutes.',stat:'800 V'},
 {title:'Adaptive Suspension',text:'Air dampers re-tune 1,000 times per second to flatten the road.',stat:'1,000 Hz'},
 {title:'Smart Cockpit',text:'A curved 34-inch display and head-up projection keep information in your line of sight.',stat:'34" OLED'},
 {title:'Connected Vehicle',text:'Over-the-air updates add features and remote services link the car to your phone.',stat:'OTA updates'}]
