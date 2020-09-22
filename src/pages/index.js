import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Home from "../components/home"
import Mission from "../components/mission"
import Details from "../components/details"
import Services from "../components/services"
import Contact from "../components/contact"
import Products from "../components/products"
import Info from "../components/info"
import Country from "../components/country"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Hero></Hero>
    <Home></Home>
    <Services></Services>
    {/* <Mission></Mission> */}
    <Details></Details>
    {/* <Products></Products> */}
    {/* <Country></Country> */}
    <Info></Info>
    <Contact></Contact>
  </Layout>
)

export default IndexPage
