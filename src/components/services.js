import React from "react"
import css from "./services.module.scss"
import icon1 from "../icons/running.svg"
import icon2 from "../icons/web.svg"
import icon3 from "../icons/box.svg"
import { AnimateScroll } from "../framebled"
const Services = () => {
  return (
    <div id="services2" className={css.services}>
      <div className={`${css.containt} cover`}>
        <div className={`${css.title} center y`}>
          <div className={`${css.wrap} center y`}>
            <AnimateScroll in={"slideInUp"}>
              <div>
                <h2>Servicios</h2>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old.
                </p>
              </div>
            </AnimateScroll>
          </div>
        </div>
        <div>
          <div className={`${css.line} ${css.left}`}>
            <AnimateScroll in={"slideInLeft"}>
              <div className={css.wrapImage}>
                <div className={`${css.image} center`}>
                  <img src={icon1} />
                </div>
              </div>
            </AnimateScroll>
            <div className={`${css.info} center y`}>
              <AnimateScroll in={"zoomIn"}>
                <div className={css.text}>
                  <h3>Title</h3>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text.
                  </p>
                </div>
              </AnimateScroll>
            </div>
          </div>
          <div className={`${css.line} ${css.right}`}>
            <AnimateScroll in={"slideInRight"}>
              <div className={css.wrapImage}>
                <div className={`${css.image} center`}>
                  <img src={icon2} />
                </div>
              </div>
            </AnimateScroll>
            <div className={`${css.info} center y`}>
              <AnimateScroll in={"zoomIn"}>
                <div className={css.text}>
                  <h3>Title</h3>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text.
                  </p>
                </div>
              </AnimateScroll>
            </div>
          </div>
          <div className={`${css.line} ${css.left}`}>
            <AnimateScroll in={"slideInLeft"}>
              <div className={css.wrapImage}>
                <div className={`${css.image} center`}>
                  <img src={icon3} />
                </div>
              </div>
            </AnimateScroll>
            <div className={`${css.info} center y`}>
              <AnimateScroll in={"zoomIn"}>
                <div className={css.text}>
                  <h3>Title</h3>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text.
                  </p>
                </div>
              </AnimateScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
