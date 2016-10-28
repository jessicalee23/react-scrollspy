import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import CSSModules from 'react-css-modules';
import ScrollSpy  from '../src/component/scrollspy';
import {List, Map} from 'immutable';

class App extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className="col-md-12">
          <div className="col-md-3" ref="scrollSection">
          
            <ScrollSpy 
                targetSection="scrollSection" 
                direction="vertical" 
                nameSection = {['XXXX GOld','VB','Carlin Draught','Tooheys New']}
              />
              
          </div>
          <div className="col-md-9">
            <sectionWrapper id="scrollSection">
              <section id="XXXX GOld">
                  <h3>XXXX Gold</h3>
              </section>
              <section id="VB">
                  <h3>VB</h3>
              </section>
              <section id="Carlin Draught">
                  <h3>Carlton Draught</h3>
              </section>
              <section id="Tooheys New">
                  <h3>Tooheys New</h3>
              </section>
            </sectionWrapper>
          </div>
        </div>
      </div>
    )
  }
}


export default CSSModules (App, styles)