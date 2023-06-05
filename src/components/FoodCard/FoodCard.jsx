import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { image, price, name, recipe, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();



    const handleAddtocart = item => {
        console.log(item);
        if (user && user.email) {
            const cartItem = {menuItemId: _id, name, image, price, email: user.email }
            fetch('https://bistro-boss-server-alpha.vercel.app/carts', {
                method: "POST",
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch()
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Food added on the cart',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to order the food',
                
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state:{from: location}})
                }
            })
        }
    }


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="">
                <img src={image} alt="Shoes" className="rounded-xl" />
                <p className="absolute right-5 top-5 bg-slate-900 rounded text-white px-2 py-1 text-sm">${price}</p>
            </figure>
            <div className="card-body items-center text-justify px-10">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddtocart(item)} className="btn bg-slate-100 my-5 btn-outline border-b-4 border-0 border-orange-400">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;