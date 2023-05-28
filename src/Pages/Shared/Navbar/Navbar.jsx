import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => console.log(error))

    }

    const navOptions = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/menu'}>Our menu</Link></li>
        <li><Link to={'/order/salad'}>OUR SHOP</Link></li>
        <li><Link to={'/secret'}>secret</Link></li>
        <li>
            <Link>
                <button className="btn gap-2">
                    <FaShoppingCart/>
                    <div className="badge badge-secondary">+{cart.length || 0}</div>
                </button>
            </Link>
        </li>


        {
            user ? <li><button onClick={handleLogOut} className="btn-ghost btn my-auto">LogOut</button></li>
                :
                <li><Link to={'/login'}>Login</Link></li>
        }

    </>


    return (
        <div className="fixed z-10 bg-opacity-30 text-white bg-black max-w-screen-xl navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className=" btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className=" uppercase menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">

                        {navOptions}
                    </ul>
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold">Bistro Boss</h1>
                    <h2 className="text-xl font-bold tracking-[7px] leading-3">Restaurant</h2>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 uppercase">

                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Get started</a>
            </div>
        </div>
    );
};

export default Navbar;