import { NavLink, Outlet } from "react-router-dom";
import { FaCalendarAlt, FaFolder, FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";
import useCart from "../hooks/useCart";


const Dashboard = () => {
    const [cart] = useCart()
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex  justify-center">
                {/* <!-- Page content here --> */}

                <Outlet />


                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[#D1A054]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-[#D1A054] text-base-content">

                    {/* <!-- Sidebar content here --> */}
                    <li><NavLink to={'/dashboard/home'}><FaHome />User Home</NavLink></li>

                    <li><NavLink to={'/dashboard/reservations'}><FaCalendarAlt />Reservations</NavLink></li>

                    <li><NavLink to={'/dashboard/history'}><FaWallet />Payment History</NavLink></li>

                    <li>
                        <NavLink to={'/dashboard/mycart'}><FaShoppingCart />My Cart
                            <div className="badge badge-secondary">+{cart.length || 0}</div>
                        </NavLink>
                    </li>

                    <div className="divider"></div>

                    <li><NavLink to={'/'}><FaHome />home</NavLink></li>
                    <li><NavLink to={'/'}><FaFolder />Our Menu</NavLink></li>
                    <li><NavLink to={'/'}><FaWallet />Order Food</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;