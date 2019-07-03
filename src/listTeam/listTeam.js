import React, { Component } from "react";
import { connect } from "react-redux";
import "./listTeam.css";
import {Redirect } from 'react-router'

class listTeam extends Component {
  constructor() {
    super();

    this.player = [];
    this.captain = "";
    this.Vcaptain = "";
 //   this.showAllTeams = this.showAllTeams.bind(this);
    this.state = {
      viewData: [],
      buttonText: "View",
      filterData: [],
      detailTeam:[]
      
    };
    this.searchKey = "";
    this.viewDetailTeam='';
  }

  componentDidMount() {
    this.player = this.props.selectedPlayer.map((member, index) => {
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
          </div>
        </div>
      );
    });

    this.setState({ viewData: this.player });
  }

  render() {
    return (
      <div className='showTeams'>
          <div className='teamListing'>My Teams</div>
        {this.player}

        {this.viewDetailTeam &&<Redirect to = {{pathname:'/detailteam',
                                                detailTeamData: this.viewDetailTeam}}/>}
      </div>
    );
  }

  
}

const mapStateToProps = state => {
  return {
     selectedPlayer: state.finalTeam,
     selectedCaptain: state.teamCaptain,
     selectedVCaptain: state.teamVCaptain,
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
)(listTeam);
