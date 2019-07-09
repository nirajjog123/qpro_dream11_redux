import React from "react";
const teamData = member => {
  return (
    <div className="card border-success mb-3 setWidth">
      <div className="card-header bg-transparent border-success">
        {member.teamMember.teamName}
      </div>
      <div className="card-body text-success">
        <div>
          <span className="card-title">Captain:</span>
          <span>{member.teamMember.captain}</span>
        </div>
        <div>
          <span className="card-title">VCaptain:</span>
          <span>{member.teamMember.VCaptain}</span>
        </div>

        {member.showMembers === "true" && (
          <div>
            <h5 className="card-title">Players:</h5>
            {member.teamMember.players.map(item => (
              <p className="card-text">{item}</p>
            ))}
          </div>
        )}
      </div>
      <div className="card-footer bg-transparent border-success">
        {member.viewEnable !== "false" && (
          <button className="btn btn-dark mgrRtBtn" onClick={member.viewClick}>
            View Team
          </button>
        )}

        {member.deleteEnable !== "false" && (
          <button className="btn btn-dark" onClick={member.deleteClick}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
export default teamData;
