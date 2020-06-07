import React from "react";
import { navigate } from "gatsby";

import AddPlantForm from '../components/addPlantForm';
import PlantListItem from '../components/plantListItem';
import { getPlants, removePlant } from "../services/userplants"

var jwt = require('jsonwebtoken');

class PlantList extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      userData   : {},
      userPlants : {}
    }
  }

  getUserSessionAndPlants = () => {
    var userSession = localStorage.getItem( 'dp_auth' );
    if ( userSession ) {
      jwt.verify( userSession, process.env.JWT_KEY, ( err, decoded ) => {
        if ( err ) {
          console.warn( '2 Your session has expired. Please log in again.' );
        } else {
          this.setState({ userData : decoded }, this.getUserPlants );
        }
      } );
    } else {
      navigate(`/`);
    }
  }

  setUserPlants = ( plants ) => {
    this.setState( {
      userPlants: plants
    });
  }

  getUserPlantList = () => {
    let plantList = [];
    if ( this.state.userPlants && Object.keys( this.state.userPlants ).length > 0 ) {
      for ( var index in this.state.userPlants ) {
        const plant         = this.state.userPlants[index];
        plantList.push( <PlantListItem
                          key={index}
                          plantId={index}
                          userId={ this.state.userData.uid }
                          name={plant.name}
                          deletePlant={ this.deletePlant }
                          handleUpdate={ this.handlePlantUpdated }
                          toggleModal={ this.props.toggleModal }
                        />
                      );
      }
    }
    return plantList;
  }

  handleFailure = ( error ) => {
    console.error( error );
  }

  getUserPlants = () => {
    if ( this.state.userData && this.state.userData.uid ) {
      getPlants( this.state.userData.uid, this.setUserPlants, this.handleFailure );
    }
  }

  handlePlantUpdated = () => {
    this.getUserPlants();
    this.props.toggleModal();
  }

  handlePlantAdded = () => {
    this.getUserPlants();
  }

  componentDidMount = () => {
    if ( Object.keys( this.state.userData ).length === 0 ) {
      this.getUserSessionAndPlants();
    } else {
      this.getUserPlants();
    }
  }

  deletePlant = ( plantId ) => {
    if ( typeof this.state.userPlants[ plantId ] !== 'undefined' ) {
      removePlant( this.state.userData.uid, plantId, this.getUserPlants, this.handleFailure );
    }
  }

  render () {
    return (
      <div id="app-view" className="plants-list w-full flex-1">
        <div className="py-2 pb-24 lg:py-12 xl:py-20">
          <div className="max-w-lg mx-auto bg-grey-lighter border border-grey-light shadow py-4 px-6">
            <AddPlantForm userId={ this.state.userData.uid } success={ this.handlePlantAdded } />
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
    );
  }
}

export default PlantList
