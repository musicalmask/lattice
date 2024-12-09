const myCanvas = document.getElementById('myCanvas')
const ctx = myCanvas.getContext('2d')
const boxSize = 80
const fontSize = 30
async function doMultiply () {
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
        await drawLabels(num1Array[j], j * boxSize + boxSize, i * boxSize + boxSize)
      }
      product = num1Array[j] * num2Array[i]
      if (product < 10) {
        product = '0' + product.toString()
      }
      let productArray = product.toString().split('')
      await drawLabels(
        productArray[0],
        j * boxSize + boxSize,
        i * boxSize + boxSize + fontSize
      )
      sumArrays[j + i].push(productArray[0])
      await drawLabels(
        productArray[1],
        j * boxSize + boxSize + 40,
        i * boxSize + boxSize + 80
      )
      sumArrays[j + i + 1].push(productArray[1])
      await drawBox(j * boxSize + boxSize, i * boxSize + boxSize)
      if (j === sizeNum2 - 1) {
        await drawLabels(
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
      await drawLabels(digits[0], boxSize*a-boxSize +boxSize-fontSize, boxSize+fontSize+fontSize/2, 20)
      nextArray.push(digits[0])
      answers.push(digits[1])
    }
    else {
      answers.push(sum.toString())
    }
  }
  for(let c=0;c< answers.length;c++) {
    if (c<answers.length/2) {
      await drawLabels(answers[c],boxSize*(answers.length/2-c),boxSize*(answers.length/2)+boxSize+fontSize)
    }
    else{
      await drawLabels(answers[c],boxSize-fontSize,boxSize*(answers.length-c)+boxSize)
    }
  }
}

async function drawBox (x, y) {
  await waitForTime()
  ctx.moveTo(x, y)
  ctx.lineTo(x, boxSize + y)
  ctx.lineTo(boxSize + x, boxSize + y)
  ctx.lineTo(boxSize + x, y)
  ctx.lineTo(x, y)
  ctx.lineTo(x, boxSize + y)
  ctx.lineTo(boxSize + x, y)
  ctx.moveTo(boxSize + x, y)
  ctx.lineTo(x - fontSize, boxSize + fontSize + y)
  ctx.stroke()
}

async function drawLabels (value, x, y, font = fontSize) {
  await waitForTime()
  ctx.font = font+'px Arial'
  ctx.strokeText(value, x, y)
}

async function waitForTime(ms=400) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve();
      }, ms);
  });
}
