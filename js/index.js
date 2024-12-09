const myCanvas = document.getElementById('myCanvas')
const ctx = myCanvas.getContext('2d')
const boxSize = 80
function doMultiply () {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
  const num1 = document.getElementById('num1').value
  const num2 = document.getElementById('num2').value
  const num1Array = num1.split('')
  const num2Array = num2.split('')
  const sizeNum1 = num1.length
  const sizeNum2 = num2.length
  let product
  let sumArrays = []
  const numAdders = sizeNum1 * 2
  for (let a = 0; a < numAdders; a++) {
    sumArrays[a] = []
  }

  for (let i = 0; i < sizeNum1; i++) {
    for (let j = 0; j < sizeNum2; j++) {
      if (i === 0) {
        drawLabels(num1Array[j], j * boxSize + boxSize, i * boxSize + boxSize)
      }
      product = num1Array[j] * num2Array[i]
      if (product < 10) {
        product = '0' + product.toString()
      }
      let productArray = product.toString().split('')
      drawLabels(
        productArray[0],
        j * boxSize + boxSize,
        i * boxSize + boxSize + 30
      )
      sumArrays[j + i].push(productArray[0])
      drawLabels(
        productArray[1],
        j * boxSize + boxSize + 40,
        i * boxSize + boxSize + 80
      )
      sumArrays[j + i + 1].push(productArray[1])
      drawBox(j * boxSize + boxSize, i * boxSize + boxSize)
      if (j === sizeNum2 - 1) {
        drawLabels(
          num2Array[i],
          j * boxSize + 2 * boxSize,
          i * boxSize + 1.5 * boxSize
        )
      }
    }
  }

  let answers = []
  for (let a = sumArrays.length-1; a >= 0; a--) {
    let sum = 0
    for (let b = 0; b < sumArrays[a].length; b++) {
      let tempArray = sumArrays[a]
      sum += Number.parseInt(tempArray[b])
    }
    if (sum > 9) {
      let digits = sum.toString().split('');
      let nextArray = sumArrays[a-1]
      drawLabels(digits[0], boxSize*a-boxSize +boxSize-30, boxSize+30+15)
      nextArray.push(digits[0])
      answers.push(digits[1])
    }
    else {
      answers.push(sum.toString())
    }
  }
  for(let c=0;c< answers.length;c++) {
    if (c<answers.length/2) {
      drawLabels(answers[c],boxSize*(answers.length/2-c),boxSize*(answers.length/2)+boxSize+30)
    }
    else{
      drawLabels(answers[c],boxSize-30,boxSize*(answers.length-c)+boxSize)
    }
  }
}

function drawBox (x, y) {
  ctx.moveTo(x, y)
  ctx.lineTo(x, boxSize + y)
  ctx.lineTo(boxSize + x, boxSize + y)
  ctx.lineTo(boxSize + x, y)
  ctx.lineTo(x, y)
  ctx.lineTo(x, boxSize + y)
  ctx.lineTo(boxSize + x, y)
  ctx.moveTo(boxSize + x, y)
  ctx.lineTo(x - 30, boxSize + 30 + y)
  ctx.stroke()
}

function drawLabels (value, x, y) {
  ctx.font = '30px Arial'
  ctx.strokeText(value, x, y)
}

function countDigits (num) {
  // Convert the number to a string
  const numStr = Math.abs(num).toString()

  // Return the length of the string
  return numStr.length
}
