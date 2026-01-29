import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "./layouts/app-layout";
import ProtectedRoute from "./components/protected-route";
import { ThemeProvider } from "./components/theme-provider";
import { BarLoader } from "react-spinners";

import "./App.css";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/landing"));
const Onboarding = lazy(() => import("./pages/onboarding"));
const PostJob = lazy(() => import("./pages/post-job"));
const JobListing = lazy(() => import("./pages/jobListing"));
const MyJobs = lazy(() => import("./pages/my-jobs"));
const SavedJobs = lazy(() => import("./pages/saved-jobs"));
const JobPage = lazy(() => import("./pages/job"));

const Loader = () => (
  <BarLoader width={"100%"} color="#36d7b7" />
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
