import PropTypes from "prop-types"
import React from "react"
import css from "./header.module.scss"
const Header = ({ menu, clickMenu }) => {
  return (
    <header className={css.header}>
      <div></div>
      <div className={`${css.menu} headerMenu`}>
        {menu.map((x, i) => (
          <div
            className={`${css.item} center animated zoomIn`}
            key={i}
            style={{
              animationDelay: 100 * i + "ms",
              animationDuration: "450ms",
            }}
            onClick={() => clickMenu(x)}
          >
            <span>{x.name}</span>
          </div>
        ))}
      </div>
    </header>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
