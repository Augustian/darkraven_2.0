import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Redirect 
  } from "react-router-dom";

class Left_Bar extends React.Component {

    constructor() {
        super();
    }

    render(){
        return(
        <div className="left-bar">
            <div className="recommend">
                <h3>Рекомендуемые</h3>
                <div>
                    {this.props.data.map((recomend, key) => 
                        <div className="slot-recommend">
                            <img src={recomend.photo}/>
                            <p><Link to={"/video_player?id="+recomend.idvideo}>{recomend.title}</Link></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        );
    }
}
export default Left_Bar;