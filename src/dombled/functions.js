// animations
const wait = time => new Promise(done => setTimeout(() => done(), time))
const asynFor = (array, callback) => {
  return new Promise(done => {
    let index = -1
    const next = () => {
      index++
      if (index >= array.length) {
        return done()
      }
      callback({
        item: array[index],
        index,
        last: index >= array.length ? true : false,
        first: index === 0 ? true : false,
        next,
      })
    }
    if (array.length) {
      next()
    }
  })
}

function IN(a, _arguments) {
  var self = this
  return new Promise(function (done) {
    var options = {
      name: a,
      time: 800,
      display: "block",
      delay: 0,
      delayFinish: 0,
    }

    for (var arg in _arguments) {
      var aux = _arguments[arg]
      if (typeof aux === "number") {
        options.time = aux
      } else if (typeof aux === "string") {
        options.display = aux
      } else if (typeof aux === "object") {
        options = Object.assign(options, aux)
      }
    }

    const run = (opt = null) => {
      if (opt) {
        options = Object.assign(options, opt)
      }
      setTimeout(function () {
        var me = self.__self__
        var _class = ["animated", options.name]
        if (options.delayItem) {
          asynFor(me, ({ item, next }) => {
            item &&
              setTimeout(() => {
                item.classList.add.apply(item.classList, _class)
                next()
              }, options.delayItem)
          }).then(() => {
            me.forEach(function (x) {
              x && x.classList.remove.apply(x.classList, _class)
            })
            if (options.onfinish) {
              options.onfinish({ self: me, run, time: wait })
            }
            done(me)
          })
        } else {
          me.forEach(function (x) {
            x.removeAttribute("hidden")
            x.style.display = options.display
            x.classList.add.apply(x.classList, _class)
            x.style.animationDuration = options.time + "ms"
          })
          setTimeout(() => {
            me.forEach(function (x) {
              x && x.classList.remove.apply(x.classList, _class)
            })
            if (options.onfinish) {
              options.onfinish({ self: me, run, time: wait })
            }
            done(me)
            // }
          }, options.time + options.delayFinish)
        }
      }, options.delay)
    }
    run()
  })
}
function OUT(a, _arguments) {
  var self = this
  return new Promise(function (done) {
    var options = {
      name: a,
      time: 800,
      delay: 0,
      delayFinish: 0,
    }

    for (var arg in _arguments) {
      var aux = _arguments[arg]
      if (typeof aux === "number") {
        options.time = aux
      } else if (typeof aux === "object") {
        options = Object.assign(options, aux)
      }
    }
    const run = (opt = null) => {
      if (opt) {
        options = Object.assign(options, opt)
      }
      setTimeout(function () {
        var me = self.__self__
        var _class = ["animated", options.name]

        if (options.delayItem) {
          asynFor(me, ({ item, next }) => {
            item &&
              setTimeout(() => {
                item.classList.add.apply(item.classList, _class)
                next()
              }, options.delayItem)
          }).then(() => {
            me.forEach(function (x) {
              x && x.classList.remove.apply(x.classList, _class)
            })
            if (options.onfinish) {
              options.onfinish({ self: me, run, time: wait })
            }
            done(me)
          })
        } else {
          me.forEach(function (x) {
            x.style.animationDuration = options.time + "ms"
            x.classList.add.apply(x.classList, _class)
          })
          setTimeout(function () {
            me.forEach(function (x) {
              if (!x) return
              x.style.display = "none"
              x.classList.remove.apply(x.classList, _class)
            })
            if (options.onfinish) {
              options.onfinish({ self: me, run, time: wait })
            }
            done(me)
          }, options.time + options.delayFinish)
        }
      }, options.delay)
    }
    run()
  })
}
function ANIMATE(a, _arguments) {
  return IN(a, _arguments)
}
class Dombled {
  constructor(el) {
    if (el) {
      if (typeof el === "string") {
        const list = document.querySelectorAll(el)
        this.__proto__.length = list.length
        list.forEach((x, i) => (this[i] = x))
      } else if (el.length) {
        this.__proto__.length = el.length
        el.forEach((x, i) => (this[i] = x))
      } else {
        this.__proto__.length = 1
        this[0] = el
      }
      Object.defineProperty(this.__proto__, "__self__", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: this,
      })
    }
  }
}
Dombled.prototype.length = 0
Dombled.prototype.forEach = function (callback) {
  for (let x = 0; x < this.__self__.length; x++) {
    callback(this.__self__[x], x)
  }
}
Dombled.prototype.find = function (val) {
  if (this.__self__[0]) {
    const list = this.__self__[0].querySelectorAll(val)
    const select = new Dombled(list, false)
    if (!list.length) return false
    select.__self__ = select
    select.length = list.length
    return select
  }
  return false
}
Dombled.prototype.findOne = function (val) {
  if (this.__self__[0]) {
    const list = this.__self__[0].querySelector(val)
    if (!list) return false
    console.log(this.__self__)
    const select = new Dombled(list)
    select.__self__ = select
    select.length = 1
    console.log(select)
    return select
  }
  return false
}
Dombled.prototype.get = function (num) {
  if (typeof num === "number" && this.__self__[num]) {
    return this.__self__[num]
  }
  return false
}
Dombled.prototype.eq = function (num) {
  if (typeof num === "number" && this.__self__[num]) {
    const select = new Dombled(this.__self__[num])
    select.__self__ = select
    select.length = 1
    return select
  } else if (num instanceof Element) {
    const select = new Dombled(num)
    select.__self__ = select
    select.length = 1
    return select
  }
  return false
}
Dombled.prototype.loop = function (callback) {
  let index = -1
  let iteration = 0
  const list = []
  this.forEach(x => list.push(this.eq(x)))
  const setIteration = num => {
    iteration = num
  }
  const next = () => {
    iteration++
    index++
    if (index >= this.length) {
      index = 0
    }
    let nextIndex = index + 1 === this.length ? 0 : index + 1
    let prevIndex = index - 1 < 0 ? this.length - 1 : index - 1
    callback({
      index,
      item: list[index],
      nextItem: list[nextIndex],
      prevItem: list[prevIndex],
      next,
      time: wait,
      iteration,
      setIteration,
    })
  }
  next()
}
Dombled.prototype.findFromParent = function (val) {
  if (this[0]) {
    return new Dombled(this[0].parentElement.querySelector(val))
  }
  return false
}
Dombled.prototype.attr = function (a, b) {
  if (typeof a === "string" && typeof b == "string") {
    this.forEach(function (x) {
      x.setAttribute(a, b)
    })
    return this
  } else if (typeof a === "string" && !b) {
    if (this[0]) {
      return this[0].getAttribute(a)
    } else {
      return null
    }
  }
}
Dombled.prototype.addClass = function (a) {
  var list
  if (typeof a === "string") {
    list = a.split(" ")
  } else {
    list = a
  }
  this.forEach(function (x) {
    if (x) {
      list.forEach(function (_class) {
        if (x.classList) {
          x.classList.add(_class)
        } else {
          x[_class] += " " + _class
        }
      })
    }
  })
  return this
}
Dombled.prototype.removeClass = function (a) {
  var list
  if (typeof a === "string") {
    list = a.split(" ")
  } else {
    list = a
  }
  this.forEach(function (x) {
    if (x) {
      list.forEach(function (_class) {
        if (x.classList) {
          x.classList.remove(_class)
        } else if (x[_class]) {
          x[_class] = x[_class].replace(
            new RegExp(
              "(^|\\b)" + _class.split(" ").join("|") + "(\\b|$)",
              "gi"
            ),
            " "
          )
        }
      })
    }
  })
  return this
}
Dombled.prototype.toggleClass = function (a) {
  this.forEach(function (x) {
    x.classList.toggle(a)
  })
  return this
}
Dombled.prototype.html = function (a) {
  if (a === undefined) {
    if (this[0]) {
      return this[0].innerHTML
    } else {
      return ""
    }
  } else if (a) {
    this.forEach(function (x) {
      x.innerHTML = a
    })
    return this
  }
}
Dombled.prototype.css = function (a, b) {
  var include = [
    "border-radius",
    "border-bottom-left-radius",
    "border-top-left-radius",
    "border-bottom-right-radius",
    "border-top-right-radius",
    "left",
    "top",
    "bottom",
    "right",
  ]
  if (
    typeof a === "string" &&
    (typeof b === "string" || typeof b === "number")
  ) {
    if (typeof b === "number") {
      b = b + "px"
    }
    this.forEach(function (x) {
      x.style[a] = b
    })
  } else if (typeof a === "object" && !b) {
    var self = this
    var action = function (key, a) {
      self.forEach(function (x) {
        if (
          typeof a[key] === "number" &&
          a[key] !== 0 &&
          (include.includes(key) || /width|padding|margin|height/.test(key))
        ) {
          a[key] = a[key] + "px"
        }
        x.style[key] = a[key]
      })
    }

    for (var key in a) {
      action(key, a)
    }
  } else if (typeof a === "string" && !b) {
    var style = this[0].currentStyle || window.getComputedStyle(this[0])
    return style[a]
  }
  return this
}
Dombled.prototype.px = function (a) {
  if (this[0]) {
    var style = this[0].currentStyle || window.getComputedStyle(this[0])
    if (!style[a]) return null
    return Number(style[a].match(/\d/g).join(""))
  } else {
    return null
  }
}
Dombled.prototype.width = function (a) {
  if (a) {
    if (typeof a === "number") {
      a = a + "px"
    }
    this.forEach(function (x) {
      x.offsetWidth = a
    })
    return this
  } else if (this[0]) {
    return this[0].offsetWidth
  } else {
    return null
  }
}
Dombled.prototype.height = function (a) {
  if (a) {
    if (typeof a === "number") {
      a = a + "px"
    }
    this.forEach(function (x) {
      x.offsetHeight = a
    })
    return this
  } else if (this[0]) {
    return this[0].offsetHeight
  } else {
    return null
  }
}
Dombled.prototype.parent = function () {
  if (this[0]) {
    return new Dombled(this[0].parentElement)
  } else {
    return false
  }
}
Dombled.prototype.visible = function (a) {
  if (a === true || a === false) {
    var val
    if (a === true) {
      val = "block"
    } else if (a === false) {
      val = "none"
    } else {
      val = a
    }
    this.forEach(function (x) {
      x.style.display = val
    })
    return this
  } else if (typeof a === "string") {
    this.forEach(function (x) {
      x.style.display = a
    })
    return this
  } else {
    var el
    if (this[0]) {
      el = this[0]
    } else {
      return false
    }

    if (!el.style) {
      return false
    }
    if (el.style.display === "none") {
      return false
    } else {
      return true
    }
  }
}
Dombled.prototype.nextElement = function () {
  if (this[0]) {
    return new Dombled(this[0].nextElementSibling)
  } else {
    return false
  }
}
Dombled.prototype.prevElement = function () {
  if (this[0]) {
    return new Dombled(this[0].previousElementSibling)
  } else {
    return false
  }
}
Dombled.prototype.on = function (a, b) {
  this.forEach(function (x) {
    x["on" + a] = b
  })
}
Dombled.prototype.click = function (a) {
  if (a) {
    this.forEach(function (x) {
      x.onclick = a
    })
  } else {
    this.forEach(function (x) {
      x.click()
    })
  }
}
Dombled.prototype.list = function () {
  var current = null
  var first = null
  this.forEach((x, i) => {
    if (current == null) {
      first = x
      current = x
    } else {
      current.next = x
      x.prev = current
      current = x
    }
    if (i >= this.length) {
      x.next = first
      first.prev = x
    }
  })

  var r = new Dombled(current)
  r.__proto__.currentList = current
  r.__proto__.first = first
  r.__proto__.last = current
  return r
}
Dombled.prototype.next = function () {
  if (this.currentList) {
    var next = new Dombled(this.currentList.next)
    next.__proto__.currentList = this.currentList.next
    next.__proto__.first = this.first
    next.__proto__.last = this.last
    return next
  }
  return this[0] || null
}
Dombled.prototype.prev = function () {
  if (this.currentList) {
    var prev = new Dombled(this.currentList.prev)
    prev.__proto__.currentList = this.currentList.prev
    prev.__proto__.first = this.first
    prev.__proto__.last = this.last
    return prev
  }
  return this[0] || null
}
Dombled.prototype.focus = function (a, b) {
  if (!a && !b) {
    if (this[0]) {
      return this[0].hasFocus()
    } else {
      return false
    }
  }
  if (a) {
    this.forEach(function (x) {
      x.onfocus = a
    })
  }
  if (b) {
    this.forEach(function (x) {
      x.onblur = b
    })
  }
  return this
}
Dombled.prototype.val = function (a) {
  if (a !== undefined) {
    this.forEach(function (x) {
      x.value = a
    })
    return this
  } else {
    if (this[0]) {
      return this[0].value
    } else {
      return false
    }
  }
}
Dombled.prototype.append = function (a) {
  var tmp
  if (typeof a == "string") {
    tmp = document.createElement("div")
    tmp.innerHTML = a
  }
  this.forEach(function (x) {
    if (typeof a == "string") {
      while (tmp.children.length > 0) {
        x.appendChild(tmp.children[0])
      }
    } else {
      x.appendChild(a)
    }
  })
  return this
}
Dombled.prototype.prepend = function (a) {
  var tmp
  if (typeof a == "string") {
    tmp = document.createElement("div")
    tmp.innerHTML = a
  }
  this.forEach(function (x) {
    if (typeof a == "string") {
      while (tmp.children.length > 0) {
        x.insertBefore(tmp.children[tmp.children.length - 1], x.firstChild)
      }
    } else {
      x.insertBefore(a, x.firstChild)
    }
  })
  return this
}
Dombled.prototype.scrollAt = function (block, behavior) {
  if (!this[0]) return false

  if (!block) {
    block = "start"
  }
  if (!behavior) {
    behavior = "smooth"
  }
  this[0].scrollIntoView({
    block: block,
    behavior: behavior,
  })
  return this
}
Dombled.prototype.position = function () {
  if (this[0]) {
    return this[0].getBoundingClientRect()
  } else {
    return false
  }
}

// in animation
Dombled.prototype.inBounce = function () {
  console.log(this)
  return IN.call(this, "bounceIn", arguments)
}
Dombled.prototype.inBounceDown = function () {
  return IN.call(this, "bounceInDown", arguments)
}
Dombled.prototype.inBounceLeft = function () {
  return IN.call(this, "bounceInLeft", arguments)
}
Dombled.prototype.inBounceRight = function () {
  return IN.call(this, "bounceInRight", arguments)
}
Dombled.prototype.inBounceUp = function () {
  return IN.call(this, "bounceInUp", arguments)
}
Dombled.prototype.inFade = function () {
  return IN.call(this, "fadeIn", arguments)
}
Dombled.prototype.inFadeDown = function () {
  return IN.call(this, "fadeInDown", arguments)
}
Dombled.prototype.inFadeDownBig = function () {
  return IN.call(this, "fadeInDownBig", arguments)
}
Dombled.prototype.inFadeLeft = function () {
  return IN.call(this, "fadeInLeft", arguments)
}
Dombled.prototype.inFadeLeftBig = function () {
  return IN.call(this, "fadeInLeftBig", arguments)
}
Dombled.prototype.inFadeRight = function () {
  return IN.call(this, "fadeInRight", arguments)
}
Dombled.prototype.inFadeRightBig = function () {
  return IN.call(this, "fadeInRightBig", arguments)
}
Dombled.prototype.inFadeUp = function () {
  return IN.call(this, "fadeInUp", arguments)
}
Dombled.prototype.inFadeUpBig = function () {
  return IN.call(this, "fadeInUpBig", arguments)
}
Dombled.prototype.inFlipX = function () {
  return IN.call(this, "flipInX", arguments)
}
Dombled.prototype.inFlipY = function () {
  return IN.call(this, "flipInY", arguments)
}
Dombled.prototype.inLightSpeed = function () {
  return IN.call(this, "lightSpeedIn", arguments)
}
Dombled.prototype.inRotate = function () {
  return IN.call(this, "rotateIn", arguments)
}
Dombled.prototype.inRotateDownLeft = function () {
  return IN.call(this, "rotateInDownLeft", arguments)
}
Dombled.prototype.inRotateDownRight = function () {
  return IN.call(this, "rotateInDownRight", arguments)
}
Dombled.prototype.inRotateUpLeft = function () {
  return IN.call(this, "rotateInUpLeft", arguments)
}
Dombled.prototype.inRotateUpRight = function () {
  return IN.call(this, "rotateInUpRight", arguments)
}
Dombled.prototype.inSlideUp = function () {
  return IN.call(this, "slideInUp", arguments)
}
Dombled.prototype.inSlideDown = function () {
  return IN.call(this, "slideInDown", arguments)
}
Dombled.prototype.inSlideLeft = function () {
  return IN.call(this, "slideInLeft", arguments)
}
Dombled.prototype.inSlideRight = function () {
  return IN.call(this, "slideInRight", arguments)
}
Dombled.prototype.inZoom = function () {
  return IN.call(this, "zoomIn", arguments)
}
Dombled.prototype.inZoomoDown = function () {
  return IN.call(this, "zoomInDown", arguments)
}
Dombled.prototype.inZoomLeft = function () {
  return IN.call(this, "zoomInLeft", arguments)
}
Dombled.prototype.inZoomRight = function () {
  return IN.call(this, "zoomInRight", arguments)
}
Dombled.prototype.inZoomUp = function () {
  return IN.call(this, "zoomInUp", arguments)
}
Dombled.prototype.inJackInTheBox = function () {
  return IN.call(this, "jackInTheBox", arguments)
}
Dombled.prototype.inRoll = function () {
  return IN.call(this, "rollIn", arguments)
}

// out animation
Dombled.prototype.outBounce = function () {
  return OUT.call(this, "bounceOut", arguments)
}
Dombled.prototype.outBounceDown = function () {
  return OUT.call(this, "bounceOutDown", arguments)
}
Dombled.prototype.outBounceLeft = function () {
  return OUT.call(this, "bounceOutLeft", arguments)
}
Dombled.prototype.outBounceRight = function () {
  return OUT.call(this, "bounceOutRight", arguments)
}
Dombled.prototype.outBounceUp = function () {
  return OUT.call(this, "bounceOutUp", arguments)
}
Dombled.prototype.outFade = function () {
  return OUT.call(this, "fadeOut", arguments)
}
Dombled.prototype.outFadeDown = function () {
  return OUT.call(this, "fadeOutDown", arguments)
}
Dombled.prototype.outFadeDownBig = function () {
  return OUT.call(this, "fadeOutDownBig", arguments)
}
Dombled.prototype.outFadeLeft = function () {
  return OUT.call(this, "fadeOutLeft", arguments)
}
Dombled.prototype.outFadeLeftBig = function () {
  return OUT.call(this, "fadeOutLeftBig", arguments)
}
Dombled.prototype.outFadeRight = function () {
  return OUT.call(this, "fadeOutRight", arguments)
}
Dombled.prototype.outFadeRightBig = function () {
  return OUT.call(this, "fadeOutRightBig", arguments)
}
Dombled.prototype.outFadeUp = function () {
  return OUT.call(this, "fadeOutUp", arguments)
}
Dombled.prototype.outFadeUpBig = function () {
  return OUT.call(this, "fadeOutUpBig", arguments)
}
Dombled.prototype.outFlipX = function () {
  return OUT.call(this, "flipOutX", arguments)
}
Dombled.prototype.outFlipY = function () {
  return OUT.call(this, "flipOutY", arguments)
}
Dombled.prototype.outLightSpeed = function () {
  return OUT.call(this, "lightSpeedOut", arguments)
}
Dombled.prototype.outRotate = function () {
  return OUT.call(this, "rotateOut", arguments)
}
Dombled.prototype.outRotateDownLeft = function () {
  return OUT.call(this, "rotateOutDownLeft", arguments)
}
Dombled.prototype.outRotateDownRight = function () {
  return OUT.call(this, "rotateOutDownRight", arguments)
}
Dombled.prototype.outRotateUpLeft = function () {
  return OUT.call(this, "rotateOutUpLeft", arguments)
}
Dombled.prototype.outRotateUpRight = function () {
  return OUT.call(this, "rotateOutUpRight", arguments)
}
Dombled.prototype.outSlideUp = function () {
  return OUT.call(this, "slideOutUp", arguments)
}
Dombled.prototype.outSlideDown = function () {
  return OUT.call(this, "slideOutDown", arguments)
}
Dombled.prototype.outSlideLeft = function () {
  return OUT.call(this, "slideOutLeft", arguments)
}
Dombled.prototype.outSlideRight = function () {
  return OUT.call(this, "slideOutRight", arguments)
}
Dombled.prototype.outZoom = function () {
  return OUT.call(this, "zoomOut", arguments)
}
Dombled.prototype.outZoomDown = function () {
  return OUT.call(this, "zoomOutDown", arguments)
}
Dombled.prototype.outZoomLeft = function () {
  return OUT.call(this, "zoomOutLeft", arguments)
}
Dombled.prototype.outzoomRight = function () {
  return OUT.call(this, "zoomOutRight", arguments)
}
Dombled.prototype.outZoomUp = function () {
  return OUT.call(this, "zoomOutUp", arguments)
}
Dombled.prototype.outRoll = function () {
  return OUT.call(this, "rollOut", arguments)
}
Dombled.prototype.outHige = function () {
  return OUT.call(this, "hinge", arguments)
}

// animate
Dombled.prototype.animateBounce = function () {
  return ANIMATE.call(this, "bounce", arguments)
}
Dombled.prototype.animateFlash = function () {
  return ANIMATE.call(this, "flash", arguments)
}
Dombled.prototype.animatePulse = function () {
  return ANIMATE.call(this, "pulse", arguments)
}
Dombled.prototype.animateRubberBand = function () {
  return ANIMATE.call(this, "rubberBand", arguments)
}
Dombled.prototype.animateShake = function () {
  return ANIMATE.call(this, "shake", arguments)
}
Dombled.prototype.animateSwing = function () {
  return ANIMATE.call(this, "swing", arguments)
}
Dombled.prototype.animateTada = function () {
  return ANIMATE.call(this, "tada", arguments)
}
Dombled.prototype.animateWobble = function () {
  return ANIMATE.call(this, "wobble", arguments)
}
Dombled.prototype.animateJello = function () {
  return ANIMATE.call(this, "jello", arguments)
}
Dombled.prototype.animateHeartBeat = function () {
  return ANIMATE.call(this, "heartBeat", arguments)
}
Dombled.prototype.animateFlip = function () {
  return ANIMATE.call(this, "flip", arguments)
}

export default Dombled
