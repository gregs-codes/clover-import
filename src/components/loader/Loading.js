import '../../Kiosk.scss';

const Loading = () => {
    return (
      <div className="kiosk-view">
        <header className="top-menu">
          <h1 className="logo">My Kiosk</h1>
          <div className="cart-container">
            Cart
          </div>
        </header>
        <div className="category">
          <h2 className="category-heading">Loading</h2>
          <div className="item-grid">
            <div className="item">
              <img src={`https://source.unsplash.com/200x200/?circle`} className="item-image skeleton" />
              <h3 className="item-name skeleton">&nbsp;</h3>
              <p className="item-description skeleton">&nbsp;</p>
              <p className="item-price skeleton">&nbsp;</p>
              <button className="add-to-cart-button skeleton" />
            </div>
            <div className="item">
              <img src={`https://source.unsplash.com/200x200/?circle`} className="item-image skeleton" />
              <h3 className="item-name skeleton">&nbsp;</h3>
              <p className="item-description skeleton">&nbsp;</p>
              <p className="item-price skeleton">&nbsp;</p>
              <button className="add-to-cart-button skeleton" />
            </div>
          </div>
        </div>
        <div className="category">
          <h2 className="category-heading">Loading</h2>
          <div className="item-grid">
            <div className="item">
              <img className="item-image skeleton" />
              <h3 className="item-name skeleton">&nbsp;</h3>
              <p className="item-description skeleton">&nbsp;</p>
              <p className="item-price skeleton">&nbsp;</p>
              <button className="add-to-cart-button skeleton" />
            </div>
            <div className="item">
              <img className="item-image skeleton" />
              <h3 className="item-name skeleton">&nbsp;</h3>
              <p className="item-description skeleton">&nbsp;</p>
              <p className="item-price skeleton">&nbsp;</p>
              <button className="add-to-cart-button skeleton" />
            </div>
          </div>
        </div>
      </div>
      )
  }
export default Loading;