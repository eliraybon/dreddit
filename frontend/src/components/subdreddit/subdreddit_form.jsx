import React from 'react';

class SubRedditForm extends React.Component {
  constructor(props){
    super(props)
    this.state = this.props.sub;
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Title
              <input 
                type="text"
                value={this.state.title}
                onChange={this.update('title')}
              />
            </label>
          </div>
          <div>
            <label>
              Description
              <input
                type="text"
                value={this.state.description}
                onChange={this.update('description')}
              />
            </label>
          </div>
          <div>
            <button>{this.props.formType}</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SubRedditForm;