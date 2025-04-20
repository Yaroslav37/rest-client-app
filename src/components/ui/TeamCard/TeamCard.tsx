import './TeamCard.css';

export const TeamCard = ({
  name,
  position,
  contributions,
}: {
  name: string;
  position: string;
  contributions: string[];
}) => {
  return (
    <div className="card" data-testid="team-card">
      <div className="card__border"></div>
      <div className="card_title__container" data-testid="title-container">
        <span className="card_title">{name}</span>
        <p className="card_paragraph">{position}</p>
      </div>
      <hr className="line" />
      <ul className="card__list">
        {contributions.map((contribution, index) => (
          <li key={index} className="card__list_item">
            <span className="check">
              <svg
                className="check_svg"
                data-testid="checkmark-icon"
                fill="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="list_text">{contribution}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
