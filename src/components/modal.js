/**
 * Modal component
 *
 */

import React from "react"
import PropTypes from "prop-types"

const Modal = ({ children, title, isToggled, handleClose, name, isLoading }) => {

  var modalClass = "modal modal-background";
  var modalContainerClass = "modal-container";
  if ( isToggled ) {
    modalContainerClass += " drop-enter";
  } else if ( isLoading ) {
    modalClass += " modal-hidden";
    modalContainerClass += " hidden";
  } else {
    modalClass += " modal-hidden";
    modalContainerClass += " drop-leave";
  }

  return (
    <div className={ modalClass } onClick={ handleClose }>
      <div className={ modalContainerClass }>
        <div className="modal-heading flex justify-between items-center mb-6">
          <h2>{ title }</h2>
          <button type="button" className="text-4xl hover:text-grey-dark leading-none" onClick={ handleClose }>&times;</button>
        </div>
        <div className="modal-body">
          { children }
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  isToggled: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
