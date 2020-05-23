import React from "react"
// import { Link } from "gatsby"

import PageWrapper from "../components/pageWrapper"
import SEO from "../components/seo"
import AddPlantForm from '../components/addPlantForm'
import PlantListItem from "../components/plantListItem"
import { getPlants } from "../services/userplants"

import "../sass/main.scss";

class PlantsPage extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      userData   : {
        uid : 'oWmX4c54Frh1xLVSnSd9jt4O8Pc2'
      },
      userPlants : {}
    }
  }

  setUserPlants( plants ) {
    this.setState( {
      userPlants: plants
    });
  }

  setUserData() {
    // TODO: How do we get this from a layout compondent???
  }

  getUserPlantList() {
    let plantList = [];
    if ( this.state.userPlants && Object.keys( this.state.userPlants ).length > 0 ) {
      for ( var index in this.state.userPlants ) {
        let plant = this.state.userPlants[index];
        plantList.push(<PlantListItem key={index} plantId={index} name={plant.name} />);
      }
    }
    return plantList;
  }

  handleFailure( error ) {
    console.error( error );
  }

  getUserPlants() {
    if ( this.state.userData && this.state.userData.uid ) {
      getPlants( this.state.userData.uid, this.setUserPlants.bind(this), this.handleFailure );
    }
  }

  handlePlantAdded( results ) {
    // console.log( 'results plant added:', results );
    this.getUserPlants();
  }

  componentDidMount () {
    this.getUserPlants();
  }

  render () {
    return (
      <PageWrapper>
        <SEO title="My Plants" />
        <div id="app-view" className="plants-list w-full flex-1">
          <div className="py-2 pb-24 lg:py-12 xl:py-20">
            <div className="max-w-lg mx-auto bg-grey-lighter border border-grey-light shadow py-4 px-6">
              <AddPlantForm userId={ this.state.userData.uid } success={ this.handlePlantAdded.bind( this ) } />
              <div className="plantList">
                <small className="text-grey-dark">
                  Tap <svg
                    className="w-3 h-3 stroke-current fill-current text-blue svg-unfill inline"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg> to note when you watered each plant.
                </small>
                { this.getUserPlantList() }
                <div className="py-2 my-2">
                  <div className="list-item">
                    <div className="list-item-body md:text-center text-grey-dark">
                      <small className="w-full">
                        Add more plants to keep track of all your green friends!
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

export default PlantsPage
