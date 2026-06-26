import { Link } from "react-router-dom";

function EmptyState() {
  return (
    <div>
      <h2>Your watchlist is empty</h2>
      <p>Browse movies and add them to get started.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default EmptyState;