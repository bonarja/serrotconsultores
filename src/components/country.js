import React from "react"
import css from "./country.module.scss"
import co from "./../icons/co.svg"
import us from "./../icons/us.svg"
import ch from "./../icons/ch.svg"
import cr from "./../icons/cr.svg"
const Country = () => {
  return (
    <div className={css.Country}>
      <div className={`${css.left} center`}>
        <div>
          <div className={`${css.countrys} `}>
            <div className={`${css.countrysContext} cover center`}>
              <div className="center">
                <img src={us}></img>
              </div>
              <div className="center">
                <img src={ch}></img>
              </div>
              <div className="center">
                <img src={cr}></img>
              </div>
              <div className="center">
                <img src={co}></img>
              </div>
            </div>
          </div>
          <div className={`${css.info}`}>
            <div className={`${css.infoContext} cover`}>
              <h2>Nuestro equipo dinámico trabajando para ti desde:</h2>
              <p>Shenzhen, China</p>
              <p>Guangzhou, China</p>
              <p>Miami, Florida, USA</p>
              <p>San Jose, Costa Rica</p>
              <p>Barranquilla, Colombia</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${css.right} center y`}>
        <h2>#TeamWork</h2>
        <p>
          Todos coordinados por nuestra experimentada CEO Karina Gonzalez,
          permitirán que sientas tranquilidad mientras que tu negocio tiene la
          oportunidad de crecer con grandes y mejores servicios de proveeduria.
        </p>
      </div>
    </div>
  )
}
export default Country
