// import React, { useState } from "react";

// const Footer = () => {
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

//   const languages = [
//     { code: "EN", name: "English" },
//     { code: "ES", name: "Spanish" },
//     { code: "FR", name: "French" },
//   ];

//   return (
//     <footer className="w-full bg-gray-50 border-t border-gray-200 py-4 px-4 md:px-6">
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-4 sm:space-y-0">
//         {/* Navigation links - Stack on mobile, row on desktop */}
//         <nav className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-6">
//           <a
//             href="/whitepaper"
//             className="text-gray-600 hover:text-gray-800 transition-colors text-sm md:text-base"
//           >
//             Whitepaper
//           </a>
//           <a
//             href="/faqs"
//             className="text-gray-600 hover:text-gray-800 transition-colors text-sm md:text-base"
//           >
//             FAQs
//           </a>
//           <a
//             href="/privacy-policy"
//             className="text-gray-600 hover:text-gray-800 transition-colors text-sm md:text-base"
//           >
//             Privacy Policy
//           </a>
//           <a
//             href="/terms"
//             className="text-gray-600 hover:text-gray-800 transition-colors text-sm md:text-base"
//           >
//             Terms of Condition
//           </a>
//         </nav>

//         {/* Right side content - Copyright and Language selector */}
//         <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
//           <span className="text-gray-600 text-sm md:text-base order-2 sm:order-1">
//             © 2024 PangeaPay.
//           </span>

//           {/* Language selector dropdown */}
//           <div className="relative order-1 sm:order-2">
//             <button
//               className="flex items-center space-x-1 px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
//               onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
//             >
//               <span className="text-gray-600 text-sm md:text-base">EN</span>
//               <svg
//                 className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${
//                   isLanguageDropdownOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {/* Language dropdown menu */}
//             {isLanguageDropdownOpen && (
//               <div className="absolute bottom-full mb-1 right-0 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
//                 {languages.map((lang) => (
//                   <button
//                     key={lang.code}
//                     className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                     onClick={() => {
//                       // Add language change logic here
//                       setIsLanguageDropdownOpen(false);
//                     }}
//                   >
//                     {lang.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full relative">
      {/* Newsletter Section
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 z-10">
        <div className="bg-[#CF992D] p-6 rounded-lg shadow-lg">
          <div className="container mx-auto flex items-center justify-between gap-24">
            {/* Title 
            <div className="max-w-md">
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Subscribe To Our
                <br />
                Weekly Newsletter
              </h2>
            </div>

            {/* Features and Input Group 
            <div className="flex flex-col items-end gap-4 flex-1 max-w-2xl">
              {/* Features *
              <div className="flex items-center justify-end gap-8 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-black whitespace-nowrap">Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-black whitespace-nowrap">24/7 Online Support</span>
                </div>
              </div>

              {/* Email Input Group *
              <div className="flex w-full gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded-lg flex-1"
                />
                <button className="bg-black text-white px-6 py-2 rounded-lg whitespace-nowrap hover:bg-opacity-90">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <footer className="bg-black text-white pt-32 pb-12 relative z-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* <img src="/api/placeholder/50/50" alt="Optibiz Logo" className="w-8 h-8" /> */}
                <h3 className="text-2xl font-bold text-[#CF992D]">PangeaPay</h3>
              </div>
              <p className="text-white mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-[#C9C9C9] p-2 rounded-full hover:bg-[#CF992D] transition-colors"
                >
                  <Facebook size={20} className="text-[#29303A]" />
                </a>
                <a
                  href="#"
                  className="bg-[#C9C9C9] p-2 rounded-full hover:bg-[#CF992D] transition-colors"
                >
                  <Twitter size={20} className="text-[#29303A]" />
                </a>
                <a
                  href="#"
                  className="bg-[#C9C9C9] p-2 rounded-full hover:bg-[#CF992D] transition-colors"
                >
                  <Youtube size={20} className="text-[#29303A]" />
                </a>
              </div>
            </div>

            {/* Our Services */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#CF992D]">
                Our Services
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-white hover:text-[#CF992D]">
                    Budgeting And Forecasting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-[#CF992D]">
                    Strategy Consulting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-[#CF992D]">
                    Operational Consulting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-[#CF992D]">
                    Taxes & Accounting
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#CF992D]">Support</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-white hover:text-[#CF992D]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-[#CF992D]">
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-[#CF992D]">
                    Help & FAQ's
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-[#CF992D]">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#CF992D]">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-white">
                  <Phone size={20} className="text-[#CF992D]" />
                  <span>(+98)123-456-7890</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Mail size={20} className="text-[#CF992D]" />
                  <span>optibiz@example.site</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <MapPin size={20} className="text-[#CF992D] mt-1" />
                  <span>Jl. Raya Kuta Chartered No.70 Street, Bali</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-[#C9C9C9] py-4">
        <div className="container mx-auto px-4 text-center text-black">
          Copyright © 2025 PangeaPay | Powered by PangeaPay
        </div>
      </div>
    </div>
  );
};

export default Footer;
