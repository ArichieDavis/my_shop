export  function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
       if(this) func.apply(this, args)
    }, delay)
  }
}
