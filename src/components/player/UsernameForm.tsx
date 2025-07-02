import { useState } from 'react';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';

export default function UsernameForm() {
  const { conn } = useSpacetime();
  const [usernameInput, setUsernameInput] = useState('');

  if (!conn) {
    return null;
  }

  const handleUsernameSubmit = () => {
    if (usernameInput.trim() !== '') {
      conn.reducers.setName(usernameInput.trim());
      setUsernameInput('');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        className="input border-primary"
        onChange={(e) => setUsernameInput(e.target.value)}
        placeholder="Enter username"
        type="text"
        value={usernameInput}
      />
      <button
        className="btn btn-primary"
        onClick={handleUsernameSubmit}
        type="submit"
      >
        Set
      </button>
    </div>
  );
}
