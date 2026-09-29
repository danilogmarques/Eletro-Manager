export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-64 h-screen 
     bg-gray-800 text-white p-4">
      <ul className="flex flex-col space-y-4">
        <li>
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
};