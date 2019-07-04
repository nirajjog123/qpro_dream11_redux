import React, { Component } from "react";
import { connect } from "react-redux";
import "./viewTeam.css";
import { Redirect } from 'react-router'
import TeamPanel from '../component/teamPanel';

class viewTeam extends Component {
  constructor() {
    super();

    this.player = [];
    this.captain = "";
    this.Vcaptain = "";
    this.showAllTeams = this.showAllTeams.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.filterTeam = this.filterTeam.bind(this);
    this.viewTeamData = this.viewTeamData.bind(this);
    this.state = {
      viewData: [],
      buttonText: "View",
      filterData: [],
      detailTeam:[]
      
    };
    this.searchKey = "";
    this.viewDetailTeam='';
  }

  handleDelete(e, id) {
    this.props.deleteTeam(id);
    this.showAllTeams();
    this.setState({ buttonText: "Refresh" });
  }

  viewTeamData(e,id){
    this.viewDetailTeam = this.props.selectedPlayer.filter((member, index) => {
        return id === member.id;
      });
      this.setState({detailTeam:this.viewDetailTeam});
  }

  showAllTeams() {
    this.player = this.props.selectedPlayer.map((member, index) => {
      return (
        <TeamPanel teamMember = {member} deleteClick={e =>this.handleDelete(e, member.id)} 
                   viewClick={e=>this.viewTeamData(e, member.id)}/>
      );
    });

    this.setState({ viewData: this.player });
  }

  filterTeam(e) {
    console.log(e);
    e.preventDefault();
    this.searchKey = e.target.value;
    let filterData = "";

    filterData = this.props.selectedPlayer.filter((member, index) => {
      return this.searchKey === member.teamName;
    });

    this.player = filterData.map((member, index) => {
      return (
        <div className="card border-success mb-3 setWidth">
          <div className="card-header bg-transparent border-success">
            {member.teamName}
          </div>
          <div className="card-body text-success">
            <h5 className="card-title">Players:</h5>
            {member.players.map(item => {
              return <p className="card-text">{item}</p>;
            })}
          </div>
          <div className="card-footer bg-transparent border-success">
            <button
              className="btn btn-dark"
              onClick={e => this.handleDelete(e, member.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
    this.setState({ filterData: this.player });
  }
  render() {
    return (
      <div>
        <div>
          <button
            onClick={this.showAllTeams}
            className="btn btn-dark setButton"
          >
            {this.state.buttonText}
          </button>
        </div>
        <div>
          <input
            className='searchTeam'
            placeholder="Search Team..."
            onChange={e => {
              this.filterTeam(e);
            }}
          />
        </div>
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
    deleteTeam: teamId => dispach({ type: "DELETE_TEAM", teamID: teamId })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(viewTeam);
