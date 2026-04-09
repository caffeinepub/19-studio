import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { PageLoader } from "./components/ui/LoadingSpinner";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const BookPage = lazy(() => import("./pages/Book"));
const ConfirmPage = lazy(() => import("./pages/Confirm"));
const AdminPage = lazy(() => import("./pages/Admin"));

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

// Child routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  component: BookPage,
});

const confirmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book/confirm",
  component: ConfirmPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  bookRoute,
  confirmRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
