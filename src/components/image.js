import React from "react"
import Img from "gatsby-image"

const Image = ({
  fluid,
  imgStyle = {},
  className = "",
  cover = false,
  ...props
}) => {
  fluid.childImageSharp && (fluid = fluid.childImageSharp)
  fluid.fluid && (fluid = fluid.fluid)
  return (
    <Img
      className={`${className}`}
      style={cover ? { width: "100%", height: "100%" } : { width: "100%" }}
      fluid={fluid}
      imgStyle={Object.assign(imgStyle, {
        objectFit:
          cover === false ? "contain" : cover === true ? "cover" : cover,
      })}
      {...props}
    />
  )
}
export default Image
