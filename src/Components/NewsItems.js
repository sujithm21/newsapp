import React, { Component } from 'react'

export default class NewsItems extends Component {

  render() {

    let {title, description, imageUrl, newsUrl, author, date} = this.props;

    return (
      <div className='container my-3'>
        <div className="card" >
          <img src={!imageUrl?"https://c.biztoc.com/p/8c48ee169307a120/s.webp ":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">by {!author?"unknown":author} published at {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
