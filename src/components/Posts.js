import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

class Posts extends React.Component {

    constructor() {
        super();
        this.state = {
            pageSize: 5,
            page: 1,
            Posts: null,
            PostValue: 0,
        };
        this.GetData = this.GetData.bind(this);
    }

    componentDidMount() {
        this.GetData(0);
    }

    GetData(list) {
        var form = new FormData();
        form.append('list', list);
        fetch('http://site.alwaysdata.net/posts.php', {
            method: 'POST',
            body: form,
        }).then(res => res.json())
            .then(respons => {
                this.setState({ Posts: respons.posts, PostValue: respons.postsvalue });
            })
    }

    render() {
        const data = this.state.Posts;
        if (!data) { return <div>Загрузка данных....</div> }

        return (
            <div className="central">
                {data.map((post, key) =>
                    <div key={key} className="post-slot">
                        <h1>{post.title}</h1>
                        {post.photo1 &&
                            <img src={post.photo1} width="40%" />
                        }
                        <div dangerouslySetInnerHTML={{__html: post.discription}}/>
                    </div>
                )}
                <Pagination
                    className="pagination"
                    count={Math.ceil(this.props.Value / 5)}
                    page={this.state.page}
                    siblingCount={3}
                    boundaryCount={2}
                    onChange={(event, page) => {
                        this.props.Func(this.props.type, page - 1, this.state.pageSize);
                        window.scrollTo(0, 0);
                        this.setState({ page: page });
                    }} />
            </div>
        );
    }
}

export default Posts;