import styles from '../index.scss';
import React from 'react';
import CSSModules from 'react-css-modules';
import ReactDOM  from 'react-dom';
import Immutable from 'immutable';

class ScrollSpy extends React.Component {
    
 constructor(props) {
    super(props);
    this.state  = {
       currentSection : 0
    }
 }
 scrollingPage() {
    var vm = this;
    window.onscroll = function(ev) {
        //console.log(document.body.offsetHeight)
        if (window.scrollY > 508) {
            vm.setState({
                currentSection : 2
            })
        }
    };
 }
 getSectionOffset(pItem) {
    return this.props.nameSection.forEach((e) => {
         console.log(document.getElementById(e).offsetTop);
     })
 }
 activeLink(i) {
   return this.setState({
       currentSection : i
    });
 }
 componentDidMount () {
   this.scrollingPage();
   this.getSectionOffset();
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
