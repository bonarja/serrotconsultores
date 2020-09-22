import React from "react"
import css from "./products.module.scss"
import Image from "../components/image"
import { AnimateScroll } from "../framebled"
import { graphql, useStaticQuery } from "gatsby"
const Products = () => {
  const data = useStaticQuery(graphql`
    query Productos {
      product1: file(relativePath: { eq: "product1.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      product2: file(relativePath: { eq: "product2.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      product3: file(relativePath: { eq: "product3.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const list = [
    {
      image: data.product1,
      color: "#51d9e0",
      title: "3 Layers Disposable Face Mask",
      info: "Guangzhou, China",
    },
    {
      image: data.product2,
      color: "#f99290",
      title: "KN95 Face Mask ",
      info: `Shenzhen, China&GB2626&FDA/ CE`,
    },
    {
      image: data.product3,
      color: "#66d0ff",
      title: "OEM Cookware Set ",
      info: "Germany design l Made in China&Guangzhou",
    },
  ]
  return (
    <div className={`${css.products} center`}>
      <AnimateScroll in="slideInLeft">
        <h2 className={css.mainTitle}>Productos mas recientes</h2>
      </AnimateScroll>
      <div className={`${css.wrapProducts} cover`}>
        {list.map((x, i) => (
          <AnimateScroll key={i} in="zoomIn">
            <div className={css.wrapItem}>
              <div className={`${css.item} center`}>
                <div className={`${css.image}`}>
                  <div className={`${css.imageWrap} cover`}>
                    <Image
                      fluid={x.image}
                      className="cover"
                      cover={true}
                    ></Image>
                  </div>
                  <div className={`${css.layer} cover`}></div>
                </div>
                <div>
                  {x.tag ? (
                    <div className={`${css.tag} relative`}>
                      <label style={{ backgroundColor: x.color }}>
                        {x.tag}
                      </label>
                      <label style={{ color: x.color }}>{x.tag}</label>
                    </div>
                  ) : (
                    <br />
                  )}
                  <p className={`${css.title}`}> {x.title} </p>
                  {x.info.split("&").map((x, i) => (
                    <p key={i} className={`${css.description}`}>
                      {x}
                    </p>
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
export default Products
