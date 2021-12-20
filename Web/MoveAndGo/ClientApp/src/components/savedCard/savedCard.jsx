import React, { useState, useEffect } from "react";
import getRequest from '../../services/getRequest';

const SavedCard = ({ nickname }) => {
  const [savedCard, setSavedCard] = useState([]);

  return (
    <div className="savedCard">
      <ul>
        {
          savedCard.length === 0 ?
            <li>You have no saved posts.</li> :
            null
        }
      </ul>
    </div>
  );
}

export default SavedCard;