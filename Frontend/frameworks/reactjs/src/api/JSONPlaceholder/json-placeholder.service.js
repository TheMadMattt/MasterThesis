import http from './http-common';
import axios from "axios";

class JsonPlaceholderService {
    createPost(post) {
        return http.post("posts", post);
    }

    updatePost(post) {
        return http.put("posts/" + post.id, post);
    }

    getPost(id) {
        return http.get("posts/" + id);
    }

    deletePost(id) {
        return http.delete("posts/" + id);
    }

    getPosts() {
        return http.get("posts")
    }

    getComments() {
        return http.get("comments")
    }

    getPostsWithComments() {
        return axios.all([this.getPosts(), this.getComments()]).then(axios.spread((...response) => {
            const posts = response[0].data;
            const comments = response[1].data;

            posts.map(post => {
                post.comments = comments.filter(comment => comment.postId === post.id);
                return post;
            });
            return posts;
        }));
    }
}

export default new JsonPlaceholderService();
