import React from "react"
import ReactDOM from "react-dom"
import VisibilitySensor from "react-visibility-sensor"
const ID = () =>
  "a" +
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
  try {
    let result = `@keyframes ${name} {`
    for (let key in json) {
      result += `${key}% {`
      for (let style in json[key]) {
        result += `${style
          .replace(/\.?([A-Z])/g, function (x, y) {
            return "-" + y.toLowerCase()
          })
          .replace(/^-/, "")}: ${json[key][style]};`
        result += "}"
      }
      // result += "}"
    }
    return result + "}"
  } catch (error) {
    throw "invalid keyframes format"
  }
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
class FrameBled extends React.Component {
  componentDidMount() {
    let frames = this.props.frames
    if (typeof this.props.frames !== "object") {
      if (this.props.from && this.props.to) {
        frames = {
          0: this.props.from,
          100: this.props.to,
        }
      } else {
        return
      }
    }

    if (Array.isArray(this.props.frames)) {
      const count = 100 / this.props.frames.length
      frames = {}
      this.props.frames.forEach((x, i) => {
        if (!i) {
          frames[count * i] = x
        } else {
          frames[count * (i + 1)] = x
        }
      })
    }

    const style = document.createElement("style")
    const delay = this.props.delay || 0
    const name = ID()
    const time = this.props.time || 1000
    style.innerHTML = jsonToStyle(name, frames)
    const node = ReactDOM.findDOMNode(this)
    if (this.props.repeat) {
      node.style.animationIterationCount =
        this.props.repeat === true ? "infinite" : this.props.repeat
    }
    if (this.props.fill) {
      node.style.animationFillMode = this.props.fill
    }
    node.style.animationDuration = time + "ms"
    delay && (node.style.animationDelay = delay)
    node.parentElement.appendChild(style)
    node.style.animationName = name
    if (this.props.repeat !== true) {
      const repeat = this.props.repeat || 1
      setTimeout(() => {
        typeof this.props.onfinish === "function" && this.props.onfinish(node)
      }, (time + delay) * repeat)
    }
  }
  render() {
    return <>{this.props.children}</>
  }
}
class AnimateScroll extends React.Component {
  node = null
  display = true
  _static = true
  show = false
  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this)
    if (this.props.child) {
      this.node = this.node.querySelector(this.props.child)
    }
    if (this.props.display === false || this.props.in) {
      this.display = false
      this.node.style.visibility = "hidden"
    }
    if (this.props.time) {
      this.node.style.animationDuration = this.props.time + "ms"
    }
    if (this.props.delay) {
      this.node.style.animationDelay = this.props.delay + "ms"
    }
    this.props.static === false && (this._static = false)
  }
  getArray = data =>
    Array.isArray(data) ? data : data.replace(/ /g, "").split(",")
  change = isVisible => {
    // debugger
    if (!this.node) return
    if (isVisible) {
      if (this.props.in) {
        if (this.show) return
        this.show = true
        if (!this._static) {
          const list = [this.props.in]
          this.props.out && list.push(this.props.out)
          this.node.classList.remove.apply(this.node.classList, list)
        }
        this.node.classList.add.apply(this.node.classList, [
          "animated",
          this.props.in,
        ])
        !this.display && (this.node.style.visibility = "visible")
        return
      }
      if (this.props.animate) {
        const list = this.getArray(this.props.animate)
        const removeList = ["animated", list[0]]
        list[1] && removeList.push(list[1])
        this.node.classList.remove.apply(this.node.classList, removeList)
        setTimeout(() => {
          this.node.classList.add.apply(this.node.classList, [
            "animated",
            list[0],
          ])
        }, 1)
        !this.display && (this.node.style.visibility = "visible")
        return
      }
      if (this.props.classIn || this.props.toggle) {
        this.node.classList.add.apply(
          this.node.classList,
          this.getArray(this.props.classIn || this.props.toggle)
        )
        console.log(this.display, this.displayType)
        !this.display && (this.node.style.visibility = "visible")
      }
    } else {
      if (this.props.out) {
        this.show = false
        this.node.classList.add.apply(this.node.classList, [
          "animated",
          this.props.out,
        ])
        return
      }
      if (this.props.animate) {
        const list = this.getArray(this.props.animate)
        if (list[1]) {
          this.node.classList.remove.apply(this.node.classList, [
            "animated",
            list[0],
            list[1],
          ])
          setTimeout(() => {
            this.node.classList.add.apply(this.node.classList, [
              "animated",
              list[1],
            ])
          }, 1)
          return
        }
      }
      if (this.props.classOut || this.props.toggle) {
        this.node.classList.remove.apply(
          this.node.classList,
          this.getArray(this.props.classIn || this.props.toggle)
        )
        !this.display && (this.node.style.visibility = "hidden !important")
      }
    }
  }
  render() {
    return (
      <VisibilitySensor
        offset={{ top: this.props.top || 0, left: this.props.left || 0 }}
        minTopValue={this.props.min || 100}
        children={this.props.children}
        onChange={isVisible => this.change(isVisible)}
        partialVisibility={this.props.partial || true}
        // resizeCheck={true}
      ></VisibilitySensor>
    )
  }
}
const Hidden = { style: { visibility: "hidden" } }
export default FrameBled
export { createFrames, runFrames, ID, AnimateScroll, Hidden }
