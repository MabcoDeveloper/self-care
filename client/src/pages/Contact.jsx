import React from "react";

const Contact = () => {
  return (
    <div className="bg-primary/50 py-24 sm:py-32 max-padd-container">
      <form className="flex flex-col items-center text-base text-tertiary max-w-lg mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-2xl">
        <p className="text-xs bg-secondary text-white font-medium px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
          Contact Us
        </p>

        <h1 className="text-4xl font-bold py-4 text-center text-tertiary">
          Let’s Get In Touch.
        </h1>

        <p className="text-sm text-gray-600 pb-10 text-center max-w-md">
          We’d love to hear from you. Send us a message or reach out manually at{" "}
          <a
            href="mailto:hello@vogues.com"
            className="font-semibold text-secondary hover:underline transition-colors"
          >
            hello@vogues.com
          </a>
        </p>

        <div className="w-full">
          <label htmlFor="name" className="font-semibold block mb-2">
            Full Name
          </label>
          <div className="flex items-center mb-6 h-12 pl-4 border border-gray-200 bg-white rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-secondary transition-all overflow-hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0"
                fill="#888888"
              />
            </svg>
            <input
              type="text"
              className="h-full px-3 w-full outline-none bg-transparent placeholder-gray-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          <label htmlFor="email-address" className="font-semibold block mb-2">
            Email Address
          </label>
          <div className="flex items-center mb-6 h-12 pl-4 border border-gray-200 bg-white rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-secondary transition-all overflow-hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z"
                fill="#888888"
              />
            </svg>
            <input
              type="email"
              className="h-full px-3 w-full outline-none bg-transparent placeholder-gray-400"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Message Field */}
          <label htmlFor="message" className="font-semibold block mb-2">
            Message
          </label>
          <textarea
            rows="5"
            className="w-full p-4 bg-white border border-gray-200 rounded-xl resize-none outline-none shadow-inner focus:ring-2 focus-within:ring-secondary transition-all placeholder-gray-400"
            placeholder="Enter your message"
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="flexCenter gap-1 mt-7 w-full !font-bold py-3 px-6 bg-secondary text-white rounded-full shadow-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-[1.01]"
          >
            Submit Form
            <svg
              className="mt-0.5"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
