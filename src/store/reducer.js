import React from "react";
let Players = [
  {
    name: "Neeraj Jog",
    src: "./images/download.jpg",
    id: 1
  },
  {
    name: "Angad Rajput",
    src: "./images/download.jpg",
    id: 2
  },
  {
    name: "Swapnil",
    src: "./images/download.jpg",
    id: 3
  },
  {
    name: "Gaurav",
    src: "./images/download.jpg",
    id: 4
  },
  {
    name: "Swarup",
    src: "./images/download.jpg",
    id: 5
  },
  {
    name: "Vijay",
    src: "./images/download.jpg",
    id: 6
  },
  {
    name: "Prathamesh",
    src: "./images/download.jpg",
    id: 7
  },
  {
    name: "Rohit",
    src: "./images/download.jpg",
    id: 8
  },
  {
    name: "Aniket",
    src: "./images/download.jpg",
    id: 9
  },
  {
    name: "Sanket",
    src: "./images/download.jpg",
    id: 10
  },
  {
    name: "Nikhil",
    src: "./images/download.jpg",
    id: 11
  },
  {
    name: "Ajay",
    src: "./images/download.jpg",
    id: 12
  }
];

const initialState = {
  playerData: [...Players],
  finalTeam:[{ id :Math.random(),captain:"Prathamesh",VCaptain:"Neeraj Jog",players:["Prathamesh","Neeraj Jog","Vijay","Angad Rajput","Gaurav"],teamName:"Riders"},{ id :Math.random(),captain:"Ajay",VCaptain:"Aniket",players:["Ajay","Aniket","Vijay","Angad Rajput","Gaurav"],teamName:"Delta Force"}],
  teamCaptain:'',
  teamVCaptain:'',
  teamName:'',
  viewTeam:[]
};

const reducer = (state = initialState, action) => {
  let newState = { ...state };
  if(action.type ==='CREATE_TEAM'){
    return {
      ...state,
        finalTeam: state.finalTeam.concat({ id :Math.random(),captain:action.captain,VCaptain:action.vcaptain,players:action.team,teamName:action.teamName}),
        teamCaptain:action.captain,
        teamVCaptain:action.vcaptain
    };
  }

  if(action.type ==='DELETE_TEAM'){
    return {
      ...state,
        finalTeam: state.finalTeam.filter(el => el.id !== action.teamID)
    };

    
  }
  

  return newState;
};

export default reducer;
