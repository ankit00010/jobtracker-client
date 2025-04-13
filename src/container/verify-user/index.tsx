"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyContainer = () => {
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.push("/");
      setLoading(false);
    } else {
      router.push("/login");
      setLoading(false);
      alert("Failed to Login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading && (
        <div className="verify-user-container">
          <span>Verifying....</span>
        </div>
      )}
    </>
  );
};

export default VerifyContainer;
