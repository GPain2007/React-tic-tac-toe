import { useState } from "react";

export default function Players({ intialName, symbol, isActive, onChange }) {
  const [playerName, setPlayerName] = useState(intialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing(!isEditing);

    if (isEditing) {
      onChange(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editPlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = "Edit";

  if (isEditing) {
    editPlayerName = (
      <input
        required
        type="text"
        defaultValue={playerName}
        onChange={handleChange}
      />
    );
    // btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {editPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
