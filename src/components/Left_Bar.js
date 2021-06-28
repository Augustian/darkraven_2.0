import React from 'react';

class Left_Bar extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="left-bar">
                <div className="recommend">
                    <h3>Рекомендуемые</h3>
                    <div>
                        {this.props.data.map((recomend, key) =>
                            <div className="slot-recommend" key={key}>
                                <a href={"/video_player/" + recomend.idvideo}>
                                    <img src={recomend.photo} />
                                    <p>{recomend.title}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default Left_Bar;