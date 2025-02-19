import Link from "next/link";
import { Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-gray-700 backdrop-blur-sm py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4">
            <Link
              href="https://x.com/abdulrahman3ma1"
              target="_blank"
              rel="noopener noreferrer">
              <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors" />
            </Link>
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-base text-gray-500 mt-2">
              <span className="text-blue-400">Abdo Emad</span> بُرمج من خلال
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
