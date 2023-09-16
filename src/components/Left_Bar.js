import React from 'react';
import { Link } from 'react-router-dom';

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
                                <Link to={"/video_player/" + recomend.id_video}>
                                    <img src={recomend.poster_url || "https://st.kp.yandex.net/images/no-poster.gif"} />
                                    <p>{recomend.title || recomend.title_en}</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default Left_Bar;