import { useRef, createRef } from "react"
import "./animate.css"
import Dombled from "./functions"
const watch = function (context, varName, get) {
  var value = context[varName]
  Object.defineProperty(context, varName, {
    get: function () {
      return get(varName, value, context)
    },
  })
}
// const time = t => new Promise(d => setTimeout(() => d(), t))
const create = function (type = "hook") {
  const dombled = new Dombled(true)
  // create ref selector
  dombled[0] = true
  dombled.__proto__.length = 1
  dombled.current =
    type === "hook" ? useRef.apply(this).current : createRef.apply(this).current

  //   await time(1)
  // ini list
  watch(dombled, "0", () => dombled.current)
  return dombled
}

const dombledClass = () => create("class")
const dombled = () => create("hook")
export { dombledClass }
export default dombled
