import React, { Component } from "react";
import { connect } from "react-redux";
import "./listTeam.css";
import {Redirect } from 'react-router'
import TeamPanel from '../component/teamPanel';
export class ListTeam extends Component {
  constructor() {
    super();

    this.player = [];
    this.captain = "";
    this.Vcaptain = "";
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
    this.player = this.props.selectedPlayer ? (this.props.selectedPlayer.map((member, index) => {
      return (
        <TeamPanel teamMember = {member} deleteEnable='false' viewEnable='false'/>
      );
    })) :[];

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
)(ListTeam);
