function CartItem({ item, onUpdate, onRemove }) {
  return (
    <li>
      Product {item.product_id} - Quantity {item.quantity}
      <button onClick={() => onUpdate(item.quantity + 1)}>+</button>
      <button
        onClick={() => onUpdate(item.quantity - 1)}
        disabled={item.quantity <= 1}
      >
        -
      </button>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
}

export default CartItem;
