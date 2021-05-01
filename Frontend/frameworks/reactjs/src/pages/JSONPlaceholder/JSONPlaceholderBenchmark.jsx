import React, {Component} from "react";
import Timer from "../../utils/Timer";
import {Button} from "@material-ui/core";
import "./JSONPlaceholder.css";
import {MatSelect} from "../../components/MatSelect";
import DisplayTimesJSONPlaceholder from "./components/DisplayTimesJSONPlaceholder";
import apiService from '../../api/JSONPlaceholder/json-placeholder.service';
import PostList from "./components/PostList";
import {PostBtn} from "./components/PostBtn";

const arrayOfIds = Array.from({length: 100}, (_, i) => i + 1);

export default class JSONPlaceholderBenchmark extends Component {
    addPostTimer = new Timer('addPostTimer');
    updatePostTimer = new Timer('updatePostTimer');
    getPostTimer = new Timer('getPostTimer');
    getPostsWithCommentsTimer = new Timer('getPostsWithCommentsTimer');
    deletePostTimer = new Timer('deletePostTimer');


    state = {
        posts: [],
        selectedPost: null,
        rowsNumber: 1,
        addPostTimer: null,
        updatePostTimer: null,
        getPostTimer: null,
        getPostsWithCommentsTimer: null,
        deletePostTimer: null,
    };

    addPost(postForm) {
        console.log(postForm);
        const post = {
            id: 101,
            title: postForm.title,
            body: postForm.body
        }
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

    getPost() {

    }

    getPostsWithComments() {

    }

    deletePost() {

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
                        <MatSelect title="Choose post id"
                                   initialValue={this.state.rowsNumber}
                                   handleChange={(e) => this.handleRowsNumberChange(e.target.value)}
                                   selectDropdownList={arrayOfIds}/>
                    </div>
                    <div className="flex-row operations">
                        <PostBtn cb={(post) => this.addPost(post)} isEditing={false}/>
                        <PostBtn cb={(post) => this.updatePost(post)} isEditing={true}/>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.getPost()}>Get post</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.deletePost()}>Delete post</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.getPostsWithComments()}>Get posts with comments</Button>
                        <Button variant="contained" color="primary"
                                onClick={() => this.clear()}>Clear</Button>
                    </div>
                </div>
                <div className="result-container">
                    <DisplayTimesJSONPlaceholder {...this.state}/>
                </div>
                <div>
                    {selectedPost &&
                    <p><b>Selected post:</b> {selectedPost.id} | {selectedPost.title} | {selectedPost.description}</p>}
                </div>
                <PostList posts={this.state.posts}/>
            </div>
        );
    }
}
