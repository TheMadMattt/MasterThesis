import React, {memo} from 'react';
import {Button} from "@material-ui/core";

const PostItem = memo(({ title, body, comments }) => (
    <tr>
        <td>
            <h2>{ title }</h2>
            <div>
                <Button>Edit post</Button>
                <Button>Delete post</Button>
            </div>
        </td>
        <td>{ body }</td>
        <td className="comments-container">
            {
                comments.map((comment, index) => {
                    return (
                        <div key={index}>
                            <p>{ comment.email }</p>
                            <h3>{ comment.body }</h3>
                        </div>
                    )
                })
            }
        </td>
    </tr>
));

const PostList = memo(({posts}) => {
    return (
        <div className="data-table">
            <table>
                <tbody>
                    {posts.map((data, index) =>
                        <PostItem {...data} key={index} />
                    )}
                </tbody>
            </table>
        </div>
    )
})

export default PostList;
