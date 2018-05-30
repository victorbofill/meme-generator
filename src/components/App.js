import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      image: 'https://www.pixelstalk.net/wp-content/uploads/2016/10/Blank-Wallpaper-HD-620x388.jpg',
      header: '',
      footer: '',
      color: '#000000'
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

  handleColorChange({ target }) {
    this.setState({ color: target.value });
  }

  handleExport() {
    dom2image.toBlob(this.imageExport).then(blob => {
      fileSaver.saveAs(blob, 'image.png');
    });
  }

  render() {
    const { image, header, footer, color } = this.state;

    return (
      <main>
        <fieldset>
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

          <div>
            <label>
              Footer:
              <input
                onChange={event => this.handleFooterChange(event)}
              />
            </label>
          </div>

          <div>
            <input
              type="color"
              onChange={event => this.handleColorChange(event)}
            />
          </div>
        </fieldset>

        <section>
          <div>
            <button onClick={() => this.handleExport()}>
              Export Image
            </button>
          </div>

          <div className="image-container"
            ref={node => this.imageExport = node}
          >
            <div className="header-container">
              <h1 style={{ color }}>{header}</h1>
            </div>
            
            <img src={image}/>

            <div className="footer-container">
              <h1 style={{ color }}>{footer}</h1>
            </div>
          </div>
        </section>
      </main>
    );
  }
}