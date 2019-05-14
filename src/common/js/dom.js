export function addClass(el,className){
  if (hasClass(el,className)) return
  let list = el.className.split(' ')
  list.push(className)
  el.className = list.join(' ')
}


export function hasClass(el,className) {
  let reg = new RegExp('(^|//s)' + className + '(//s|$)')
  return reg.test(el.className)
}

export function getData(el,name,val){
  let prefix = 'data-';
  if(val) {
    el.setAttribute(prefix + name,val)
  }else{
   return el.getAttribute(prefix + name);
  }

}

let vendor = (function(){
  let elementStyle = document.createElement('div').style
  let transformNames = {
    webkit: 'webkitTransform',
    ms:'msTransform',
    Moz:'MozTransform',
    O:'OTransform',
    standard:'transform'
  }
    
 for (let key in transformNames){
  if(elementStyle[transformNames[key]] !== undefined) {
    return key
}
return false
}
 
})()
export function prefixStyle(style) {
  if(vendor === false ){
    return false
  }
  if(vendor === 'standard'){
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substring(1)
}
/*

export function hasClass(el, className) {
  return el.classList.contains(className)
}

export function addClass(el, className) {
  el.classList.add(className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

*/