import React from "react"
import css from "./details.module.scss"
import persons from "../images/persons.jpg"
import { AnimateScroll } from "../framebled"
const Details = () => {
  return (
    <div className={`${css.details} relative`}>
      <img src={persons} className={`${css.bg} cover`} />
      <div className={`${css.wrapDetails} cover`}>
        <AnimateScroll in={"fadeInRight"}>
          <div className={`${css.info} center y`}>
            <h4>materials</h4>
            <h2>Otro Titulo</h2>
            <p>
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source.
            </p>
          </div>
        </AnimateScroll>
      </div>
    </div>
  )
}

export default Details
