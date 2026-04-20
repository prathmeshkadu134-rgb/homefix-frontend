import React from 'react';
import './skeleton.css';

const Skeleton = ({ type }) => {
  return (
    <div className={`skeleton-base skeleton-${type}`}>
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </div>
  );
};

export default Skeleton;