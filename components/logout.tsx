"use client";
import { useCallback, useEffect, useState } from "react";
import { useLogoutMutation } from "@/redux/authService/authServiceEndpoints";
import { TOKEN } from "@/redux/auth/slice";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectAccessToken } from "@/redux/auth/selector";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const LogoutDropdown = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const [token, setToken] = useState<string | null>(null);

  const accessToken = useAppSelector(selectAccessToken);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const savedToken = window.localStorage.getItem(TOKEN);
    setToken(savedToken);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const payload = await logout(token || accessToken).unwrap();
      window.localStorage.removeItem(TOKEN);
      router.push("/sign-in");
    } catch (error) {
      console.error("rejected", error);
    }
    setIsOpen(false);
  }, [accessToken, logout, router, token]);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center text-white focus:outline-none"
        onClick={handleToggle}
      >
        <Image
          src="https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
          alt="Unknown User"
          className="w-8 h-8 rounded-full mr-2"
          width="0"
          height="0"
        />

        <svg
          className="w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 0 1-1V4a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1zm-5.707-.293a1 1 0 1 0 1.414 1.414L8 9.414V17a1 1 0 1 0 2 0V9.414l2.293 2.293a1 1 0 1 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          <button
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
