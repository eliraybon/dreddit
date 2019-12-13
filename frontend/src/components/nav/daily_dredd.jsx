import React from 'react';
import { withRouter } from 'react-router-dom';

class DailyDredd extends React.Component {
  render() {

    return (
      <div className='sub-info daily-dredd'>
        <div className='sub-info-head orange dd-header'>
          DAILY DREDD
        </div>

        <div className='sub-info-content'>
          <div className='sub-info-description daily-dredd-description'>
            <p>Gripes, grumbles, and other grievances</p>
          </div>
        </div>

        <ul className="dd-subs">
          <li className="dd-sub" onClick={() => this.props.history.push('/subdreddits/5de6ee477f466be4ea0dfa30')}>
            <img
              className="dd-sub-img"
              src="https://static-wp.lonewolfmag.com/distorted-bust.jpg"
              alt="subdreddit-logo"
            />
            <h3 className="dd-sub-text">
              Existential
            </h3>
          </li>

          <li className="dd-sub" onClick={() => this.props.history.push('/subdreddits/5de6ee647f466be4ea0dfa31')}>
            <img
              className="dd-sub-img"
              src="https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/qn70ym2k2kxrqfjo28ew.jpg"
              alt="subdreddit-logo"
            />
            <h3 className="dd-sub-text">
              Workplace Woes
            </h3>
          </li>

          <li className="dd-sub" onClick={() => this.props.history.push('/subdreddits/5de6ee827f466be4ea0dfa32')}>
            <img
              className="dd-sub-img"
              src="https://aleteiaen.files.wordpress.com/2017/11/web3-brother-sister-arguing-fight-yiorgos-gr-i-shutterstock1.jpg?quality=100&strip=all&w=620&h=310&crop=1"
              alt="subdreddit-logo"
            />
            <h3 className="dd-sub-text">
              Schoolyard Squabbles
            </h3>
          </li>

          <li className="dd-sub" onClick={() => this.props.history.push('/subdreddits/5de6ee8e7f466be4ea0dfa33')}>
            <img
              className="dd-sub-img"
              src="https://miro.medium.com/max/960/1*FpkWaPDZPTKW5n-yJMpuaA.jpeg"
              alt="subdreddit-logo"
            />
            <h3 className="dd-sub-text">
              Coorporate Complaints
            </h3>
          </li>

          <li className="dd-sub" onClick={() => this.props.history.push('/subdreddits/5de6ee9f7f466be4ea0dfa34')}>
            <img
              className="dd-sub-img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Edvard_Munch_-_The_Scream_-_Google_Art_Project.jpg/220px-Edvard_Munch_-_The_Scream_-_Google_Art_Project.jpg"
              alt="subdreddit-logo"
            />
            <h3 className="dd-sub-text">
              Anger and Angst
            </h3>
          </li>

          <li className="dd-sub" onClick={() => this.props.history.push('/subdreddits/5de6eea97f466be4ea0dfa35')}>
            <img
              className="dd-sub-img"
              src="https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555309086/shape/mentalfloss/road-rage-primary.png"
              alt="subdreddit-logo"
            />
            <h3 className="dd-sub-text">
              Transit Tantrums
            </h3>
          </li>

        </ul>

        <div className='sub-info-buttons dd-buttons'>
          {/* {this.renderFollowButton()} */}
          <button
            className='sub-create-post orange explore-button'
            onClick={() => this.props.history.push('/subdreddits/5de6ee477f466be4ea0dfa30')}>
            EXPLORE
        </button>
        </div>
      </div>
    )
  }
}

export default withRouter(DailyDredd);