import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "./PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcel from "../pages/Dashboard/MyParcel";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/data/ServiceCenter.json"),
      },
      {
        path : "bearider",
        element: <PrivateRoute> <BeARider></BeARider> </PrivateRoute>,
        loader: () => fetch("/data/ServiceCenter.json"),
      },
      {
        path: "sendparcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/data/ServiceCenter.json"),
      },
      
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
      path: '/dashboard',
      element: <PrivateRoute> <DashBoardLayout /> </PrivateRoute>,
      children: [
          // Dashboard child routes go here
          {
              path: 'myparcels',
              Component: MyParcel,
          },
          {
             path: 'payment/:parcelId',
             Component: Payment,
          },
          {
            path: 'paymenthistory',
            Component: PaymentHistory
          },
          {
            path: 'track',
            Component: TrackParcel
          },
          {
            path: 'pending-riders',
            Component: PendingRiders,
          },
          {
            path: 'active-riders',
            Component: ActiveRiders,
          }
      ]
  },
], {
  // ✅ This is the key fix for your hydration warning
  hydrationOptions: {
    fallbackElement: <div className="text-center mt-20 text-lg">Loading...</div>,
  },
}
);
