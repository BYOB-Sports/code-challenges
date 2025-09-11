import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <nav>
        <div className="navbar bg-yellow-200">
          <Link href={"/"}>
            <button className="btn btn-xl btn-ghost bg-inherit text-xl">
              B Y O B
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
