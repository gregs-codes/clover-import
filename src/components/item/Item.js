import ItemModifiers from '../itemModifiers/ItemModifiers'   

import './Item.scss'


const Item = (props) => {
    const {itemsByCategoryId, formatPrice, handleAddToCart, modifier, setModifiers } = props
    return (
    <>
     {Object.entries(itemsByCategoryId).map(([categoryId, items]) => (
        <div key={categoryId} className="category">
        <h2 className="category-heading">{categoryId}</h2>
        <div className="item-grid">
            {items.map((item) => (
            <div key={item.id} className="item">
                <div>
                <p className="item-price">{formatPrice(item.price)}</p>
                <img src={`https://source.unsplash.com/200x200/?${item.name}`} alt={item.name} className="item-image" />
                </div>
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                {item.modifierGroups.elements[0]?.id &&
                <ItemModifiers
                    item={item}
                    setModifiers={setModifiers}
                    modifier={modifier}
                    modifierGroupId={item.modifierGroups?.elements[0]?.id} 
                />
                }

                <button onClick={() => handleAddToCart(item, modifier)} className="button btn third">
                Add to Cart
                </button>
            </div>
            ))}
        </div>
        </div>
    ))}
    </>
    )
}

export default Item;