import { Link } from 'react-router-dom';

const Navigation = ({ search, setSearch }) => {
  return (
    <nav className="bg-green-600 p-4 sticky top-0">
      {/* Prompt: Help me make the nav bar look "tennis court green" */}
      <div className="flex justify-center items-center">
        <Link to="/" className="text-xl font-bold text-white">🎾 Tennis Courts</Link>
      </div>
      <input
        type="text"
        placeholder="Search courts"
        className="justify-center w-full border border-green-700 p-2 rounded mt-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  )
}

export default Navigation;