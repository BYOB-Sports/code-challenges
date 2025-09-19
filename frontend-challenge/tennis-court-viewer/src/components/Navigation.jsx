import { Link } from 'react-router-dom';

const Navigation = ({ search, setSearch }) => {
  return (
    <nav className="bg-gray-200 p-4 sticky top-0">
      <div className="flex justify-center items-center">
        <Link to="/" className="text-xl font-bold">🎾 Tennis Courts</Link>
      </div>
      <input
        type="text"
        placeholder="Search courts"
        className="justify-center w-full border border-gray-500 p-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  )
}

export default Navigation;