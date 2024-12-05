const myCanvas = document.getElementById('myCanvas')
const ctx = myCanvas.getContext('2d')
const boxSize = 80
function doMultiply () {
  const num1 = document.getElementById('num1').value
  const num2 = document.getElementById('num2').value
  const num1Array = num1.split('')
  const num2Array = num2.split('')
  const sizeNum1 = num1.length
  const sizeNum2 = num2.length
  for (let i = 0; i < sizeNum1; i++) {
    drawLabels(num1Array[i], i * boxSize + boxSize, i * boxSize + boxSize)
    for (let j = 0; j < sizeNum2; j++) {
      drawBox(j * boxSize + boxSize, i * boxSize + boxSize)
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
  ctx.lineTo(x - 15, boxSize + 15 + y)
  ctx.stroke()
}
function drawLabels (value, x, y) {
  ctx.font = '50px Arial'
  ctx.strokeText(value, x, y)
}

function countDigits (num) {
  // Convert the number to a string
  const numStr = Math.abs(num).toString()

  // Return the length of the string
  return numStr.length
}
