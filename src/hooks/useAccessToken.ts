"use client";
import { useEffect, useState } from "react";

const useAccessToken = () => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/get-token", {
          credentials: "include", // Include cookies
        });

        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
        } else {
          setToken(""); // Token not available or expired
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
        setToken("");
      }
    };

    fetchToken();
  }, []); // Runs only once when the component mounts
  console.log(token);
  //   const loggedInUser = jwtDecode(token);
  return token;
};

export default useAccessToken;
