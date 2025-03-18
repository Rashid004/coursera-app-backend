import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">
            <img
              src="https://w7.pngwing.com/pngs/382/328/png-transparent-online-degree-course-lecturer-learning-student-massive-open-online-course-text-logo-teacher-thumbnail.png"
              alt="coursera logo"
              className="w-40 h-20"
            />
          </span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to={"#"} className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link
            to={"/courses"}
            className="mr-5 hover:text-gray-900 text-lg font-medium"
          >
            Courses
          </Link>
          <Link
            to={"#"}
            className="mr-5 hover:text-gray-900 text-lg font-medium"
          >
            My Course
          </Link>
          <Link
            to={"#"}
            className="mr-5 hover:text-gray-900 text-lg font-medium"
          >
            Purchases
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-200 hover:bg-red-500"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
