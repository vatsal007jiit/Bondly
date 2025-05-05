import { Link } from "react-router-dom"; // If not using React Router, remove this and use <a> instead

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      {/* Logo and Project Name */}
      <div className="flex items-center mb-8">
        <img src="/Logo.png" alt="Bondly Logo" className="h-36 w-36 rounded-full mr-3" />
      </div>

      {/* 404 Message */}
      <h2 className="text-6xl font-bold mb-4">404</h2>
      <p className="text-2xl mb-6">Oops! Page not found.</p>

      {/* Home Button */}
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
