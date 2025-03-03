


// import React, { useState } from 'react';
// import { ChevronDown } from 'lucide-react';
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isPagesOpen, setIsPagesOpen] = useState(false);

//   return (
//     <nav className="bg-black py-4 px-6">
//       <div className="container mx-auto px-8">
//         <div className="flex items-center justify-between">
//           {/* Brand Name */}
//           <div className="flex items-center">
//             <Link to="/" className="text-2xl font-bold text-[#CF992D]">
//               PangeaPay
//             </Link>
//           </div>

//           {/* Navigation Container with Border */}
//           <div className="hidden md:flex items-center justify-between bg-[#29303A]/50 border border-[#CF992D]/20 rounded-full px-8 py-2">
//             <div className="flex items-center space-x-8">
//               <Link to="/" className="text-white hover:text-[#CF992D]/90">
//                 Home
//               </Link>
//               <Link to="/about" className="text-white hover:text-[#CF992D]">
//                 About Us
//               </Link>
//               <Link to="/services" className="text-white hover:text-[#CF992D]">
//                 Services
//               </Link>
//               <div className="relative group">
//                 <div className="flex items-center text-white hover:text-[#CF992D] cursor-default">
//                   Pages
//                   <ChevronDown size={20} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
//                 </div>
//                 {/* Dropdown menu - Now visible on group hover */}
//                 <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
//                   <div className="py-1">
//                     <Link to="/kyc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       KYC
//                     </Link>
                    
                    
//                   </div>
//                 </div>
//               </div>
//               <Link to="/contact" className="text-white hover:text-[#CF992D]">
//                 Contact Us
//               </Link>
//             </div>
//           </div>

//           {/* Login Button */}
//           <Link to="/login" className="hidden md:block">
//             <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors">
//               Login
//             </button>
//           </Link>

//           {/* Mobile menu button */}
//           <button
//             className="md:hidden text-white"
//             onClick={() => {
//               setIsOpen(!isOpen);
//               setIsPagesOpen(false);
//             }}
//           >
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {isOpen ? (
//                 <path d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile menu */}
//         {isOpen && (
//           <div className="md:hidden mt-4">
//             <div className="rounded-lg border border-[#CF992D]/20 p-4 bg-[#29303A]/50">
//               <Link to="home" className="block py-2 text-[#CF992D]">
//                 Home
//               </Link>
//               <Link to="/about" className="block py-2 text-[#C9C9C9] hover:text-[#CF992D]">
//                 About Us
//               </Link>
//               <Link to="/services" className="block py-2 text-[#C9C9C9] hover:text-[#CF992D]">
//                 Services
//               </Link>
//               <div className="py-2">
//                 <button
//                   className="flex items-center text-[#C9C9C9] hover:text-[#CF992D] w-full"
//                   onClick={() => setIsPagesOpen(!isPagesOpen)}
//                 >
//                   Pages
//                   <ChevronDown 
//                     size={20} 
//                     className={`ml-1 transform transition-transform ${isPagesOpen ? 'rotate-180' : ''}`}
//                   />
//                 </button>
//                 {isPagesOpen && (
//                   <div className="pl-4 mt-2">
//                     <Link 
//                       to="/kyc" 
//                       className="block py-2 text-[#C9C9C9] hover:text-[#CF992D]"
//                       onClick={() => {
//                         setIsPagesOpen(false);
//                         setIsOpen(false);
//                       }}
//                     >
//                       KYC
//                     </Link>
//                   </div>
//                 )}
//               </div>
//               <Link to="/" className="block py-2 text-[#C9C9C9] hover:text-[#CF992D]">
//                 Contact Us
//               </Link>
//               <Link to="/login" className="block mt-4">
//                 <button className="w-full bg-white text-[#29303A] px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors">
//                   Login
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;













import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  };

  return (
    <nav className="bg-black py-4 px-6">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#CF992D]">
              PangeaPay
            </Link>
          </div>

          {/* Navigation Container with Border */}
          <div className="hidden md:flex items-center justify-between bg-[#29303A]/50 border border-[#CF992D]/20 rounded-full px-8 py-2">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-[#CF992D]/90">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-[#CF992D]">
                About Us
              </Link>
              <Link to="/services" className="text-white hover:text-[#CF992D]">
                Services
              </Link>
              <div className="relative group">
                <div className="flex items-center text-white hover:text-[#CF992D] cursor-default">
                  Pages
                  <ChevronDown size={20} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
                </div>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <div className="py-1">
                    <Link to="/kyc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      KYC
                    </Link>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="text-white hover:text-[#CF992D]">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Login/Logout Button */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link to="/Login">
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => {
              setIsOpen(!isOpen);
              setIsPagesOpen(false);
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="rounded-lg border border-[#CF992D]/20 p-4 bg-[#29303A]/50">
              <Link to="/" className="block py-2 text-[#CF992D]">
                Home
              </Link>
              <Link to="/about" className="block py-2 text-[#C9C9C9] hover:text-[#CF992D]">
                About Us
              </Link>
              <Link to="/services" className="block py-2 text-[#C9C9C9] hover:text-[#CF992D]">
                Services
              </Link>
              <div className="py-2">
                <button
                  className="flex items-center text-[#C9C9C9] hover:text-[#CF992D] w-full"
                  onClick={() => setIsPagesOpen(!isPagesOpen)}
                >
                  Pages
                  <ChevronDown 
                    size={20} 
                    className={`ml-1 transform transition-transform ${isPagesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isPagesOpen && (
                  <div className="pl-4 mt-2">
                    <Link 
                      to="/kyc" 
                      className="block py-2 text-[#C9C9C9] hover:text-[#CF992D]"
                      onClick={() => {
                        setIsPagesOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      KYC
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/" className="block py-2 text-[#C9C9C9] hover:text-[#CF992D]">
                Contact Us
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-white text-[#29303A] px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors mt-4"
                >
                  Logout
                </button>
              ) : (
                <Link to="/Login" className="block mt-4">
                  <button className="w-full bg-white text-[#29303A] px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;