import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Matrimony</h1>
      <p className="text-lg text-gray-700 mb-6">
        Join us to find your perfect match!
      </p>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700"
        >
          LoginTestingPurpose
        </Link>

        <Link
          href="/signup"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
