import React from "react"
import css from "./mission.module.scss"
import { AnimateScroll } from "../framebled"

const Mission = () => {
  const list = [
    {
      title: "1 - Análisis",
      info: "Análisis del producto requerido",
    },
    { title: "2 - Mercado", info: "Estudio de mercado" },
    {
      title: "3 - Proveedores",
      info: "Listado de posibles fabricas proveedoras",
    },
    {
      title: "4 - Revisión de fabricas en cuanto a:",
      info: `a. Registro&
        b. Certificado&
        c. Capacitdad de Producción&
        d. Evaluación de muestra&
        e. Precio
      `,
    },
    {
      title: "5 - Cotización",
      info:
        "Cotización en movimiento de carga y tramites de exportación e importación en ciudad de origen y destino",
    },
    { title: "6 - Cotización", info: "Cotización final" },
    { title: "7 - Compra", info: "Proceso de Compra" },
  ]
  return (
    <div id="services" className={css.mission}>
      <AnimateScroll in={"slideInLeft"}>
        <h2>Basamos nuestro servicio en los siguientes 7 pasos:</h2>
      </AnimateScroll>
      <div className={css.list}>
        {list.map((x, i) => (
          <AnimateScroll key={i} in={"zoomIn"}>
            <div className={`${css.item} relative center y`}>
              <div className={`${css.contain} cover`}>
                <h4>{x.title}</h4>
                <div>
                  {x.info.split("&").map((x, k) => (
                    <p key={k}>{x}</p>
                  ))}
                </div>
              </div>
            </div>
          </AnimateScroll>
        ))}
      </div>
    </div>
  )
}

export default Mission
