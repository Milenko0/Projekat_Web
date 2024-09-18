import RatingService from '../services/RatingService';
import { useState } from 'react';
import '../style/RatingCardStyle.css'

const RatingCard = ({ rating }) => {
  const [blocked, setBlocked] = useState(rating.isTheDriverBlocked);

  // Funkcija za obradu blokiranja vozača
  const blockDriver = async () => {
    try {
      const response = await RatingService.blockDriver(rating.driver);
      if (response.message === '1') {
       // alert('Uspešno ste blokirali vozača!');
        setBlocked('Da');
      } else {
        alert('Došlo je do greške!');
      }
    } catch (error) {
      console.error('Došlo je do greške: ', error);
    }
  };

  // Funkcija za obradu odblokiranje vozača
  const unblockDriver = async () => {
    try {
      const response = await RatingService.unblockDriver(rating.driver);
      if (response.message === '1') {
        //alert('Uspešno ste odblokirali vozača!');
        setBlocked('Ne');
      } else {
        alert('Došlo je do greške!');
      }
    } catch (error) {
      console.error('Došlo je do greške: ', error);
    }
  };

  return (
    <div>
      <ul>
        <li>
          <div>Driver rating</div>
        </li>
        <li>
          <span>Driver:</span>
          <span>{rating.driver}</span>
        </li>
        <li>
          <span>Number of ratings:</span>
          <span>{rating.numberOfRatings}</span>
        </li>
        <li>
          <span>Average rating:</span>
          <span>{rating.averageRating.toFixed(4)}</span>
        </li>
        <li>
          <span>Blocked:</span>
          <span>{blocked}</span>
        </li>
        <li>
          {blocked !== 'Da' && (
            <button className="block-button" onClick={blockDriver}>
              Block
            </button>
          )}
          <button className="unblock-button" onClick={unblockDriver}>
            Unblock
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RatingCard;