import React, { useRef, useState } from "react"
import Header from "../components/header"
import css from "./context.module.scss"
import "../dombled/animate.css"
import menuIcon from "../icons/menu.svg"
export const Context = React.createContext()
const Provider = ({ children }) => {
  // $(window).scroll(function () {
  //   var scrolledY = $(window).scrollTop();
  //   $('#container').css('background-position', 'left ' + ((scrolledY)) + 'px');
  // });
  const menu = [
    { name: "Home", id: "home" },
    { name: "¿Quienes Somos?", id: "quienes_somos" },
    { name: "Nuestro servicio", id: "servicio" },
    { name: "Contáctanos", id: "contact" },
  ]
  const wrap = useRef(null)
  const [showMenu, setShowMenu] = useState(false)
  const closeMenu = () => {
    setShowMenu(false)
    wrap.current.removeEventListener("click", event, false)
  }
  const event = () => {
    closeMenu()
  }

  const toggleMenu = () => {
    if (!showMenu) {
      setShowMenu(true)
      wrap.current.addEventListener("click", event, false)
    } else {
      closeMenu()
    }
  }
  const scroll = domElementName => {
    wrap.current.querySelector(domElementName).scrollIntoView({
      block: "start",
      behavior: "smooth",
    })
  }
  const clickMenu = item => {
    item.id === "quienes_somos" && scroll("#home")
    item.id === "home" && scroll("#hero")
    item.id === "servicio" && scroll("#services2")
    item.id === "contact" && scroll("#contact")
    closeMenu()
  }
  return (
    <Context.Provider value={{ menu: v => clickMenu(v) }}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
      <div className={css.menuButton} onClick={() => toggleMenu()}>
        <img src={menuIcon} />
      </div>
      <div className={css.menu}>
        {menu.map((x, i) => (
          <div className={css.itemMenu} key={i} onClick={() => clickMenu(x)}>
            <span>{x.name}</span>
          </div>
        ))}
      </div>
      <div
        className={`${css.mainWrap} ${showMenu ? css.openMenu : ""} cover`}
        ref={wrap}
      >
        <Header menu={menu} clickMenu={clickMenu}></Header>
        {children}
      </div>
    </Context.Provider>
  )
}

export default ({ element, props }) => <Provider {...props}>{element}</Provider>
