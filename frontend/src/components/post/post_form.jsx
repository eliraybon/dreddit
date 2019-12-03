import React from 'react';
import axios from 'axios';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.post.title,
      text: this.props.post.text,
      user: this.props.currentUserId,
      subDreddit: this.props.subId || this.props.match.params.subId,
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
            this.props.processForm(this.state)
              .then(() => {
                this.props.history.push(`/subdreddits/${this.state.subDreddit}`)
              });
          })
      } else {
        axios.post('/api/files/upload', formData)
          .then(res => {
            this.setState({ imgUrl: res.data.imgUrl });
            this.props.processForm(this.state)
              .then(() => {
                this.props.history.push(`/subdreddits/${this.state.subDreddit}`)
              });
          })
      }
    } else {
      this.props.processForm(this.state)
        .then(() => {
          this.props.history.push(`/subdreddits/${this.state.subDreddit}`)
        });
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
      <div className='post-form-page'>
        <h3 className='post-form-type'>{this.props.formType} Post</h3>
        <form onSubmit={this.handleSubmit} className='post-form' encType="multipart/form-data">
          <div className='post-form-title'>
            <div className='post-form-input'>
              <input 
                type="text"
                value={this.state.title}
                onChange={this.update('title')}
                placeholder='Title'
              />
            </div>
          </div>

          <div className='post-form-text'>
            <textarea
              className='post-text-input'
              value={this.state.text}
              onChange={this.update('text')}
              placeholder='Text (optional)'
            />
          </div>

          <div className='post-form-bottom'>
            <input
              className='post-media-input'
              type="file"
              onChange={this.handleFile}
            />

            <button className='post-form-button'>{this.props.formType === 'Create' ? 'Post' : this.props.formType}</button>
          </div>
        </form>
      </div>
    )
  }
}