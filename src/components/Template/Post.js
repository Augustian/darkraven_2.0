const Post = ({ data }) => {
    return (
        <div className="post-slot">
            <h1>{data.title}</h1>
            <div className="flex_block">
                <img src={data.poster_url} width="20%" />
                <div className="info_block">
                    <p><b>Год:</b> {data.year}</p>
                    <div dangerouslySetInnerHTML={{ __html: data.description }} />
                </div>
            </div>
        </div>
    );
}

export default Post;