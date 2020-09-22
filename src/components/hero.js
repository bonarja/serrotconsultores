import React from "react"
import css from "./hero.module.scss"
import herow from "../images/herow.jpg"
import openbox from "../images/logo-positivo.png"
import fabric from "../images/h2.jpg"
import FrameBled from "../framebled"
import { graphql, useStaticQuery } from "gatsby"
import Image from "../components/image"
import { Context } from "../context/context"
const Hero = () => {
  const data = useStaticQuery(graphql`
    query hero {
      image3: file(relativePath: { eq: "ui.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Context.Consumer>
      {({ menu }) => (
        <div id="hero" className={`${css.hero} cover`}>
          <div className={css.left}>
            <div
              className="cover relative center"
              style={{ overflow: "hidden" }}
            >
              <FrameBled
                from={{ transform: "scale(1.4)" }}
                to={{ transform: "scale(1)" }}
                fill={"forwards"}
                time={2000}
              >
                <div
                  className={`${css.bg} cover`}
                  style={{ backgroundImage: `url(${herow})` }}
                ></div>
              </FrameBled>
              <div className={`${css.content} center cover`}>
                <div className={`${css.center} animated slideInRight`}>
                  <h1>For Your Business Solutions</h1>
                  <p>
                    Somos tu agente de compras, <br /> somos tu aliado
                    comercial.
                  </p>
                  <div className={`${css.buttons}`}>
                    <a onClick={() => menu({ id: "contact" })}>contacto</a>
                    <a onClick={() => menu({ id: "servicio" })}>servicios</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${css.footer}`}></div>
          </div>
          <div className={`${css.right}`}>
            <div
              className={`${css.box} center animated slideInLeft`}
              style={{ animationDelay: "1200ms", animationDuration: "400ms" }}
            >
              <img
                src={openbox}
                className="animated zoomIn"
                style={{ animationDelay: "1500ms", animationDuration: "400ms" }}
              />
            </div>
            <FrameBled
              from={{ backgroundPositionX: "80%", left: "-200px" }}
              to={{ backgroundPositionX: "right", left: 0 }}
              time={1200}
            >
              <div
                className={css.w1}
                style={{ backgroundImage: `url(${fabric})` }}
              >
                <div className="cover"></div>
              </div>
            </FrameBled>
            <div className={`${css.w2} animated slideInRight`}>
              <div className="cover relative">
                <div className={`${css.layer} cover`}></div>
                {/* <div className={`cover`}> */}
                <Image fluid={data.image3} cover={true}></Image>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Context.Consumer>
  )
}
export default Hero
