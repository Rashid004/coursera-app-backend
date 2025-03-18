import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface CourseData {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        const res = await axios.get(
          "http://localhost:3001/api/v1/course/preview",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", res);
        console.log("Courses Data:", res.data);

        if (res.data && Array.isArray(res.data.course)) {
          setCourses(res.data.course);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="text-gray-600 body-font max-w-7xl mx-auto w-full">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Explore Our Courses
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {courses.map((item) => (
            <div
              key={item._id}
              className="max-w-xs w-full bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <Link to="#">
                <img
                  alt="Course"
                  className="w-full h-48 object-cover"
                  src={item.imageUrl}
                />
              </Link>
              <div className="p-5">
                <h2 className="text-gray-900 text-lg font-semibold mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-indigo-600">
                    ${item.price}
                  </p>
                  <button className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-200 hover:bg-indigo-500">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
