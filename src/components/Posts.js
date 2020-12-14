import React from 'react';

class Posts extends React.Component {

      render(){
        return(
            <div className="central">
                {this.props.Content.map((post, key) =>
                <div key={key} className="post-slot">
                    <h1>{post.title}</h1>
                    {post.photo1 &&
                        <img src={post.photo1} width="40%"/>
                    }
                    <p>{post.discription}</p>
                </div>
                )}
            {/* <Pagination className="pagination" defaultCurrent={1} total={this.props.Value} defaultPageSize={5} onChange={page => {this.props.Func(page-1); window.scrollTo( 0, 0);}}/> */}
          </div>
        );
    }
}

export default Posts;