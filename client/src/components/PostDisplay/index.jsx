import React from 'react';
import { Link } from 'react-router-dom';
import captionImage from '../../assets/home/caption.jpg'; // Import the image

const PostDisplay = ({ content }) => {
  return (
    <div className="post-display" style={{ backgroundImage: `url(${captionImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', padding: '20px' }}>
      <div className="post-content" style={{ textAlign: 'center', justifyContent: 'center', alignContent: 'center'}}>
        {content}
      </div>
      <div className="post-action-links" style={{ textAlign: 'center' }}>
        <Link to="/discussion">Join the discussion on this thought</Link>
      </div>
    </div>
  );
};

export default PostDisplay;
