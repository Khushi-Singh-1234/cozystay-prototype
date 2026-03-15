import { createBrowserRouter } from "react-router";
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
    Component: Home,
  },
  {
    path: "/search",
    Component: Search,
  },
  {
    path: "/hotel/:id",
    Component: HotelDetails,
  },
  {
    path: "/booking/:hotelId",
    Component: BookingForm,
  },
  {
    path: "/payment/:bookingId",
    Component: Payment,
  },
  {
    path: "/confirmation/:bookingId",
    Component: BookingConfirmation,
  },
  {
    path: "/my-bookings",
    Component: MyBookings,
  },
  {
    path: "/booking-details/:bookingId",
    Component: BookingDetails,
  },
  {
    path: "/amend-booking/:bookingId",
    Component: AmendBooking,
  },
  {
    path: "/cancel-booking/:bookingId",
    Component: CancelBooking,
  },
  {
    path: "/profile",
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
