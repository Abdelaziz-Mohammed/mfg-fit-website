import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  if (error.status === 401) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-white dark:bg-[#0F172A]">
        <h1 className="text-7xl font-bold text-red-500 mb-6">401</h1>
        <p className="text-xl mb-2 text-black dark:text-white/90">
          Unauthorized Access
        </p>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  if (error.status === 404) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-white dark:bg-[#0F172A]">
        <h1 className="text-7xl font-bold text-red-500 mb-6">404</h1>
        <p className="text-xl mb-2 text-black dark:text-white/90">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="outline-0 border-0 h-10 flex items-center justify-center gap-2 px-6 rounded-xl text-white bg-primary/85
            text-sm sm:text-base cursor-pointer hover:bg-primary transition duration-300 ease-in-out w-fit mx-auto mt-10"
        >
          Return to Home
        </Link>
      </div>
    );
  }
}

export default Error;
