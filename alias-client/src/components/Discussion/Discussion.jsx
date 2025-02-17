/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "../Timer/Timer.jsx";
import { getPlayersFromRoom } from "../../fetchers/getPlayersFromRoom.js";
import { getTeam } from "../../fetchers/getTeam.js";
import { getUserById } from "../../fetchers/getUserById.js";
import { useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat.jsx";

// UserCard Component
const UserCard = ({ username }) => (
  <li className="list-group-item bg-dark text-white">{username}</li>
);

// TeamList Component
const TeamList = ({ teamName, players = [] }) => (
  <div>
    <h5 className="text-white">Team: {teamName}</h5>
    <ul className="list-group">
      {players?.map((player, index) => (
        <UserCard key={index} username={player.username} />
      ))}
    </ul>
  </div>
);

// Main Component
export default function Discussion({
  teamObj,
  description,
  setTeam,
  role,
  getIdFromToken,
  getTokens,
}) {
  const access_token = getTokens().access_token;

  const userId = getIdFromToken();

  const [teamPlayersInfo, setTeamPlayersInfo] = useState([]); // 3 players with their info
  const { roomId, _id: teamId, name: teamName } = teamObj;
  const [userName, setUserName] = useState(""); // State to hold the username
  const [isTimeUp, setIsTimeUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Fetch latest team details
        const latestTeam = await getTeam(roomId, teamId, access_token);
        setTeam(latestTeam);

        // Fetch players info for the team
        const players = await getPlayersFromRoom(roomId, teamId, access_token);
        setTeamPlayersInfo(players);

        // Fetch user info using userId
        const userData = await getUserById(userId, access_token);
        if (userData) {
          setUserName(userData.username);
        }
      } catch (error) {
        console.error("Error fetching team or players:", error);
      }
    };

    // Fetch data only when roomId and teamId are available
    if (roomId && teamId) {
      fetchTeamData();
    }
  }, [roomId, teamId, setTeam, userId]);

  // Trigger navigation when time is up
  const handleTimeOut = () => {
    setIsTimeUp(true);
  };

  // Redirect after time is up
  useEffect(() => {
    if (isTimeUp) {
      role === "leader" ? navigate("/leader") : navigate("/wait-leader");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeUp, navigate]);

  return (
    <div className="container py-5">
      <div className="row">
        {/* Left column: Timer and Team List */}
        <div className="col-md-3">
          {/* Timer */}
          <div className="mb-4 bg-dark p-3 rounded">
            <Timer startTime={30} onTimeOut={handleTimeOut} small={true} />
          </div>
          {/* Team List */}
          <div className="bg-dark p-3 rounded">
            <TeamList teamName={teamName} players={teamPlayersInfo} />
          </div>
        </div>

        {/* Right column: Description and Chat */}
        <div className="col-md-9 d-flex flex-column">
          {/* Description */}
          <div className="bg-dark text-white p-3 rounded mb-2">
            <h6 className="mb-1">Description</h6>
            <p className="mb-0">{description}</p>
          </div>
          <Chat
            userId={userId}
            roomId={roomId}
            teamId={teamId}
            name={teamName}
            userName={userName}
            role={role}
          />
          <p className="mt-3 text-center">
            {role === "describer"
              ? "CHAT FOR DESCRIBER"
              : "CHAT FOR PLAYERS EXCEPT DESCRIBER"}
          </p>
        </div>
      </div>
    </div>
  );
}
