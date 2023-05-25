const FoodCard = ({item}) => {
    const {image, price, name, recipe} = item;
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
                    <button className="btn bg-slate-100 my-5 btn-outline border-b-4 border-0 border-orange-400">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;