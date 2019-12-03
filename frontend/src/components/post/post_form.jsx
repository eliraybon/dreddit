import React from 'react';
import axios from 'axios';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.post.title,
      text: this.props.post.text,
      user: this.props.currentUserId,
      subDreddit: this.props.subId,
      imgUrl: this.props.post.imgUrl || ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.content) {
      const formData = new FormData();
      formData.append('content', this.state.content, this.state.content.name);
      if (this.state.content.type === "video/mp4") {
        axios.post('/api/files/upload', formData)
          .then(res => {
            this.setState({ videoUrl: res.data.imgUrl });
            this.props.processForm(this.state);
          })
      } else {
        axios.post('/api/files/upload', formData)
          .then(res => {
            this.setState({ imgUrl: res.data.imgUrl });
            this.props.processForm(this.state);
          })
      }
    } else {
      this.props.processForm(this.state);
    }
  }

  handleFile(e) {
    const file = e.target.files[0]; 
    this.setState({ content: file });
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    return (
      <div>
        <h3>{this.props.formType} Post</h3>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label>Title
            <input 
              type="text"
              value={this.state.title}
              onChange={this.update('title')}
            />
          </label>

          <label>Text
            <textarea
              value={this.state.text}
              onChange={this.update('text')}
            />
          </label>

          <input
            type="file"
            onChange={this.handleFile}
          />

          <button>{this.props.formType}</button>
        </form>
      </div>
    )
  }
}