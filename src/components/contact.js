import React from "react"
import css from "./contact.module.scss"
import icon from "../icons/whatsapp.svg"
import { AnimateScroll } from "../framebled"
import { graphql, useStaticQuery } from "gatsby"
import Image from "../components/image"
const Contact = () => {
  const data = useStaticQuery(graphql`
    query phone {
      phone: file(relativePath: { eq: "phone.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div id="contact" className={css.contact}>
      <div className={`${css.wrapContact} center`}>
        <div className={`${css.wrapContent} cover`}>
          <div className={`${css.content} center relative`}>
            <div className={`${css.layer} cover`}></div>
            <div className={`${css.info}`}>
              <AnimateScroll in={"zoomIn"}>
                <div>
                  <h2>Contact us today</h2>
                  <h4>
                    Email: <span>info@serrotconsultores.com</span>
                  </h4>
                  <h4>
                    Ph: <span>000 000 000</span>
                  </h4>
                  {/* <h4>
                    Cellphone: <span></span>
                  </h4> */}
                </div>
              </AnimateScroll>
              <AnimateScroll in="slideInUp">
                <button className="center">
                  <label>contacto</label>
                  <img src={icon} />
                </button>
              </AnimateScroll>
            </div>
          </div>
          <div className={`${css.wrapBg} cover relative`}>
            <div className={`${css.layer} cover`}></div>
            <AnimateScroll in={"slideInRight"}>
              <div className={`${css.bg} cover`}>
                <Image
                  fluid={data.phone}
                  cover={true}
                  alt={"phone contact background"}
                ></Image>
              </div>
            </AnimateScroll>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contact
