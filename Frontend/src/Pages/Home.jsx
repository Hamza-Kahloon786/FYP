import React, { useState } from 'react';
import { ArrowRight,ArrowUpRight,Users, Calculator,CheckCircle,DollarSign,Plus, Minus, PiggyBank, Check, LineChart } from 'lucide-react';
//import { ArrowRight, CheckCircle, DollarSign, Plus, Minus, PiggyBank, Check, LineChart } from 'lucide-react';





const ServiceCard = ({ image, icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={image} 
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div 
        className={`absolute left-6 right-6 bottom-6 bg-slate-800/95 rounded-xl transition-all duration-300 ease-in-out
          ${isHovered ? 'h-52' : 'h-20'}`}
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#CF992D] p-2 rounded-full">
              <Icon size={24} className="text-slate-800" />
            </div>
            <h3 className="text-xl text-white font-semibold">{title}</h3>
            <ArrowUpRight 
              size={20} 
              className="text-[#CF992D] ml-auto transform transition-transform duration-300 group-hover:translate-x-1" 
            />
          </div>
          <div className={`transition-opacity duration-300 mt-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-slate-200 mb-4 line-clamp-2">{description}</p>
            <button className="text-[#CF992D] flex items-center gap-2 hover:gap-3 transition-all duration-300">
              Learn More
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinancialLanding = () => {
  const services = [
    {
      title: "Business Strategies",
      description: "Comprehensive business consulting and strategic planning to help your company achieve sustainable growth and maximize market opportunities.",
      icon: Users,
      image: "/5-43.jpg"
    },
    {
      title: "Taxes & Accounting",
      description: "Expert tax planning and accounting services to optimize your financial position and ensure compliance with all regulations.",
      icon: Calculator,
      image: "/4-36.jpg"
    },
    {
      title: "Financial Planning",
      description: "Personalized financial planning services to secure your future and create a roadmap for wealth building and retirement.",
      icon: LineChart,
      image: "/7-29.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Header Section */}
      <div>
      {/* Services Tag - Now on the left */}
      <div className="flex justify-start mb-4">
        <span className="bg-[#CF992D] text-black px-4 py-2 rounded-full text-sm font-medium">
          Our Services
        </span>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl  mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Financial Services To Grow And Secure Your Wealth
            </h1>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-slate-300 mb-8 md:text-left">
              Expert financial guidance to help you achieve your financial goals and secure your future prosperity.
            </p>
            <button className="bg-[#CF992D] hover:bg-[#CF992D] text-black px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 hover:gap-3 self-start">
              Learn More
              <ArrowUpRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};


//Testimonials
const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Juliana Silva",
      designation: "Designation",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/T1.jpg"
    },
    {
      name: "Emilia Rose",
      designation: "Designation",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/T2.jpg"
    },
    {
      name: "Listy Nay",
      designation: "Designation",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/T3.jpg"
    }
  ];

  return (
    <div className="w-full bg-black py-16">
      <div className="max-w-full mx-auto px-8 md:px-16">
        <div className="flex flex-col gap-12">
          <div>
            <span className="bg-[#CF992D] text-black px-4 py-1 rounded-full text-sm inline-block">
              Testimonial
            </span>
          </div>

          <div className="flex justify-between items-start">
            <h2 className="text-6xl font-bold text-white max-w-2xl">
              Positive Reviews From Our Clients
            </h2>
            <div className="max-w-xl">
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.
              </p>
              <button className="mt-4 bg-[#CF992D] hover:bg-opacity-90 transition-all text-gray-800 px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-colors">
                Learn More
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-3xl">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white text-lg mb-8">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <h4 className="text-white font-medium text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400">
                      {testimonial.designation}
                    </p>
                  </div>
                  <span className="ml-auto text-5xl text-white  font-serif leading-none">
                    "
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//FAQ
const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Third item open by default

  const faqs = [
    {
      question: "What services does MFC offer?",
      answer: "We provide a range of financial solutions designed to address your specific needs, including capital conversion services, credit utilization optimization, credit risk assessments, and credit management solutions. In addition we also offer partner collaboration opportunities, business development support, joint venture facilitation, and process automation for our partners."
    },
    {
      question: "How can MFC help businesses improve cash flow?",
      answer: "Our cash flow optimization strategies are tailored to your specific challenges. We evaluate liquidity and solvency, analyze cash flow, and implement expense management plans. By identifying inefficiencies and streamlining key processes, we ensure your business has the cash resources needed to grow sustainably."
    },
    {
      question: "What industries does Mondy Friend Capital work with?",
      answer: "Our expertise spans various industries, including technology, retail, hospitality, professional services, and more. We offer individualized strategies to ensure alignment with your business model, goals, and industry dynamics."
    },
    {
      question: "How does the MFC process work?",
      answer: "Our streamlined process ensures clarity and effectiveness: Initial Consultation: We'll assess your objectives, challenges, and potential opportunities. Strategic Planning: Develop a plan to optimize your cash flow and secure necessary resources.Implementation Support: Execute strategies with our expert team’s continuous guidance. Monitoring & Optimization: Regular reviews of performance metrics to adjust and maintain success."
    },
    {
      question: "Can MFC help with accessing capital for startups?",
      answer: "Yes, we specialize in helping startups and small businesses optimize their capital. We tailor our approach to meet your unique needs and set you up for long-term growth."
    },
    {
      question: "Does MFC provide partnership opportunities?",
      answer: "Absolutely. Our partner program enhances resources and creates new growth opportunities for collaborators. Benefits include joint ventures, co-branded initiatives, business development support, and access to automation tools that improve efficiency."
    }
  ];

  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 ${activeIndex === index ? 'bg-[#CF992D] bg-opacity-10' : 'bg-white bg-opacity-5'
                  }`}
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <span className={`font-medium ${activeIndex === index ? 'text-[#CF992D]' : 'text-white'
                    }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 ${activeIndex === index ? 'text-[#CF992D]' : 'text-white'
                    }`}>
                    {activeIndex === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-4 text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="lg:pl-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-[#CF992D] bg-opacity-10 text-[#CF992D]">
                FAQ'S Corner
              </span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-400 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <img src="/13-17.jpg" alt="FAQ" className="w-full  rounded-xl" />
            <button className="bg-[#CF992D] text-white mt-2 px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all font-medium">
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
//FEATURES SECTION
const FeaturesSection = () => {
  const features = [
    "Tailored Solutions",
    "Expert Guidance",
    "Innovative Strategies",
    "Comprehensive Support", 
    "Commitment to Excellence",
    "Strategic Partnerships"
  ];

  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 mb-4">
            <span className="text-[#CF992D] text-sm uppercase tracking-wider">
              FEATURES THAT DRIVE SUCCESS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Experience the Difference
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-16">
            At PGI, we understand the challenges businesses face when it comes to managing resources
            and planning for growth. Our expertise lies in creating custom financial strategies that align with
            your unique business goals. Here's what sets us apart:
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-5 px-8 py-6 rounded-2xl flex items-center gap-4 group hover:bg-opacity-10 transition-all border border-[#CF992D]/30"
              >
                <div className="bg-[#CF992D] rounded-full p-1.5">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="bg-[#CF992D] text-white px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all font-medium text-lg uppercase tracking-wide">
            SEE SERVICES
          </button>
        </div>
      </div>
    </div>
  );
};


//steps
const StepsSection = () => {
  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 rounded-full bg-[#CF992D] bg-opacity-10 mb-4">
            <span className="text-[#CF992D]">How We Work?</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            4 Easy Steps To Achieve Your Goals
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Steps Grid - Now 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-all h-64 flex flex-col border border-gray-700">
              <div className="text-6xl font-bold text-[#CF992D] opacity-40 mb-4">01</div>
              <h3 className="text-xl font-bold text-white mb-3">Pre-Qualification</h3>
              <p className="text-gray-300 flex-grow">
                We have start by ensuring we're the right fit for your needs, saving time and aligning expectations from the beginning.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-all h-64 flex flex-col border border-gray-700">
              <div className="text-6xl font-bold text-[#CF992D] opacity-40 mb-4">02</div>
              <h3 className="text-xl font-bold text-white mb-3">Discovery Call</h3>
              <p className="text-gray-300 flex-grow">
                Next, we conduct a discovery call to gather all the necessary details and understand your specific goals and challenges.
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {/* Step 3 */}
            <div className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-all h-64 flex flex-col border border-gray-700">
              <div className="text-6xl font-bold text-[#CF992D] opacity-40 mb-4">03</div>
              <h3 className="text-xl font-bold text-white mb-3">Onboarding</h3>
              <p className="text-gray-300 flex-grow">
                Once aligned, we guide you through a comprehensive onboarding process to collect all the information needed to proceed seamlessly.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-all h-64 flex flex-col border border-gray-700">
              <div className="text-6xl font-bold text-[#CF992D] opacity-40 mb-4">04</div>
              <h3 className="text-xl font-bold text-white mb-3">Initiation of Process</h3>
              <p className="text-gray-300 flex-grow">
                With everything in place, we kick off the process, implementing strategies and actionable steps tailored to your objectives.
              </p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            {/* Step 5 */}
            <div className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-all h-64 flex flex-col border border-gray-700">
              <div className="text-6xl font-bold text-[#CF992D] opacity-40 mb-4">05</div>
              <h3 className="text-xl font-bold text-white mb-3">Ongoing Support and Updates</h3>
              <p className="text-gray-300 flex-grow">
                Our team will provide continuous guidance, support, and regular updates throughout the entire process to ensure smooth execution and progress.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-all h-64 flex flex-col border border-gray-700">
              <div className="text-6xl font-bold text-[#CF992D] opacity-40 mb-4">06</div>
              <h3 className="text-xl font-bold text-white mb-3">Customer Success Follow-Up</h3>
              <p className="text-gray-300 flex-grow">
                After implementation, our customer success team will follow up to ensure your satisfaction, address any concerns, and help you achieve sustained success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const AboutSection = () => {
  return (
    <div className="w-full bg-black py-16">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Image Container and Notification */}
          <div className="flex flex-col gap-4">
            {/* Image Container */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/7-29.jpg"
                alt="Financial consultation"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Notification Bar - Now Below Image */}
            <div className="bg-[#1C2632] border border-[#CF992D] border-opacity-30 rounded-full p-2 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="text-[#CF992D] w-6 h-6" />
                  <span>Join us to achieve sustainable growth and reach your financial goals with the right strategies.</span>
                </div>
                <button className="bg-[#CF992D] text-[#1C2632] px-8 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center gap-2 whitespace-nowrap font-medium">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col">
            <div className="w-fit px-4 py-2 bg-[#CF992D] bg-opacity-10 rounded-full mb-4 transform transition-transform hover:scale-105">
              <span className="text-[#CF992D] whitespace-nowrap">Pangea Global Investments</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 transition-colors hover:text-[#CF992D]">
              Your Goto solution for Financial Leveraging
            </h2>

            <p className="text-gray-400">
              PGI helps you transform credit into opportunity, eliminating debt strategically, and driving capital growth. PGI empowers individuals and businesses with innovative financial solutions for lasting financial freedom.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Years of Experience */}
          <div className="text-center lg:text-left group cursor-pointer">
            <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-3">
              <span className="text-4xl lg:text-5xl font-bold text-white transition-transform group-hover:text-[#CF992D] duration-300">25</span>
              <span className="text-[#CF992D] text-2xl font-bold group-hover:translate-x-1 transition-transform">+</span>
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Years of proven expertise in financial solutions</p>
          </div>

          {/* Clients Served */}
          <div className="text-center lg:text-left group cursor-pointer">
            <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-3">
              <span className="text-4xl lg:text-5xl font-bold text-white transition-transform group-hover:text-[#CF992D] duration-300">150K</span>
              <span className="text-[#CF992D] text-2xl font-bold group-hover:translate-x-1 transition-transform">+</span>
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Clients successfully served worldwide</p>
          </div>

          {/* Success Rate */}
          <div className="text-center lg:text-left group cursor-pointer">
            <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-3">
              <span className="text-4xl lg:text-5xl font-bold text-white transition-transform group-hover:text-[#CF992D] duration-300">98%</span>
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Client satisfaction rate achieved</p>
          </div>

          {/* Capital Managed */}
          <div className="text-center lg:text-left group cursor-pointer">
            <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-3">
              <span className="text-4xl lg:text-5xl font-bold text-white transition-transform group-hover:text-[#CF992D] duration-300">$40M</span>
              <span className="text-[#CF992D] text-2xl font-bold group-hover:translate-x-1 transition-transform">+</span>
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Total client benefits delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// SERVICES SECTION
const ServicesSection = () => {
  return (
    <div className="w-full bg-black py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* How Does It Work? Section */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/36-17.jpg"
              alt="Business meeting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 p-6 flex flex-col justify-end">
              <h2 className="text-1xl font-bold text-white mb-4">PGI Financial Solutions</h2>
              <button className="inline-flex items-center text-[#CF992D] font-medium">
                <span>View All Services</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Service Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Credit Conversion Card */}
            <div className="bg-[#29303A] p-6 rounded-2xl border border-gray-700">
              <div className="bg-[#CF992D] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Credit Conversion</h3>
              <p className="text-gray-300">
                Convert your credit into cash legally.
              </p>
            </div>

            {/* Debt Discharge Card */}
            <div className="bg-[#29303A] p-6 rounded-2xl border border-gray-700">
              <div className="bg-[#CF992D] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <PiggyBank className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Debt Discharge</h3>
              <p className="text-gray-300">
                Reduce or eliminate personal debts.
              </p>
            </div>

            {/* Financial Consulting Card */}
            <div className="bg-[#29303A] p-6 rounded-2xl border border-gray-700">
              <div className="bg-[#CF992D] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Financial Consulting</h3>
              <p className="text-gray-300">
                Tailored strategies to rebuild wealth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const HeroSection = () => {
  return (
    <div className="bg-black py-16 px-6">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="inline-block px-6 py-2 rounded-full border border-[#CF992D] mb-12">
          <span className="text-[#CF992D] text-base">Capital Growth Strategy</span>
        </div>

        {/* Main Content */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Individuals & Business
            solutions
          </h1>

          <p className="text-gray-300 text-lg mb-10 max-w-2xl">
            PGI helps you legally convert credit and discharge personal debt with expert financial strategies.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <button className="bg-[#CF992D] text-white px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all text-lg">
              Get Free Consultation
              <span>→</span>
            </button>

            <button className="bg-[#CF992D] text-white px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all text-lg">
              View Our Services
              <span>→</span>
            </button>
          </div>

          {/* Bottom Section with Rating and Team */}
          <div className="grid grid-cols-1 pb-12 sm:grid-cols-2 gap-4">
            {/* Rating Section */}
            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-[#CF992D]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-4xl font-bold text-white">4.5</div>
              </div>
              <div className="self-end">
                <div className="text-gray-300">Positive Reviews From Our Customer</div>
              </div>
            </div>

            {/* Team Section */}
            <div className="flex flex-col items-start gap-4">
              <span className="text-white">Join Our Team Now</span>
              <div className="flex -space-x-4">
                <img src="/3-45.jpg" alt="Team member" className="w-12 h-12 rounded-full border-2 border-white" />
                <img src="/4-36.jpg" alt="Team member" className="w-12 h-12 rounded-full border-2 border-white" />
                <img src="/7-29.jpg" alt="Team member" className="w-12 h-12 rounded-full border-2 border-white" />
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-all">
                  <Plus className="w-6 h-6 text-[#29303A]" />
                </button>
              </div>
            </div>



          </div>
        </div>
      </div>
      <ServicesSection />
      <AboutSection />
      <StepsSection />
      <FinancialLanding/>
      <FeaturesSection />
      <TestimonialSection />
      <FAQSection />
    </div>
  );
};

export default HeroSection;