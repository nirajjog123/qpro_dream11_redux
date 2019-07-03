import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./detailTeam.css";
import { router,Redirect,Route } from 'react-router'

class detailTeam extends Component {
  constructor(props) {
    super(props);

    this.targetTeam= [];
    this.state = {
        detailedTeam :[],
        backActivated:false
    }
    this.targetTeam = this.props.location.detailTeamData;
    this.backToView = this.backToView.bind(this);
  }
  
  backToView(e){
    if(e.target.innerText === 'Back'){
        this.setState({backActivated:true});
    }
  }

  componentDidMount(){ 
      let parsedTeam = '';
      this.setState({ detailedTeam: parsedTeam });
      if(this.targetTeam !==undefined){
     parsedTeam = this.targetTeam.map((member, index) => {
        return (
          <div className="card border-success mb-3 setWidth">
            <div className="card-header bg-transparent border-success">
              {member.teamName}
            </div>
            <div className="card-body text-success">
                <div><span className="card-title">Captain:</span>
                <span>{member.captain}</span></div>
                <div><span className="card-title">VCaptain:</span>
                <span>{member.VCaptain}</span></div>
              <h5 className="card-title">Players:</h5>
              {member.players.map(item => {
                return <p className="card-text">{item}</p>;
              })}
            </div>
          </div>
        );
      });
    }
  
      this.setState({ detailedTeam: parsedTeam });
  }
  
  render() {
      const backButton = this.state.backActivated;
    this.targetTeam = this.props.location.detailTeamData;
    return (
      <div>
          <div><button onClick={this.backToView} className='btn btn-dark setButton'> Back</button></div>
        {this.state.detailedTeam}

        {backButton &&<Redirect to = {{pathname:'/viewteam'}}/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // selectedPlayer: state.finalTeam,
    // selectedCaptain: state.teamCaptain,
    // selectedVCaptain: state.teamVCaptain
  };
};

const mapDispachToProps = dispach => {
  return {
  //  deleteTeam: teamId => dispach({ type: "DELETE_TEAM", teamID: teamId })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(detailTeam);
