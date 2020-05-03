import React from "react"
import { Link } from "gatsby"

import PageWrapper from "../components/pageWrapper"
import SEO from "../components/seo"

import "../sass/main.scss";

const IndexPage = () => (
  <PageWrapper>
    <SEO title="Home" />
    <div>
      <section>
        <div id="page-home" className="fullscreen">
          <div className="p-2 flex-initial w-full text-center mb-32">
            <h2 className="text-2xl md:text-4xl font-light">How are your plants feeling?</h2>
            <p className="my-2 font-light leading-loose text-sm md:text-base">We can help keep your green friends happy and healthy.</p>
            <div className="my-2">
              <Link to="/plants" className="inline-block border border-grey-dark px-5 py-4 text-2xl my-2 bg-blue text-grey-lightest font-bold shadow">My Plants</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-lime-green">
        <div className="fullscreen showcase">
          <div className="showcase-panel">
            <div className="figure-text">
              <p>
                Plants come in many shapes and sizes, and they all take their water differently. Make a list of all your plants, and keep track of their various watering instructions.
              </p>
              <p>
                <small className="action-link">
                  <Link to="/plants"><i className='icon'>&#x27F6;</i> Start Tracking</Link>
                </small>
              </p>
            </div>
            <div className="figure figure-1"></div>
          </div>
        </div>
      </section>
      <section className="bg-soft-blue">
        <div className="fullscreen showcase">
          <div className="showcase-panel">
            <div className="figure-text">
              <p>
                Feeling forgetful? Easily keep an ongoing record of when you last watered each of your plants, and share an account to keep track as a group.
              </p>
              <p>
                <small className="action-link">
                  <Link to="/plants"><i className='icon'>&#x27F6;</i> List My Plants</Link>
                </small>
              </p>
            </div>
            <div className="figure figure-2"></div>
          </div>
        </div>
      </section>
      <section className="bg-lime-green">
        <div className="fullscreen showcase">
          <div className="showcase-panel">
            <div className="figure-text">
              <p>
                Overwatering is just as bad as underwatering. With Daily Planter, you can quickly identify which plants are in need of watering, and rest assured the others are good to go.
              </p>
              <p>
                <small className="action-link">
                  <Link to="/plants"><i className='icon'>&#x27F6;</i> Get Started</Link>
                </small>
              </p>
            </div>
            <div className="figure figure-3"></div>
          </div>
        </div>
      </section>
    </div>
  </PageWrapper>
)

export default IndexPage
