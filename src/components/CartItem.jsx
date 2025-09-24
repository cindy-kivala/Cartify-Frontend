function CartItem({ item, onUpdate, onRemove }) {
  return (
    <li style={{ marginBottom: "10px" }}>
      <span>
        {item.name || `Product ${item.product_id}`} - ${item.price} x {item.quantity}
      </span>
      <button onClick={() => onUpdate(item, item.quantity + 1)}>+</button>
      <button
        onClick={() => onUpdate(item, item.quantity - 1)}
        disabled={item.quantity <= 1}
      >
        -
      </button>
      <button onClick={() => onRemove(item)}>Remove</button>
    </li>
  );
}

export default CartItem;
