// // Home.jsx
// import React from 'react';
// import { FileIcon } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const KYC = () => {
//   const navigate = useNavigate();

//   const handleKYCClick = () => {
//     navigate('/kycRegister');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto text-center">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-blue-700 mb-6">
//           KYC Verification
//         </h1>
        
//         {/* Description */}
//         <p className="text-gray-600 mb-12">
//           To comply with regulation, each participant must go through identity
//           verification (KYC/AML) to prevent fraud. Please complete our fast and secure
//           verification process to participate in our token sale.
//         </p>

//         {/* White Card */}
//         <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
//           {/* Icon */}
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//             <FileIcon className="w-10 h-10 text-gray-400" />
//           </div>

//           {/* Message */}
//           <p className="text-gray-600 mb-8">
//             You have not submitted the necessary documents to verify your identity.
//             In order to purchase our tokens, please verify your identity.
//           </p>

//           {/* CTA Button */}
//           <button
//             onClick={handleKYCClick}
//             className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
//           >
//             Click here to complete your KYC
//           </button>
//         </div>

//         {/* Support Text */}
//         <p className="text-gray-500 text-sm">
//           If you have any questions, please contact our support team{' '}
//           <a 
//             href="mailto:info@tokenwiz.com"
//             className="text-blue-600 hover:text-blue-700"
//           >
//             info@pangeapay.com
//           </a>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

// export default KYC;




import React from 'react';
import { FileIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KYC = () => {
  const navigate = useNavigate();

  const handleKYCClick = () => {
    navigate('/kycRegister');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#CF992D' }}>
          KYC Verification
        </h1>
        
        {/* Description */}
        <p className="text-gray-400 mb-12">
          To comply with regulation, each participant must go through identity
          verification (KYC/AML) to prevent fraud. Please complete our fast and secure
          verification process to participate in our token sale.
        </p>

        {/* Dark Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 mb-8">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-900 flex items-center justify-center">
            <FileIcon className="w-10 h-10" style={{ color: '#CF992D' }} />
          </div>

          {/* Message */}
          <p className="text-gray-300 mb-8">
            You have not submitted the necessary documents to verify your identity.
            In order to purchase our tokens, please verify your identity.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleKYCClick}
            className="px-6 py-3 rounded-md text-black transition-colors duration-200 hover:bg-opacity-80"
            style={{ backgroundColor: '#CF992D' }}
          >
            Click here to complete your KYC
          </button>
        </div>

        {/* Support Text */}
        <p className="text-gray-500 text-sm">
          If you have any questions, please contact our support team{' '}
          <a 
            href="mailto:info@pangeapay.com"
            className="hover:text-opacity-80 transition-colors"
            style={{ color: '#CF992D' }}
          >
            info@pangeapay.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default KYC;