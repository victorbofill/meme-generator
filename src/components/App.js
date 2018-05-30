import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      image: 'https://www.pixelstalk.net/wp-content/uploads/2016/10/Blank-Wallpaper-HD-620x388.jpg',
      header: '',
      footer: ''
    };
  }

  handleImageSrc({ target }) {
    this.setState({ image: target.value });
  }

  handleUpload({ target }) {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  }

  handleHeaderChange({ target }) {
    this.setState({ header: target.value });
  }

  handleFooterChange({ target }) {
    this.setState({ footer: target.value });
  }

  render() {
    const { image, header, footer } = this.state;

    return (
      <main>
        <section>
          <div>
            <label>
              Image URL:
              <input onChange={event => this.handleImageSrc(event)}/>
            </label>
          </div>

          <div>
            <label>
              <input
                type="file"
                onChange={event => this.handleUpload(event)}
              />
            </label>
          </div>

          <div>
            <label>
              Header:
              <input
                onChange={event => this.handleHeaderChange(event)}
              />
            </label>
          </div>

          <div className="image-container"
            ref={node => this.imageExport = node}
          >
            <div className="header-container">
              <h1>{header}</h1>
            </div>
            
            <img src={image}/>

            <div className="footer-container">
              <h1>{footer}</h1>
            </div>
          </div>

          <div>
            <label>
              Footer:
              <input
                onChange={event => this.handleFooterChange(event)}
              />
            </label>
          </div>
        </section>
      </main>
    );
  }
}