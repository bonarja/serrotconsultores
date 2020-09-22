import React from "react"
import css from "./footer.module.scss"
import Image from "../components/image"
import whatsaap from "../icons/whatsapp2.svg"
import wechat from "../icons/wechat.svg"
import instagram from "../icons/instagram.svg"
import email from "../icons/mail.svg"
import { Context } from "../context/context"
import { graphql, useStaticQuery } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query logo {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const redes = [
    { icon: whatsaap, url: "https://api.whatsapp.com/send?phone=000000" },
    { icon: wechat, url: "#" },
    // { icon: instagram, url: "https://www.instagram.com/fyb.solutions/" },
    { icon: email, url: "mailto:info@serrotconsultores.com" },
  ]

  const links = [
    { text: "Home", id: "home" },
    { text: "¿Quienes Somos?", id: "quienes_somos" },
    { text: "Nuestro servicio", id: "servicio" },
    { text: "Contáctanos", id: "contact" },
  ]

  return (
    <Context.Consumer>
      {({ menu }) => (
        <div className={css.footer}>
          <div className={`${css.logo} center y`}>
            <Image fluid={data.logo} imgStyle={{ height: "auto" }}></Image>
            <p>@ 2020</p>
          </div>
          <div className={`${css.index} relative center`}>
            <div className={`${css.wrapIndex} center y`}>
              {links.map((x, i) => (
                <label key={i} className={css.link} onClick={() => menu(x)}>
                  {x.text}
                </label>
              ))}
            </div>
          </div>
          <div className={`${css.contact}`}>
            <h3>Contacto y Redes</h3>
            <div className={`${css.redes} center`}>
              {redes.map((x, i) => (
                <div key={i} className={`${css.item}`}>
                  <a target="_BLANK" href={x.url}>
                    <img src={x.icon} />
                  </a>
                </div>
              ))}
            </div>
            <p className={css.line}>000000000</p>
            <p className={css.line}>000000000</p>
            <p className={css.line}>info@serrotconsultores.com</p>
          </div>
        </div>
      )}
    </Context.Consumer>
  )
}
export default Footer
