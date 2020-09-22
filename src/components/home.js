import React from "react"
import css from "./home.module.scss"
import { AnimateScroll, Hidden } from "../framebled"
import Image from "../components/image"
import { graphql, useStaticQuery } from "gatsby"
const Home = () => {
  const data = useStaticQuery(graphql`
    query tower {
      tower: file(relativePath: { eq: "h3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div id="home" className={css.home}>
      <AnimateScroll in={"slideInLeft"} child={".image"} time={300}>
        <div className={`${css.left} center cover`}>
          <div className={`${css.image1} image`} {...Hidden}>
            <div className={`${css.img} cover `}>
              <div className={css.layer}></div>
              <Image fluid={data.tower} cover={true}></Image>
            </div>
          </div>
        </div>
      </AnimateScroll>

      <div className={css.info1}>
        <AnimateScroll in={"slideInRight"} time={300}>
          <div className="cover">
            <div className="contain">
              <h2>¿Quienes somos?</h2>
              <p>
                Somos tu aliado comercial para compras en China. Nos encargamos
                del proceso de compra de tu empresa de una forma rapida, segura
                y transparente. De esta forma puedes realmente enfocarte en el
                motor de tu compañia: <b>El cliente .</b>
              </p>
            </div>
          </div>
        </AnimateScroll>
      </div>
    </div>
  )
}

export default Home
