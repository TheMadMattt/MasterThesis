import React, {Component} from "react";
import Timer from "../../utils/Timer";
import {Button} from "@material-ui/core";
import "./JSONPlaceholder.css";
import {MatSelect} from "../../components/MatSelect";
import DisplayTimesJSONPlaceholder from "./components/DisplayTimesJSONPlaceholder";
import apiService from '../../api/json-placeholder.service';
import PostList from "./components/PostList";
import {PostBtn} from "./components/PostBtn";

const arrayOfIds = Array.from({length: 100}, (_, i) => i + 1);

export default class JSONPlaceholderBenchmark extends Component {
    addPostTimer = new Timer('addPostTimer');
    updatePostTimer = new Timer('updatePostTimer');
    getPostTimer = new Timer('getPostTimer');
    getPostsWithCommentsTimer = new Timer('getPostsWithCommentsTimer');
    deletePostTimer = new Timer('deletePostTimer');
    renderTimer = new Timer('renderTimer');

    state = {
        posts: [],
        selectedPost: null,
        postId: 1,
        addPostTimer: null,
        updatePostTimer: null,
        getPostTimer: null,
        getPostsWithCommentsTimer: null,
        deletePostTimer: null,
        renderTimer: null
    };

    addPost(post) {
        this.addPostTimer.startTimer();
        apiService.createPost(post).then(() => {
            this.addPostTimer.stopTimer();
            this.setState({addPostTimer: this.addPostTimer});
        });
    }

    updatePost(post) {
        this.updatePostTimer.startTimer();
        apiService.updatePost(post).then(() => {
            this.updatePostTimer.stopTimer();
            this.setState({updatePostTimer: this.updatePostTimer});
        });
    }

    getSelectedPost() {
        this.getPostTimer.startTimer();
        apiService.getPost(this.state.postId).then(post => {
            this.getPostTimer.stopTimer();
            this.setState({selectedPost: post.data, getPostTimer: this.getPostTimer});
        });
    }

    getPostsWithComments() {
        this.setState({ posts: []}, () => {
            this.getPostsWithCommentsTimer.startTimer();
            apiService.getPostsWithComments().then(data => {
                this.getPostsWithCommentsTimer.stopTimer();
                this.renderTimer.startTimer();
                this.setState({posts: data, getPostsWithCommentsTimer: this.getPostsWithCommentsTimer}, () => {
                    this.renderTimer.stopTimer();
                    this.setState({renderTimer: this.renderTimer});
                });
            })
        })
    }

    deletePost() {
        this.deletePostTimer.startTimer();
        apiService.deletePost(this.state.postId).then(() => {
            this.deletePostTimer.stopTimer();
            this.setState({deletePostTimer: this.deletePostTimer});
        });
    }

    handleRowsNumberChange(rowsNumber) {
        this.setState({rowsNumber});
    }

    clear() {
        window.location.reload();
    }

    render() {
        const selectedPost = this.state.selectedPost;
        return (
            <div className="json-placeholder-container">
                <div className="actions">
                    <div>
                        <MatSelect name="postId" title="Choose post id"
                                   initialValue={this.state.postId}
                                   handleChange={(e) => this.handleRowsNumberChange(e.target.value)}
                                   selectDropdownList={arrayOfIds}/>
                    </div>
                    <div className="flex-row operations">
                        <PostBtn cb={(post) => this.addPost(post)}/>
                        <PostBtn cb={(post) => this.updatePost(post)} isEditing postId={this.state.postId}/>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.getSelectedPost()}>Get post</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.deletePost()}>Delete post</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.getPostsWithComments()}>Get 100 posts with 500 comments</Button>
                        <Button variant="contained" color="primary"
                                onClick={() => this.clear()}>Clear</Button>
                    </div>
                </div>
                <div className="result-container">
                    <DisplayTimesJSONPlaceholder {...this.state}/>
                </div>
                <div>
                    {selectedPost &&
                    <p><b>Selected post:</b> {selectedPost.id} | {selectedPost.title} | {selectedPost.body}</p>}
                </div>
                <PostList posts={this.state.posts}/>
            </div>
        );
    }
}
