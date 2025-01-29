import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Recreating Living for a Modern World</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover our exclusive collection of modern furniture designed to elevate your living space with elegance and functionality.
        </p>
        <Link href="/pages/shop">
          <span className="inline-block bg-black text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition">View Our Collection</span>
        </Link>
      </div>

      <div className="mt-10">
        <Image
          src="/images/Landing.jpg"
          alt="Landing Image"
          width={650}
          height={450}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}