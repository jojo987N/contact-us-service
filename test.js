// let oppArray = ["0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0"];
//     x = 0
//     let interval = setInterval(()=> {
//         if(x === oppArray.length)
//         clearInterval(interval)
//         console.log(oppArray[x])
//         x++;
//     }, 50)

function fusc(val) {
    //  fusc(2*n + 1) = fusc(2*n) + fusc(n + 1)

    return recurse(val)
    
  }

function recurse(val, res){
    // console.log(val)

    n = Math.floor(val/2)

    // console.log(n)

    console.log(val, n)

    if(val === 0){
      res = 0
      return res
    }
    if(val === 1){
      res = 1
      return res
    }
    if(val%2 !== 0){
      res = recurse(n) + recurse(n + 1)
      // return res
      // console.log(val, n, res)
    }
    else{
      res = res + recurse(n)
      // return res
      // console.log(val, n, res)
    }
    return res
  }

  console.log(fusc(42))