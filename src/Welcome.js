import React, {Component} from 'react';
import {Link} from '@reach/router';

class Welcome extends Component{
  render(){

    // wheen receiving state from a parent component use {} to store the state in
    // a varible
    const {userName, logoutUser} = this.props;
    
    // console.log(user.user);
    return( 
      <div className = "text-center mt-4">
        <span className = "text-secondary font-weight-bold pl-1">
          Welcome {userName}
        </span>
        ,
        <Link to = "/login" className = "font-weight-bold text-primary pl-1" 
        onClick = {e => logoutUser(e)}>
            logout
        </Link>
      </div>
      
    );
  }
}

export default Welcome;