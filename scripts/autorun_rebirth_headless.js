#!/usr/bin/env node
/** Headless: death → rebirth (orphan → prince). */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.join(__dirname, '..');
const localStorage = { _d: {}, getItem(k){ return this._d[k] ?? null; }, setItem(k,v){ this._d[k]=String(v); }, removeItem(k){ delete this._d[k]; } };
function styleObj(){ const s={}; s.setProperty=function(k,v){this[k]=v;}; return s; }
function el(){ return { style:styleObj(), dataset:{}, classList:{_s:new Set(),add(x){this._s.add(x);},remove(x){this._s.delete(x);},contains(x){return this._s.has(x);},toggle(x,f){if(f===true){this._s.add(x);return true;}if(f===false){this._s.delete(x);return false;}if(this._s.has(x)){this._s.delete(x);return false;}this._s.add(x);return true;}}, children:[], innerHTML:'', textContent:'', value:'', onclick:null, setAttribute(){}, getAttribute(){return null;}, appendChild(c){this.children.push(c);return c;}, addEventListener(){}, querySelector(){return null;}, querySelectorAll(){return [];}, getBoundingClientRect(){return {top:0,left:0,width:100,height:40,bottom:40,right:100};} }; }
const byId = { app: el(), toast: el(), 'modal-bg': el(), 'modal-body': el() };
const bodyEl = el(); bodyEl.dataset = {};
const document = { documentElement: el(), body: bodyEl, head: el(), getElementById(id){ return byId[id]||(byId[id]=el()); }, querySelector(){return null;}, querySelectorAll(){return [];}, createElement(){return el();}, addEventListener(){}, readyState:'complete' };
const windowObj = { __JH_ASSETS:{portraits:{},scenes:{},thumbs:{}}, localStorage, document, navigator:{userAgent:'node'}, location:{href:'file://t',search:'',pathname:'/'}, history:{pushState(){},replaceState(){}}, innerHeight:800, innerWidth:400, scrollY:0, pageYOffset:0, scrollTo(){}, addEventListener(){}, requestAnimationFrame(cb){return setTimeout(cb,0);}, console, setTimeout, clearTimeout, Math, JSON, Date, parseInt, parseFloat, isNaN, Number, String, Array, Object, RegExp, Error, Promise, Map, Set, encodeURIComponent, decodeURIComponent, fetch: async()=>({ok:false,json:async()=>({})}) };
windowObj.window=windowObj; windowObj.self=windowObj; windowObj.globalThis=windowObj;
const sandbox = new Proxy({ window:windowObj, document, localStorage, console, setTimeout, clearTimeout, Math, JSON, Date, parseInt, parseFloat, isNaN, Number, String, Array, Object, RegExp, Error, Promise, Map, Set, encodeURIComponent, decodeURIComponent, global:windowObj, self:windowObj, globalThis:windowObj }, { get(t,k){ return k in t ? t[k] : windowObj[k]; }, set(t,k,v){ t[k]=v; windowObj[k]=v; return true; }, has(){ return true; } });
vm.runInNewContext(fs.readFileSync(path.join(root,'game.js'),'utf8'), sandbox, { filename:'game.js', timeout:60000 });
if (typeof sandbox.window.__JH_AUTORUN_REBIRTH !== 'function') {
  console.error('missing __JH_AUTORUN_REBIRTH');
  process.exit(3);
}
const result = sandbox.window.__JH_AUTORUN_REBIRTH();
console.log(JSON.stringify(result, null, 2));
process.exit(result && result.ok ? 0 : 2);
