import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-t border-emerald-600">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          {" "}
          {/* About Section */}
          <div>
            <h4 className="text-3xl font-bold text-emerald-400  items-center space-x-2 flex">
              About Us
            </h4>
            <p className="text-sm text-white font-normal hover:text-emerald-400">
              We are a company committed to providing the best services and
              products to our customers. Contact us to learn more about what we
              do and how we can help.
            </p>
          </div>
          {/* Links Section */}
          <div>
            <h4 className="text-emerald-400 font-semibold mb-4">Quick Links</h4>
            <ul className="text-white">
              <li>
                <a href="#" className="text-lg hover:text-emerald-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-emerald-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-emerald-600">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-emerald-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Social Media Section */}
          <div>
            <h4 className="text-emerald-400 font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-lg text-white">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-emerald-700"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-emerald-700"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-emerald-700"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-emerald-700"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          {/* Newsletter Subscription Section */}
          <div>
            <h4 className="text-emerald-400 font-semibold mb-4">
              Subscribe to our Newsletter
            </h4>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 text-black focus:outline-none rounded-md font-medium transition duration-300 ease-in-out flex justify-center items-center"
              />
              <button className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex justify-center items-center">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4">
          <div className="container mx-auto flex justify-between items-center">
            <p className="text-sm text-white">
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
            <div className="flex text-white space-x-4">
              <a href="#" className="text-sm hover:text-emerald-700">
                Privacy Policy
              </a>
              <a href="#" className="text-sm hover:text-emerald-700">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// const Footer = () => {
//   return (
//     <footer className="fixed w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex flex-wrap justify-between items-center">
//           ABOUTUS..
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out">
//               Contact
//             </div>
//             <div className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"></div>

//             <button
//               className="className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4
//             rounded-md flex items-center transition duration-300 ease-in-out"
//             ></button>
//             <div
//               className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4
// 			rounded-md flex items-center transition duration-300 ease-in-out"
//             ></div>
//             <div
//               className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4
// 				rounded-md flex items-center transition duration-300 ease-in-out"
//             ></div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
