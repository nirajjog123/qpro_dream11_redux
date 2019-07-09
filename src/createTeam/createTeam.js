import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import "../createTeam/createTeam.css";

export class createTeam extends Component {  //writing 'export' for test case .. mentioned in redux docs
  constructor() {
    super();
    this.jsonData = "";
    this.handleSearch = this.handleSearch.bind(this);
    this.capturePlayer = this.capturePlayer.bind(this);
    this.captureCaptain = this.captureCaptain.bind(this);
    this.captureVCaptain = this.captureVCaptain.bind(this);
    this.renderData = this.renderData.bind(this);
    this.handleTeamName = this.handleTeamName.bind(this);
    this.saveTeam =this.saveTeam.bind(this);
    this.searchKey = "";
    this.selectedPlayer = [];
    this.selectCaptain = "";
    this.selectVCaptain = "";
    this.showPlayerData = [];
    this.teamName = "";
    this.state = {
      showPlayerData: [],
      setCaptain :false,
      setVCaptain:false,
      renderReady :false
    };
  }


  handleSearch(e) {
    e.preventDefault();
    this.searchKey = e.target.value;
    this.renderData();
  }

  capturePlayer(e) {
    if(e.target.checked){
    this.selectedPlayer.push(e.target.name);
    }else{
      this.selectedPlayer.pop(e.target.name);
    }
  }

  captureCaptain(e) {
    this.selectCaptain = e.target.id;
    if(this.selectVCaptain === e.target.id){
      e.target.checked =false;
    }else{
      e.target.checked =true;
    }
    if(e.target.checked){
    this.setState({setCaptain:true});
    }else{
      this.setState({setCaptain:false});
    }
    
  }

  captureVCaptain(e) {
    this.selectVCaptain = e.target.id;

    if(this.selectCaptain === e.target.id){
      e.target.checked =false;
    }else{
      e.target.checked =true;
    }

    //setting checkbox
    if(e.target.checked){
    this.setState({setVCaptain:true});
    }else{
      this.setState({setVCaptain:false});
    }
  }

  handleTeamName(e) {
    this.teamName = e.target.value;
  }

  saveTeam(team, captain, viceCaptain, teamName){
    if(this.teamName.length >=3 && this.teamName.length <=15){
    this.props.submitTeam(team, captain, viceCaptain, teamName);
    this.setState({renderReady:true});
    }else{
      alert('Team Name should be minimum 3 and max 15 alphabetic characters');
    }
  }
  renderData() {
    //const searchCondition = this.searchKey;

    let playerData = this.props.jsonData;

    let filterData = "";
    //show filter data
    this.showPlayerData = [];

    filterData = playerData.filter((member, index) => {
      return this.searchKey === member.name;
    });

    this.showPlayerData = filterData.map((member, index) => {
      return (
        <div className="row  arrayItems">
          <div className="col">{member.id}</div>
          <div className="col">
            <img src={member.src}  alt='playerDP'/>
          </div>
          <div className="col">{member.name}</div>
          <div className="col">
            <label><input
              type="radio"
              name="captain"
              className="customRadio"
              id={member.name}
              onClick={this.captureCaptain}
            /><span>C</span></label>
          </div>
          <div className="col">
            <label><input
              type="radio"
              name="vcaptain"
              className="customRadio"
              id={member.name}
              onClick={this.captureVCaptain}
            /><span>VC</span></label>
          </div>
          <div className="col">
            <input
              disabled ={this.state.setCaptain}
              type="checkbox"
              className="checkmark"
              name={member.name}
              id={member.id}
              onClick={this.capturePlayer}
            />
            Add Player
          </div>
        </div>
      );
    });

    this.setState({ showPlayerData: this.showPlayerData });
  }

  render() {
    let playerData = this.props.jsonData;
    if (this.searchKey === "" || this.searchKey === undefined) {
      this.showPlayerData = playerData.map((member, index) => {
        return (
          <div className="row  arrayItems">
            <div className="col adjustContent fontHandle">{member.id}</div>
            <div className="col">
              <img src={member.src} className="img-circle" alt='player'/>
            </div>
            <div className="col adjustContent fontHandle">{member.name}</div>
            <div className="col adjustContent">
              <label><input
                type="radio"
                name="captain"
                className="customRadio adjustContent"
                id={member.name}
                value="C"
                onClick={this.captureCaptain}
              /><span>C</span></label>
            </div>
            <div className="col adjustContent">
             <label> <input
                type="radio"
                name="vcaptain"
                className="customRadio adjustContent"
                id={member.name}
                value="VC"
                onClick={this.captureVCaptain}
              /><span>VC</span></label>
            </div>
            <div className="col adjustContent">
              <input
                disabled ={(!this.state.setCaptain ||  !this.state.setVCaptain) }
                type="checkbox"
                className="checkmark adjustContent"
                name={member.name}
                id={member.id}
                onClick={this.capturePlayer}
              />
              Add Player
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        <div>
          <input
            required
            placeholder="Enter Team Name..."
            onChange={this.handleTeamName}
            className="setSearchBar"
            id='getTeamName'
            maxLength="10"
            minLength='3'
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search player.."
            onChange={this.handleSearch}
          />
        </div>

        {this.showPlayerData}
        <div>
          <button
            type="button"
            name="saveTeam"
            className="saveTeam"
            disabled ={(!this.state.setCaptain ||  !this.state.setVCaptain)}
            onClick={() =>
              this.saveTeam(
                this.selectedPlayer,
                this.selectCaptain,
                this.selectVCaptain,
                this.teamName
              )
            }
          >
            Save Team
          </button>
        </div>
        { this.state.renderReady &&<Redirect to = {{pathname:'/viewteam'}}/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    jsonData: state.playerData
  };
};

const mapDispachToProps = dispach => {
  return {
    submitTeam: (team, captain, viceCaptain, teamName) =>
      dispach({
        type: "CREATE_TEAM",
        team: team,
        captain: captain,
        vcaptain: viceCaptain,
        teamName: teamName
      })
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(createTeam);
