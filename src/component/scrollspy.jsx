import styles from '../index.scss';
import React from 'react';
import CSSModules from 'react-css-modules';
import ReactDOM  from 'react-dom';
import Immutable from 'immutable';


export function scrollTo(element, to, duration) {
    
    if (duration <= 0) return;
    
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
    }, 10);
}


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
     const sectionPos = [];
     
     this.props.nameSection.forEach(function(e) {
        sectionPos.push(document.getElementById(e).offsetTop)
     });
     
     return this.setState({positions : sectionPos});
 }

 activeLink(event, i) {
     if (i == this.state.positions.length -1) {
        setTimeout(function() { this.setState({currentSection:this.state.positions.length -1}); }.bind(this), this.props.scrollDuration);
     }
     this.goToSection(event.target.href.split("#")[1]);
     return event.preventDefault();
 }
  goToSection(section) {
   const top = document.getElementById(section).offsetTop;
   return scrollTo(document.body, top , this.props.scrollDuration);
 }
 componentDidMount () {
   this.getSectionOffset(); 
   window.addEventListener('scroll', this.scrollingPage.bind(this))  
 }
 render() {
     const lists = this.props.nameSection;
     const sectionLists = lists.map((name, i) => {
         return <li key={name} className="nav-item"><a href={'#'+name} onClick={(event)=>this.activeLink(event, i)} className={i == this.state.currentSection ?'active nav-link' : ''}>{name}</a></li>;
     })
     return (
        
         <div className={this.props.direction + 'List'}>
             <ul ref="links" className={this.props.direction == 'vertical' ? 'nav nav-pills nav-stacked' : 'nav nav-pills'}>
                {sectionLists}
             </ul>
         </div>
        
     )
 }   
    
}

export default CSSModules (ScrollSpy, styles)
