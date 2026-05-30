import React from 'react'

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {/* <img src={imageUrl} alt="404 Error" className="h-64 mb-10 rounded-full" /> */}
          <h1 className="text-white text-4xl font-bold mb-6">
            Oops! Page not found.
          </h1>
          <p className="text-white text-lg mb-6">
            The page you are looking for may have been removed or does not exist.
          </p>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Go back to home page
          </a>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound