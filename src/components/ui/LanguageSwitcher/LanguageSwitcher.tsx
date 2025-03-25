import React from 'react';
import './index.css';

export const LanguageSwitcher = () => {
  return (
    <div className="switch">
      <input
        id="language-toggle"
        className="check-toggle check-toggle-round-flat"
        type="checkbox"
      />
      <label htmlFor="language-toggle"></label>
      <span className="on">EN</span>
      <span className="off">DE</span>
    </div>
  );
};
