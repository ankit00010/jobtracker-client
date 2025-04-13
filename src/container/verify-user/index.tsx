"use client";
import React, { useEffect, useState, Suspense } from "react";
import "./style.css";
import { useRouter, useSearchParams } from "next/navigation";

// Create a client component that uses the hooks
const VerifyContent = () => {
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

// Create a loading fallback component
const LoadingFallback = () => (
  <div className="verify-user-container">
    <span>Loading...</span>
  </div>
);

// Main container component that wraps with Suspense
const VerifyContainer = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyContent />
    </Suspense>
  );
};

export default VerifyContainer;