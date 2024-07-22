import React from 'react';

const SummaryDisplay = ({ summary }) => {
  if (!summary) return null;

  return (
    <div>
      <h2>Summary</h2>
      <p>{summary}</p>
    </div>
  );
};

export default SummaryDisplay;
