"use client";
import React, { useState, Suspense } from "react";
const Dashboard = React.lazy(() => import("@/components/Dashboard"));
function Page(): React.JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </Suspense>
    </div>
  );
}

export default Page;
