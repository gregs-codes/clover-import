import ItemModifiers from '../itemModifiers/ItemModifiers'   

import './Item.scss'


const Item = (props) => {
    const {itemsByCategoryId, handleAddToCart, modifier, setModifiers, formatCurrency } = props
    return (
    <>
     {Object.entries(itemsByCategoryId).map(([categoryId, items]) => (
        <div key={categoryId} className="category">
        <h2 className="category-heading">{categoryId}</h2>
        <div className="item-grid">
            {items.map((item) => (
            <div key={item.id} className="item">
                <div>
                <img src={`https://source.unsplash.com/200x200/?${item.name}`} alt={item.name} className="item-image" />
                </div>
                <p className="item-price">{formatCurrency(item.price/100)}</p>
                <p className="item-name">{item.name}</p>
                <p className="item-description">{item.description}</p>
                {item.modifierGroups.elements[0]?.id &&
                <ItemModifiers
                    formatCurrency={formatCurrency}
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