import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <p className="text-primary font-bold text-9xl mb-2">404</p>
      <p className="text-slate-700 font-semibold text-2xl mb-1">Not Found</p>
      <p className="text-slate-500 font-medium text-xl mb-1">The requested page was not found</p>
      <Link
        href={"/"}
        className="border border-[#95999E] rounded-xl bg-primary hover:bg-opacity-95 px-4 py-1 text-white font-semibold"
      >
        {"<<"} Back to our home
      </Link>
    </div>
  );
};

export default NotFound;
