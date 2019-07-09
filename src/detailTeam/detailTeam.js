import React, { Component } from "react";
import { connect } from "react-redux";
import "./detailTeam.css";
import { Redirect } from "react-router";
import TeamPanel from "../component/teamPanel";

class detailTeam extends Component {
  constructor(props) {
    super(props);

    this.targetTeam = [];
    this.state = {
      detailedTeam: [],
      backActivated: false
    };
    this.targetTeam = this.props.location.detailTeamData;
    this.backToView = this.backToView.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  backToView(e) {
    if (e.target.innerText === "Back") {
      this.setState({ backActivated: true });
    }
  }

  handleDelete(e, id) {
    this.props.deleteTeam(id);
   // this.showAllTeams();
   // this.setState({ buttonText: "Refresh" });
   this.setState({ backActivated: true });
  }

  componentDidMount() {
    let parsedTeam = "";
    this.setState({ detailedTeam: parsedTeam });
    if (this.targetTeam !== undefined) {
      parsedTeam = this.targetTeam.map((member, index) => {
        return (
          <TeamPanel
            teamMember={member}
            deleteEnable="true"
            viewEnable="false"
            showMembers="true"
            deleteClick={e => this.handleDelete(e, member.id)}
          />
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
        <div>
          <button onClick={this.backToView} className="btn btn-dark setButton">
            {" "}
            Back
          </button>
        </div>
        {this.state.detailedTeam}

        {backButton && <Redirect to={{ pathname: "/viewteam" }} />}
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
    deleteTeam: teamId => dispach({ type: "DELETE_TEAM", teamID: teamId })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(detailTeam);
