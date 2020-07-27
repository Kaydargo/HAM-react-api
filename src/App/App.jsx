import React      from 'react';
import {Router, Link, Location }    from '@reach/router';

import posed, { PoseGroup } from 'react-pose';

import Header      from '../Header/Header';
import Home        from '../Home/Home';
import Floors      from '../Floors/Floors';
import Floor       from '../Floor/Floor';
// import Exhibition  from '../Exhibition/Exhibition';
import Timeline    from '../Timeline/Timeline';
import Footer      from '../Footer/Footer';

import Login       from '../Login/Login';
import Register    from '../Register/Register';
import AddArt      from '../AddArtwork/AddArtwork';
import Profile     from '../Profile/Profile';
import EditProfile from '../EditProfile/EditProfile';
import Artwork     from '../Artwork/Artwork';
import Century     from '../CenturyInfo/CenturyInfo';
import Gallery     from '../CenturyGallery/CenturyGallery';
import CenturyArt  from  '../CenturyArtwork/CenturyArtwork';

import                 '../site.scss';
import                 './App.sass';


const RouteContainer = posed.div({
    enter: { opacity: 1, delay: 200, beforeChildren: 200 },
    exit: { opacity: 0 }
  });

const PosedRouter = ({ children }) => (
    <Location>
      {({ location }) => (
        <PoseGroup>
          <RouteContainer key={location.key}>
            <Router location={location}>{children}</Router>
          </RouteContainer>
        </PoseGroup>
      )}
    </Location>
);

export default class App extends React.Component{
    render(){
        return (
                
                <div >
                    <Header />
                        <PosedRouter>
                        
                            <Home        path='/' />
                            <Floors      path='/floors' />
                            <Floor       path='floor/:id' />
                            <Gallery     path='/gallery/:id'/>
                            {/* <Exhibition  path='/exhibition' /> */}
                            <Timeline    path='/timeline' />
                            <Login       path='/login' />
                            <Register    path='/register' />
                            <AddArt      path='/addArt' />
                            <Profile     path='/profile' />
                            <EditProfile path='/editProfile' />
                            <Artwork     path='/artwork/:id' />
                            <Century     path='/timeline/:id' />
                            <CenturyArt  path='/timeline/gallery/:id'/>
                        </PosedRouter>
                    <Footer />
                </div>
        );
    }
}