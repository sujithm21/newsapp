import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    
    country : 'in',
    pageSize : 6,
    category : 'general'

  }

  static propTypes = {
    
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string

  }
   
  constructor(){
  
    super();
    // console.log("constructor called")
    this.state = 
    {articles : [],
    loading : false,
    page :1}
    
  }

  async componentDidMount(){
    // console.log("cdm");
    let url1 = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=48c28fba6a3745d29676ca4577f7eb60&pagesize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url1);
    let parsedData = await data.json();
    this.setState({articles : parsedData.articles, 
      totalResults:parsedData.totalResults,
    loading : false
    });
  }

  handlePrevClick = async () =>{

    let url1 = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=48c28fba6a3745d29676ca4577f7eb60&page=${this.state.page -1}&pagesize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url1);
    let parsedData = await data.json();
   

    this.setState ({
    page : this.state.page-1,
    articles : parsedData.articles,
    loading : false
  })
    
  }

  handleNextClick = async () =>{
    if(!( this.state.page + 1 > Math.ceil(this.state.totalResults /this.state.pageSize))){

    let url1 = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=48c28fba6a3745d29676ca4577f7eb60&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url1);
    let parsedData = await data.json();
   

    this.setState ({
    page : this.state.page + 1,
    articles : parsedData.articles,
    loading : false
  }
    
  )}
  }

  render() {
    return (
      <div className = "container my-3">
        
        <h1 className ="text-center">News-Daily Top Headlines from {this.props.category} </h1>
        {this.state.loading && <Spinner /> }

       <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
          return <div className="col-md-3" key = {element.url}>
          <NewsItems title ={element.title ?element.title.slice(0,45):" "} description ={element.description ?element.description.slice(0,88): " "} imageUrl = {element.urlToImage} newsUrl ={element.url} author={element.author} date = {element.publishedAt} />
        </div>
        })}

      

       </div>

        <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults /this.state.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>

       </div>
    )
  }
}

export default News
