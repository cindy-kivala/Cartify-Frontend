function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => onUpdate(item.id, item.quantity + 1)}>+</button>
      <button
        onClick={() =>
          item.quantity > 1
            ? onUpdate(item.id, item.quantity - 1)
            : onRemove(item.id)
        }
      >
        -
      </button>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}

export default CartItem;
