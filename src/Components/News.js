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
    this.props.setProgress(10);
    let url1 = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey} &pagesize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url1);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({articles : parsedData.articles, 
      totalResults:parsedData.totalResults,
    loading : false
    });
    this.props.setProgress(100);
  }

  handlePrevClick = async () =>{
    this.props.setProgress(10);
    let url1 = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page -1}&pagesize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url1);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState ({
    page : this.state.page-1,
    articles : parsedData.articles,
    loading : false
  })
    this.props.setProgress(100);
    
  }

  handleNextClick = async () =>{
    if(!( this.state.page + 1 > Math.ceil(this.state.totalResults /this.state.pageSize))){
    this.props.setProgress(10);
    let url1 = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url1);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState ({
    page : this.state.page + 1,
    articles : parsedData.articles,
    loading : false
  }
    
  )}
  this.props.setProgress(100);
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
