import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pictures: [],
      }
    }

    componentDidMount() {
      fetch('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=e682e046fa5968ade7ac0b42e5e2e95f&gallery_id=72157718793456406&extras=owner_name,description,tags&format=json&nojsoncallback=1&safe_search=1')
      .then(function(response){return response.json();})
      .then(function(data){
        let picArray = data.photos.photo.map((pic) => {
          var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
          var ownerPath = 'https://www.flickr.com/photos/' + pic.owner + '/';
          var titlePath = ownerPath + pic.id + '/';
          return (
            <div>
              <div class="image">
                <img src={srcPath} />
              </div>
              <div class="details">
                <div class="title">
                  <a href={titlePath}>{pic.title}</a>
                </div>
                <div class="owner">
                  by <a href={ownerPath}>{pic.ownername}</a>
                </div>
                <div class="desc">
                  Description: {pic.description._content}
                </div>
                <div class="tags">
                  Tags: {pic.tags}
                </div>
              </div>
            </div>
          )
        })
        this.setState({pictures: picArray});
      }.bind(this))
    }
    render() {
      return (
        <div id="wrapper">
		      <h1>Kate Arnold's Flickr Photo Stream</h1>
          <div id="flickr">
            {this.state.pictures}
          </div>
        </div>
      )
    }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
