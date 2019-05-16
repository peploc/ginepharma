import React, { Component } from 'react'
import "../style/Preloader.css"

export default class Preloader extends Component {
  render() {
    return (
        <div className="myPreload">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
    )
  }
}
