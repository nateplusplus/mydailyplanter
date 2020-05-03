import React from "react"
// import { Link } from "gatsby"

import PageWrapper from "../components/pageWrapper"
import SEO from "../components/seo"
import PlantListItem from "../components/plantListItem"

import "../sass/main.scss";

const PlantsPage = () => (
  <PageWrapper>
    <SEO title="My Plants" />
    <div id="app-view" className="plants-list w-full flex-1">
      <div className="py-2 pb-24 lg:py-12 xl:py-20">
        <div className="max-w-lg mx-auto bg-grey-lighter border border-grey-light shadow py-4 px-6">
          <form>
            <div className="py-2 my-2 flex items-stretch w-full">
              <input
                title='Plant Name'
                type="text"
                name="add-plant"
                value=""
                className="border p-2 my-0 flex-1 border-r-0"
                placeholder='Type a name for your plant (Example: "Aloe Vera", or "Cecilia")'
              />
              <button
                type="button"
                name="add-plant-submit"
                className="border p-2 w-8 bg-grey-lighter hover:bg-blue-light flex-no-shrink"
                >+</button>
            </div>
            <small className="text-grey-dark">
              Tap <svg
                className="w-3 h-3 stroke-current fill-current text-blue svg-unfill"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg> to note when you watered each plant.
            </small>
            <PlantListItem name="Spike" />
            <PlantListItem name="Office Pothos" />
            <PlantListItem name="Tomatoes" />
            <div className="py-2 my-2">
              <div className="list-item">
                <div className="list-item-body md:text-center text-grey-dark">
                  <small className="w-full">
                    Add more plants to keep track of all your green friends!
                  </small>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </PageWrapper>
)

export default PlantsPage
