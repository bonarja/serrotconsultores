import React from "react"
import css from "./info.module.scss"
import { AnimateScroll } from "../framebled"
import Image from "../components/image"
import { graphql, useStaticQuery } from "gatsby"
const Info = () => {
  const data = useStaticQuery(graphql`
    query imagesInfo {
      c1: file(relativePath: { eq: "c1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      c2: file(relativePath: { eq: "c2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      c3: file(relativePath: { eq: "c3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div className={`${css.Info} center`} style={{ overflow: "hidden" }}>
      <div className={`${css.wrapInfo}`}>
        <AnimateScroll in="slideInLeft">
          <div className={`${css.titles}`}>
            <h2 className={`${css.title}`}>Few of Our Valuealble Client</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>In pellentesque sapien quis ante fermentum</p>
          </div>
        </AnimateScroll>
        <div className={`${css.content}`}>
          <div className={`cover`}>
            <div className={`${css.images} cover`}>
              <div className={`${css.item}`}>
                <AnimateScroll in="zoomIn">
                  <div
                    className={`${css.image} cover`}
                    style={{ maxHeight: 480 }}
                  >
                    <Image fluid={data.c2} cover={true}></Image>
                  </div>
                </AnimateScroll>
              </div>
              <div className={`${css.item}`}>
                <AnimateScroll in="zoomIn" delay={400}>
                  <div className={`${css.image} cover`}>
                    <Image fluid={data.c1} cover={true}></Image>
                  </div>
                </AnimateScroll>
              </div>
              <div className={`${css.item}`}>
                <AnimateScroll in="zoomIn" delay={800}>
                  <div className={`${css.image} cover`}>
                    <Image fluid={data.c3} cover={true}></Image>
                  </div>
                </AnimateScroll>
              </div>
            </div>
          </div>
          <div className="cover" style={{ overflow: "hidden" }}>
            <AnimateScroll in="slideInRight">
              <div className={`${css.info} center y`}>
                <h3>The Title</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>
                  Aenean volutpat lorem eget ipsum dapibus, eu malesuada eros
                  gravida. Sed non tristique urna. Maecenas maximus vitae dui
                  vitae vulputate. In non dolor viverra arcu dignissim
                  sollicitudin. Curabitur pellentesque lorem in sollicitudin
                  suscipit. Nulla egestas vulputate auctor.
                </p>
              </div>
            </AnimateScroll>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Info
