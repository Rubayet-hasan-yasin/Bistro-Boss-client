const MenuItem = ({item}) => {
    const {image, price, name, recipe} = item;
    return (
        <div className="flex space-x-2">
            <img className="w-[120px] h-[105px] rounded-ss-sm rounded-full" src={image} alt="" />

            <div>
                <h3 className="uppercase">{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">{price}</p>
        </div>
    );
};

export default MenuItem;