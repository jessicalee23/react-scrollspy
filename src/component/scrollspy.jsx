import styles from '../index.scss';
import React from 'react';
import CSSModules from 'react-css-modules';
import ReactDOM  from 'react-dom';
import Immutable from 'immutable';

class ScrollSpy extends React.Component {
    
 constructor(props) {
    super(props);
    this.state  = {
       currentSection : 0,
       positions : []
    }
 }
 scrollingPage() {
     
    let currentNumber = 0;
    let vm = this;
    
    if (this.state.positions.length > 0) {
        this.state.positions.forEach(function(e , i) {
            if (window.scrollY >= e) {
               currentNumber = i; 
            } 
        })
        this.setState({currentSection:currentNumber})
   }
 }
 getSectionOffset() {
     let sectionPos = [];
     
     this.props.nameSection.forEach(function(e) {
        sectionPos.push(document.getElementById(e).offsetTop)
     });
     
     return this.setState({positions : sectionPos});
 }
 activeLink(i) {
     if (i == this.state.positions.length -1) {
        setTimeout(function() { this.setState({currentSection: this.state.positions.length -1}); }.bind(this), 10);
     }
 }
 componentDidMount () {
   this.getSectionOffset(); 
   window.addEventListener('scroll', this.scrollingPage.bind(this))  
 }
 render() {
     let lists = this.props.nameSection;
     let sectionLists = lists.map((name, i) => {
         return <li key={name}><a href={'#'+name} onClick={this.activeLink.bind(this , i)} className={i == this.state.currentSection ?'active' : ''}>{name}</a></li>;
     })
     return (
         
         <div className={this.props.direction + 'List'}>
             <ul ref="links">
                {sectionLists}
             </ul>
         </div>
     )
 }   
    
}

export default CSSModules (ScrollSpy, styles)
