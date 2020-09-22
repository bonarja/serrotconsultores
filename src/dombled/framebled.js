const ID = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  ) +
  "-" +
  Date.now()
const jsonToStyle = (name, json) => {
  if (typeof name !== "string" || typeof json !== "object")
    throw "invalid arguments"

  let result = `@keyframes ${name} {`
  for (let key in json) {
    const data = json[key]
    result += `${key}% {`
    for (let style in json[key]) {
      result += `${style}: ${json[key][style]};`
    }
    result += "}"

    result += "}"
  }
  return result + "}"
}
const createFrames = (data, { repeat = false }) => {
  let frames = {}
  if (Array.isArray(data)) {
    const sum = 100 / data.length
    data.forEach((x, i) => {
      frames[sum * i + 1] = x
    })
  } else {
    frames = data
  }
  return {
    frames,
    repeat,
  }
}

const runFrames = (el, frames, time = 1000, delay = 0) => {
  return new Promise(done => {
    const name = ID()
    const head = document.querySelector("head")
    const nodeAnimation = document.createElement("style")
    nodeAnimation.innerHTML = jsonToStyle(name, frames.frames)

    const run = node => {
      node.style.animationName = name
      if (frames.repeat) {
        node.style.animationIterationCount = "infinite"
      }
      node.style.animationDuration = time + "ms"
      delay && (node.style.animationDelay = delay)
      head.appendChild(nodeAnimation)
    }

    // if is dombled selector
    if (el.__proto__.forEach) {
      el.forEach(x => {
        run(x)
      })
    } else {
      run(el)
    }

    setTimeout(() => {
      nodeAnimation.remove()
      done(el)
    }, time + delay + 10)
  })
}
export { createFrames, runFrames, ID }
