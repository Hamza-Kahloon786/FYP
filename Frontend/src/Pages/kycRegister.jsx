import React, { useState, useRef } from "react";
import { Upload, Video, Camera, FileText } from "lucide-react";

const KycRegister = () => {
  // Step state
  const [step, setStep] = useState(1);
  // New state for submission message
  const [submissionMessage, setSubmissionMessage] = useState("");

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    telegram: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    nationality: "United States",
    zipCode: "",
    walletAddress: "",
    documentFile: null,
    videoFile: null, // For uploaded video
    liveVideoFile: null, // For recorded live video
    walletType: "ethereum",
    idCardFront: null,
    idCardBack: null,
    creditCardFront: null,
    creditCardBack: null,
    selectedDocType: "passport",
  });

  // Camera and recording states/refs
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [currentCaptureSide, setCurrentCaptureSide] = useState(null); // 'front' or 'back'
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // Refs for video, live video, canvas, stream, and file inputs
  const videoRef = useRef(null);
  const liveVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const frontFileInputRef = useRef(null);
  const backFileInputRef = useRef(null);
  const creditFrontFileInputRef = useRef(null);
  const creditBackFileInputRef = useRef(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads (for ID card and video)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length) {
      if (name === "idCardFrontUpload") {
        setFormData((prev) => ({
          ...prev,
          idCardFront: URL.createObjectURL(files[0]),
        }));
      } else if (name === "idCardBackUpload") {
        setFormData((prev) => ({
          ...prev,
          idCardBack: URL.createObjectURL(files[0]),
        }));
      } else if (name === "videoFile") {
        setFormData((prev) => ({ ...prev, videoFile: files[0] }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    }
  };

  // Handle image file upload using FileReader
  const handleImageFileUpload = (e, side, type = "id") => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "id") {
          if (side === "front") {
            setFormData((prev) => ({ ...prev, idCardFront: reader.result }));
          } else if (side === "back") {
            setFormData((prev) => ({ ...prev, idCardBack: reader.result }));
          }
        } else if (type === "credit") {
          if (side === "front") {
            setFormData((prev) => ({
              ...prev,
              creditCardFront: reader.result,
            }));
          } else if (side === "back") {
            setFormData((prev) => ({
              ...prev,
              creditCardBack: reader.result,
            }));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger click on hidden file input based on side and type
  const triggerFileInput = (side, type = "id") => {
    if (type === "id") {
      if (side === "front" && frontFileInputRef.current) {
        frontFileInputRef.current.click();
      } else if (side === "back" && backFileInputRef.current) {
        backFileInputRef.current.click();
      }
    } else if (type === "credit") {
      if (side === "front" && creditFrontFileInputRef.current) {
        creditFrontFileInputRef.current.click();
      } else if (side === "back" && creditBackFileInputRef.current) {
        creditBackFileInputRef.current.click();
      }
    }
  };

  // Handle form submission with backend integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionMessage(""); // reset any previous message
    // Create a FormData object and append all fields from formData
    const form = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        form.append(key, formData[key]);
      }
    }

    try {
      // Dummy backend URL pointing to our Flask MongoDB endpoint
      const response = await fetch("http://localhost:5000/api/kyc", {
        method: "POST",
        body: form,
      });
      const result = await response.json();
      if (response.ok) {
        setSubmissionMessage("Your information has been successfully sent.");
        console.log("Submission successful:", result);
      } else {
        setSubmissionMessage("There was an error submitting your information.");
        console.error("Submission error:", result);
      }
    } catch (error) {
      setSubmissionMessage("There was an error submitting your information.");
      console.error("Error submitting form:", error);
    }
  };

  // Image Capture Functions
  const openCamera = (side, type = "id") => {
    setCurrentCaptureSide(side);
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error("Error accessing camera: ", error);
      });
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      if (currentCaptureSide === "front") {
        setFormData((prev) => ({ ...prev, idCardFront: dataUrl }));
      } else if (currentCaptureSide === "back") {
        setFormData((prev) => ({ ...prev, idCardBack: dataUrl }));
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsCameraOpen(false);
      setCurrentCaptureSide(null);
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
    setCurrentCaptureSide(null);
  };

  // Live Video Recording Functions
  const handleLiveVideoCapture = () => {
    setIsRecordingModalOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (liveVideoRef.current) {
          liveVideoRef.current.srcObject = stream;
          liveVideoRef.current.play();
        }
        const options = { mimeType: "video/webm" };
        const recorder = new MediaRecorder(stream, options);
        let chunks = [];
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data);
          }
        };
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          const videoURL = URL.createObjectURL(blob);
          setFormData((prev) => ({ ...prev, liveVideoFile: videoURL }));
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
          }
          setIsRecording(false);
          setIsRecordingModalOpen(false);
        };
        setMediaRecorder(recorder);
        recorder.start();
        setIsRecording(true);
      })
      .catch((error) =>
        console.error("Error accessing camera for recording: ", error)
      );
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    }
  };

  const cancelRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecordingModalOpen(false);
    setIsRecording(false);
  };

  // Handle document type selection
  const handleDocTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, selectedDocType: type }));
  };

  // Step navigation functions
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="flex items-center mb-8">
          <div className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                step >= 1
                  ? "border-CF992D bg-CF992D text-black"
                  : "border-gray-700 bg-gray-800 text-gray-400"
              }`}
              style={{
                borderColor: "#CF992D",
                backgroundColor: step >= 1 ? "#CF992D" : "rgb(31,41,55)",
              }}
            >
              1
            </div>
            <span className="ml-2 text-sm font-medium text-gray-300">
              Step 1
            </span>
          </div>
          <div
            className={`flex-auto border-t-2 mx-2`}
            style={{ borderColor: step >= 2 ? "#CF992D" : "#374151" }}
          ></div>
          <div className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                step >= 2
                  ? "border-CF992D bg-CF992D text-black"
                  : "border-gray-700 bg-gray-800 text-gray-400"
              }`}
              style={{
                borderColor: "#CF992D",
                backgroundColor: step >= 2 ? "#CF992D" : "rgb(31,41,55)",
              }}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium text-gray-300">
              Step 2
            </span>
          </div>
          <div
            className={`flex-auto border-t-2 mx-2`}
            style={{ borderColor: step >= 3 ? "#CF992D" : "#374151" }}
          ></div>
          <div className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                step >= 3
                  ? "border-CF992D bg-CF992D text-black"
                  : "border-gray-700 bg-gray-800 text-gray-400"
              }`}
              style={{
                borderColor: "#CF992D",
                backgroundColor: step >= 3 ? "#CF992D" : "rgb(31,41,55)",
              }}
            >
              3
            </div>
            <span className="ml-2 text-sm font-medium text-gray-300">
              Step 3
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          KYC Verification
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Please fill out the form carefully. You won't be able to edit these
          details after submission.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="border border-gray-700 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 text-black rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#CF992D" }}
                  >
                    01
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    Personal Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Last Name{" "}
                      <span
                        className="text-CF992D"
                        style={{ color: "#CF992D" }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address{" "}
                      <span
                        className="text-CF992D"
                        style={{ color: "#CF992D" }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number{" "}
                      <span
                        className="text-CF992D"
                        style={{ color: "#CF992D" }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Date of Birth{" "}
                      <span
                        className="text-CF992D"
                        style={{ color: "#CF992D" }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Telegram Username
                    </label>
                    <input
                      type="text"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                    />
                  </div>
                  <h3
                    className="text-lg font-medium text-CF992D md:col-span-2 mt-4"
                    style={{ color: "#CF992D" }}
                  >
                    Your Address
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Address Line 1{" "}
                      <span
                        className="text-CF992D"
                        style={{ color: "#CF992D" }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      City{" "}
                      <span
                        className="text-CF992D"
                        style={{ color: "#CF992D" }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      State{" "}
                      <span
                        className="text-CF992D"
                        style={{ color: "#CF992D" }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Nationality{" "}
                      <span
                        className="text-CF992D"
                        style={{ color: "#CF992D" }}
                      >
                        *
                      </span>
                    </label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    >
                      <option value="United State">United State</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Zip Code{" "}
                      <span
                        className="text-CF992D"
                        style={{ color: "#CF992D" }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-CF992D focus:border-CF992D transition duration-150"
                      style={{
                        focusRing: "#CF992D",
                        focusBorderColor: "#CF992D",
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="border border-gray-700 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 text-black rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#CF992D" }}
                  >
                    02
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    Document Upload
                  </h2>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="inline-flex items-center mr-2">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{ color: "#CF992D" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      In order to complete, please upload any of the following
                      personal document.
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => handleDocTypeSelect("passport")}
                      className={`flex items-center p-4 border rounded-lg transition-all ${
                        formData.selectedDocType === "passport"
                          ? "border-CF992D bg-gray-800"
                          : "border-gray-700 hover:border-CF992D"
                      }`}
                      style={{
                        borderColor:
                          formData.selectedDocType === "passport"
                            ? "#CF992D"
                            : "",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                        style={{ backgroundColor: "rgba(207, 153, 45, 0.2)" }}
                      >
                        <FileText
                          className="w-5 h-5"
                          style={{ color: "#CF992D" }}
                        />
                      </div>
                      <span className="font-medium text-white">PASSPORT</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDocTypeSelect("national_card")}
                      className={`flex items-center p-4 border rounded-lg transition-all ${
                        formData.selectedDocType === "national_card"
                          ? "border-CF992D bg-gray-800"
                          : "border-gray-700 hover:border-CF992D"
                      }`}
                      style={{
                        borderColor:
                          formData.selectedDocType === "national_card"
                            ? "#CF992D"
                            : "",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                        style={{ backgroundColor: "rgba(207, 153, 45, 0.2)" }}
                      >
                        <FileText
                          className="w-5 h-5"
                          style={{ color: "#CF992D" }}
                        />
                      </div>
                      <span className="font-medium text-white">
                        NATIONAL CARD
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDocTypeSelect("drivers_license")}
                      className={`flex items-center p-4 border rounded-lg transition-all ${
                        formData.selectedDocType === "drivers_license"
                          ? "border-CF992D bg-gray-800"
                          : "border-gray-700 hover:border-CF992D"
                      }`}
                      style={{
                        borderColor:
                          formData.selectedDocType === "drivers_license"
                            ? "#CF992D"
                            : "",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                        style={{ backgroundColor: "rgba(207, 153, 45, 0.2)" }}
                      >
                        <FileText
                          className="w-5 h-5"
                          style={{ color: "#CF992D" }}
                        />
                      </div>
                      <span className="font-medium text-white">
                        DRIVER'S LICENSE
                      </span>
                    </button>
                  </div>
                  <div className="mb-6">
                    <h3
                      className="text-lg font-medium mb-3"
                      style={{ color: "#CF992D" }}
                    >
                      To avoid delays when verifying your account, please
                      ensure:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "#CF992D" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-300">
                          The credential is not expired.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "#CF992D" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-300">
                          Document is in good condition and clearly visible.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "#CF992D" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-300">
                          Ensure no glare is present on the card.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3
                      className="text-lg font-medium mb-3"
                      style={{ color: "#CF992D" }}
                    >
                      Upload or Capture{" "}
                      {formData.selectedDocType === "passport"
                        ? "Passport"
                        : formData.selectedDocType === "national_card"
                        ? "National Card"
                        : "Driver's License"}{" "}
                      Images
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-700 rounded-lg p-4">
                        <h4 className="text-center font-medium mb-4 text-white">
                          Front Side
                        </h4>
                        <input
                          type="file"
                          ref={frontFileInputRef}
                          accept="image/*"
                          onChange={(e) =>
                            handleImageFileUpload(e, "front", "id")
                          }
                          className="hidden"
                        />
                        {formData.idCardFront ? (
                          <div className="relative">
                            <img
                              src={formData.idCardFront}
                              alt="ID Card Front"
                              className="w-full h-48 object-contain border border-gray-700 rounded"
                            />
                            <div className="absolute bottom-2 right-2 flex space-x-2">
                              <button
                                type="button"
                                onClick={() => openCamera("front", "id")}
                                className="p-2 rounded-full hover:bg-CF992D-700"
                                style={{
                                  backgroundColor: "#CF992D",
                                  color: "black",
                                }}
                                title="Take photo"
                              >
                                <Camera className="w-5 h-5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => triggerFileInput("front", "id")}
                                className="p-2 rounded-full hover:bg-CF992D-700"
                                style={{
                                  backgroundColor: "#CF992D",
                                  color: "black",
                                }}
                                title="Upload image"
                              >
                                <Upload className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-48 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center bg-gray-800">
                            <div className="grid grid-cols-2 gap-4 w-full px-8">
                              <button
                                type="button"
                                onClick={() => openCamera("front", "id")}
                                className="flex flex-col items-center justify-center py-4 px-2 bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                              >
                                <Camera
                                  className="w-8 h-8 mb-2"
                                  style={{ color: "#CF992D" }}
                                />
                                <p className="text-sm text-gray-400">
                                  Take photo
                                </p>
                              </button>
                              <button
                                type="button"
                                onClick={() => triggerFileInput("front", "id")}
                                className="flex flex-col items-center justify-center py-4 px-2 bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                              >
                                <Upload
                                  className="w-8 h-8 mb-2"
                                  style={{ color: "#CF992D" }}
                                />
                                <p className="text-sm text-gray-400">
                                  Upload image
                                </p>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="border border-gray-700 rounded-lg p-4">
                        <h4 className="text-center font-medium mb-4 text-white">
                          Back Side
                        </h4>
                        <input
                          type="file"
                          ref={backFileInputRef}
                          accept="image/*"
                          onChange={(e) =>
                            handleImageFileUpload(e, "back", "id")
                          }
                          className="hidden"
                        />
                        {formData.idCardBack ? (
                          <div className="relative">
                            <img
                              src={formData.idCardBack}
                              alt="ID Card Back"
                              className="w-full h-48 object-contain border border-gray-700 rounded"
                            />
                            <div className="absolute bottom-2 right-2 flex space-x-2">
                              <button
                                type="button"
                                onClick={() => openCamera("back", "id")}
                                className="p-2 rounded-full hover:bg-CF992D-700"
                                style={{
                                  backgroundColor: "#CF992D",
                                  color: "black",
                                }}
                                title="Take photo"
                              >
                                <Camera className="w-5 h-5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => triggerFileInput("back", "id")}
                                className="p-2 rounded-full hover:bg-CF992D-700"
                                style={{
                                  backgroundColor: "#CF992D",
                                  color: "black",
                                }}
                                title="Upload image"
                              >
                                <Upload className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-48 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center bg-gray-800">
                            <div className="grid grid-cols-2 gap-4 w-full px-8">
                              <button
                                type="button"
                                onClick={() => openCamera("back", "id")}
                                className="flex flex-col items-center justify-center py-4 px-2 bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                              >
                                <Camera
                                  className="w-8 h-8 mb-2"
                                  style={{ color: "#CF992D" }}
                                />
                                <p className="text-sm text-gray-400">
                                  Take photo
                                </p>
                              </button>
                              <button
                                type="button"
                                onClick={() => triggerFileInput("back", "id")}
                                className="flex flex-col items-center justify-center py-4 px-2 bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                              >
                                <Upload
                                  className="w-8 h-8 mb-2"
                                  style={{ color: "#CF992D" }}
                                />
                                <p className="text-sm text-gray-400">
                                  Upload image
                                </p>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <div className="w-full relative">
                        <img
                          src="/Image-1.jpg"
                          alt="Example ID card"
                          className="w-full rounded-lg shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* STEP 3 */}
          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="border border-gray-700 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 text-black rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#CF992D" }}
                  >
                    03
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    Credit Card Information
                  </h2>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-4">
                    <span className="inline-flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{ color: "#CF992D" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Please provide clear images of the front and back of your
                      credit card.
                    </span>
                  </p>
                  <div
                    className="mb-6 bg-gray-800 border-l-4 border-CF992D p-4"
                    style={{ borderLeftColor: "#CF992D" }}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          style={{ color: "#CF992D" }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-300">
                          For your security, cover the middle 8 digits of your
                          card number and the CVV code on the back.
                        </p>
                      </div>
                    </div>
                  </div>
                  <h3
                    className="text-lg font-medium mb-3"
                    style={{ color: "#CF992D" }}
                  >
                    Upload or Capture Credit Card Images
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-700 rounded-lg p-4">
                      <h4 className="text-center font-medium mb-4 text-white">
                        Front Side
                      </h4>
                      <input
                        type="file"
                        ref={creditFrontFileInputRef}
                        accept="image/*"
                        onChange={(e) =>
                          handleImageFileUpload(e, "front", "credit")
                        }
                        className="hidden"
                      />
                      {formData.creditCardFront ? (
                        <div className="relative">
                          <img
                            src={formData.creditCardFront}
                            alt="Credit Card Front"
                            className="w-full h-48 object-contain border border-gray-700 rounded"
                          />
                          <div className="absolute bottom-2 right-2 flex space-x-2">
                            <button
                              type="button"
                              onClick={() => openCamera("front", "credit")}
                              className="p-2 rounded-full hover:bg-CF992D-700"
                              style={{
                                backgroundColor: "#CF992D",
                                color: "black",
                              }}
                              title="Take photo"
                            >
                              <Camera className="w-5 h-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                triggerFileInput("front", "credit")
                              }
                              className="p-2 rounded-full hover:bg-CF992D-700"
                              style={{
                                backgroundColor: "#CF992D",
                                color: "black",
                              }}
                              title="Upload image"
                            >
                              <Upload className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-48 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center bg-gray-800">
                          <div className="grid grid-cols-2 gap-4 w-full px-8">
                            <button
                              type="button"
                              onClick={() => openCamera("front", "credit")}
                              className="flex flex-col items-center justify-center py-4 px-2 bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                            >
                              <Camera
                                className="w-8 h-8 mb-2"
                                style={{ color: "#CF992D" }}
                              />
                              <p className="text-sm text-gray-400">
                                Take photo
                              </p>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                triggerFileInput("front", "credit")
                              }
                              className="flex flex-col items-center justify-center py-4 px-2 bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                            >
                              <Upload
                                className="w-8 h-8 mb-2"
                                style={{ color: "#CF992D" }}
                              />
                              <p className="text-sm text-gray-400">
                                Upload image
                              </p>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="border border-gray-700 rounded-lg p-4">
                      <h4 className="text-center font-medium mb-4 text-white">
                        Back Side
                      </h4>
                      <input
                        type="file"
                        ref={creditBackFileInputRef}
                        accept="image/*"
                        onChange={(e) =>
                          handleImageFileUpload(e, "back", "credit")
                        }
                        className="hidden"
                      />
                      {formData.creditCardBack ? (
                        <div className="relative">
                          <img
                            src={formData.creditCardBack}
                            alt="Credit Card Back"
                            className="w-full h-48 object-contain border border-gray-700 rounded"
                          />
                          <div className="absolute bottom-2 right-2 flex space-x-2">
                            <button
                              type="button"
                              onClick={() => openCamera("back", "credit")}
                              className="p-2 rounded-full hover:bg-CF992D-700"
                              style={{
                                backgroundColor: "#CF992D",
                                color: "black",
                              }}
                              title="Take photo"
                            >
                              <Camera className="w-5 h-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => triggerFileInput("back", "credit")}
                              className="p-2 rounded-full hover:bg-CF992D-700"
                              style={{
                                backgroundColor: "#CF992D",
                                color: "black",
                              }}
                              title="Upload image"
                            >
                              <Upload className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-48 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center bg-gray-800">
                          <div className="grid grid-cols-2 gap-4 w-full px-8">
                            <button
                              type="button"
                              onClick={() => openCamera("back", "credit")}
                              className="flex flex-col items-center justify-center py-4 px-2 bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                            >
                              <Camera
                                className="w-8 h-8 mb-2"
                                style={{ color: "#CF992D" }}
                              />
                              <p className="text-sm text-gray-400">
                                Take photo
                              </p>
                            </button>
                            <button
                              type="button"
                              onClick={() => triggerFileInput("back", "credit")}
                              className="flex flex-col items-center justify-center py-4 px-2 bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                            >
                              <Upload
                                className="w-8 h-8 mb-2"
                                style={{ color: "#CF992D" }}
                              />
                              <p className="text-sm text-gray-400">
                                Upload image
                              </p>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <div className="w-full relative">
                      <img
                        src="/ccc.png"
                        alt="Example credit card"
                        className="w-full rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-CF992D transition duration-150"
                style={{ hoverBorderColor: "#CF992D" }}
              >
                <Camera
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: "#CF992D" }}
                />
                <p className="text-sm text-gray-400">
                  Record a live video saying "I confirm this is my KYC
                  application"
                </p>
                <button
                  type="button"
                  onClick={handleLiveVideoCapture}
                  className="inline-block px-6 py-2 text-black rounded hover:bg-opacity-80 cursor-pointer transition duration-150 mt-3"
                  style={{ backgroundColor: "#CF992D" }}
                >
                  Record Video
                </button>
                {formData.liveVideoFile && (
                  <video controls className="mt-4 w-full">
                    <source src={formData.liveVideoFile} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              <div
                className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-CF992D transition duration-150 mt-6"
                style={{ hoverBorderColor: "#CF992D" }}
              >
                <Video
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: "#CF992D" }}
                />
                <p className="text-sm text-gray-400">
                  Record or upload a short video saying "I confirm this is my
                  KYC application"
                </p>
                <input
                  type="file"
                  name="videoFile"
                  onChange={handleFileChange}
                  accept="video/mp4"
                  style={{ display: "none" }}
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="inline-block px-6 py-2 text-black rounded hover:bg-opacity-80 cursor-pointer transition duration-150 mt-3"
                  style={{ backgroundColor: "#CF992D" }}
                >
                  Upload Video
                </label>
                {formData.videoFile ? (
                  <video controls className="mt-4 w-full">
                    <source
                      src={URL.createObjectURL(formData.videoFile)}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p className="mt-4 text-sm text-gray-400">
                    No video uploaded
                  </p>
                )}
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-gray-700 text-CF992D focus:ring-CF992D"
                    style={{
                      borderColor: "#374151",
                      color: "#CF992D",
                      focusRing: "#CF992D",
                    }}
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    I have Read The Terms Of Condition and Privacy Policy.
                  </label>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-150"
              >
                Previous
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-2 bg-[#CF992D] text-black rounded hover:bg-[#e6b858] transition duration-150"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-[#CF992D] text-black rounded hover:bg-[#e6b858] transition duration-150"
              >
                Proceed for Verify
              </button>
            )}
          </div>
        </form>
        {submissionMessage && (
          <div className="mt-4 text-center text-lg text-green-600">
            {submissionMessage}
          </div>
        )}
      </div>
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-xl w-full">
            <h3 className="text-lg font-medium text-center mb-2">
              Capture {currentCaptureSide === "front" ? "Front" : "Back"} Side
            </h3>
            <video ref={videoRef} className="w-full border rounded" autoPlay />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={captureImage}
                className="px-6 py-2 bg-[#CF992D] text-black rounded hover:bg-[#e6b858] transition duration-150"
              >
                Capture Image
              </button>
              <button
                onClick={closeCamera}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isRecordingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative max-w-xl w-full">
            <h3 className="text-lg font-medium text-center mb-2">
              Live Video Recording
            </h3>
            <video
              ref={liveVideoRef}
              className="w-full border rounded"
              autoPlay
            />
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={stopRecording}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-150"
              >
                Stop Recording
              </button>
              <button
                onClick={cancelRecording}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycRegister;
