import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import {
  ArrowRightEndOnRectangleIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import classNames from "../utils/styles.util";

const navigationList = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: ShoppingBagIcon,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Counter",
    href: "/dashboard/counter",
    icon: CalculatorIcon,
  },
];

function DashboardPage() {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-gray">
      {/** */}
      <div className="w-20 md:w-64 flex-shrink-0 transition-all duration-300">
        <div className="h-full flex flex-col bg-primary">
          <div className="flex items-center h-16 flex-shrink-0 px-4 py-10 bg-primary-dark">
            <div className="flex items-center w-full">
              <img
                className="h-8 w-8 rounded-full"
                src={user.profilePictureUrl}
                alt="Avatar"
              />
              <div className="ml-3 hidden md:block space-y-0.5">
                <p className="text-sm font-medium text-text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs font-medium text-text-white truncate">
                  {user.email}
                </p>
                <p className="text-xs font-medium text-yellow-400 uppercase tracking-wide mt-1">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex-col overflow-y-auto ">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigationList.map((items) => {
                const IconComponent = items.icon;
                return (
                  <NavLink
                    // end={items.href === location.pathname}
                    key={items.name}
                    to={items.href}
                    className={({ isActive }) => {
                      const dynamicClassName = isActive
                        ? "bg-primary-darker text-white "
                        : " text-text-gray hover:bg-primary-dark hover:text-text-white ";
                      // return (
                      //   dynamicClassName +
                      //   " group flex items-center px-2 py-2 text-sm font-medium rounded-md "
                      // );
                      return classNames(
                        dynamicClassName,
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      );
                    }}
                  >
                    <IconComponent className="mr-3 flex-shrink-0 h-6 w-6" />
                    <span className="hidden md:inline">{items.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 flex-col border-t border-primary-light p-4">
            <button
              onClick={logoutHandler}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md text-text-white 
              bg-primary-dark hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ArrowRightEndOnRectangleIcon className="mr-3 h-3 min-w-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto focus:outline-none">
        <main className="flex-1 relative z-0 overflow-y-auto py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {location.pathname === "/dashboard"
                ? "Home"
                : [...navigationList]
                    .reverse()
                    .find((item) => location.pathname.includes(item.href))
                    ?.name || "Not Found"}
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
