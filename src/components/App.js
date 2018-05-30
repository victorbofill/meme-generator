import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      image: 'https://www.pixelstalk.net/wp-content/uploads/2016/10/Blank-Wallpaper-HD-620x388.jpg',
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

  render() {
    const { image } = this.state;

    return (
      <main>
        <section>
          <div>
            <label>
              Upload Image: 
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

          <div className="image-container"
            ref={node => this.imageExport = node}
          >
            <img src={image}/>
          </div>
        </section>
      </main>
    );
  }
}