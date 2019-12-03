import React from 'react';

class SubRedditForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: this.props.sub.title,
      description: this.props.sub.description,
      user: this.props.currentUserId
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.formAction(this.state)
      .then(res => {
        this.props.history.push(`/subdreddits/${res.payload.sub._id}`)
      });
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value })
  }

  render(){
    return (
      <div className='post-form-page'>
        <h3 className='post-form-type'>{this.props.formType} Subdreddit</h3>
        <form onSubmit={this.handleSubmit} className='post-form' encType="multipart/form-data">
          <div className='post-form-title'>
            <div className='post-form-input'>
              <input
                className='post-input'
                type="text"
                value={this.state.title}
                onChange={this.update('title')}
                placeholder='Name'
              />
            </div>
          </div>

          <div className='post-form-text'>
            <textarea
              className='post-text-input'
              value={this.state.text}
              onChange={this.update('text')}
              placeholder='Description'
            />
          </div>

          <div className='sub-form-bottom'>

            <button className='post-form-button'>{this.props.formType}</button>
          </div>
        </form>
      </div>
      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <div>
      //       <label>
      //         Title
      //         <input 
      //           type="text"
      //           value={this.state.title}
      //           onChange={this.update('title')}
      //         />
      //       </label>
      //     </div>
      //     <div>
      //       <label>
      //         Description
      //         <input
      //           type="text"
      //           value={this.state.description}
      //           onChange={this.update('description')}
      //         />
      //       </label>
      //     </div>
      //     <div>
      //       <button>{this.props.formType}</button>
      //     </div>
      //   </form>
      // </div>
    )
  }
}

export default SubRedditForm;