import { createBrowserRouter, redirect } from "react-router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { HotelDetails } from "./pages/HotelDetails";
import { BookingForm } from "./pages/BookingForm";
import { Payment } from "./pages/Payment";
import { BookingConfirmation } from "./pages/BookingConfirmation";
import { MyBookings } from "./pages/MyBookings";
import { BookingDetails } from "./pages/BookingDetails";
import { AmendBooking } from "./pages/AmendBooking";
import { CancelBooking } from "./pages/CancelBooking";
import { Profile } from "./pages/Profile";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AddRoom } from "./pages/admin/AddRoom";
import { UpdateRoom } from "./pages/admin/UpdateRoom";
import { NotFound } from "./pages/NotFound";
import { isAuthenticated } from "./utils/auth";

const requireAuth = () => (isAuthenticated() ? null : redirect("/"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/home",
    loader: requireAuth,
    Component: Home,
  },
  {
    path: "/search",
    loader: requireAuth,
    Component: Search,
  },
  {
    path: "/hotel/:id",
    loader: requireAuth,
    Component: HotelDetails,
  },
  {
    path: "/booking/:hotelId",
    loader: requireAuth,
    Component: BookingForm,
  },
  {
    path: "/payment/:bookingId",
    loader: requireAuth,
    Component: Payment,
  },
  {
    path: "/confirmation/:bookingId",
    loader: requireAuth,
    Component: BookingConfirmation,
  },
  {
    path: "/my-bookings",
    loader: requireAuth,
    Component: MyBookings,
  },
  {
    path: "/booking-details/:bookingId",
    loader: requireAuth,
    Component: BookingDetails,
  },
  {
    path: "/amend-booking/:bookingId",
    loader: requireAuth,
    Component: AmendBooking,
  },
  {
    path: "/cancel-booking/:bookingId",
    loader: requireAuth,
    Component: CancelBooking,
  },
  {
    path: "/profile",
    loader: requireAuth,
    Component: Profile,
  },
  {
    path: "/admin",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/add-room",
    Component: AddRoom,
  },
  {
    path: "/admin/update-room/:roomId",
    Component: UpdateRoom,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
