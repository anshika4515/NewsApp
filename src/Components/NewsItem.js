import React from 'react'

const NewsItem = (props) => {
 
    let {title ,description ,imageURL,newsURL,author,date,source} = props
    return (
      <div className='my-3'>
        <div className="card" >
  <img className="card-img-top" src={imageURL?imageURL:"https://nypost.com/wp-content/uploads/sites/2/2024/02/pregnant-comp.jpg?quality=75&strip=all&w=1024"} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">{title}..   <span class="badge badge-info">{source}</span></h5>
    <p className="card-text">{description}..</p>
    <p class="card-text"><small class="text-muted">By {author?author:"Unknown"} on {date}</small></p>
    <a href={newsURL}className="btn btn-primary bt">Read More</a>
  </div>
</div>
      </div>
    )
  }


export default NewsItem
