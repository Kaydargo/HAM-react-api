import React   from 'react';
import              './Header.sass';
import {Link}  from '@reach/router';
import Sidebar from '../Sidebar/Sidebar';

export default class Header extends React.Component{

    constructor(){
        super();
        this.state = {
          menuStatus:"open",
          style:"menu"
        };
        this.menuAppear = this.menuAppear.bind(this);
      };
    
      menuAppear() {
        switch(this.state.menuStatus)
        {
          case "open":
            this.setState({
              menuStatus:"close",
              style:"menu active-menu"
            });
            break;
          case "close":
            this.setState({
              menuStatus:"open",
              style:"menu"
            });
            break;
        }        
      }

    render(){
        return(
            <header>
              <h1><button onClick={this.menuAppear} id='menu-btn'></button><Link to='/'><span>Art</span>Museum</Link></h1>
                
                <div className={this.state.style}>
                    <Sidebar/>
                </div>
                
            </header>
        )
    }
}