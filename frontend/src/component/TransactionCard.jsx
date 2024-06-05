import './css/TransactionCard.css';

function TransactionCard({ transaction }) {
  return (
    <div className="transaction-card">
      <div className="transaction-header">
        <h4>Transaction No: {transaction.transactionID}</h4>
        <p>Order No: {transaction.orderNo}</p>
      </div>
      <div className="transaction-body">
        <p><strong>Customer Name:</strong> {transaction.customerName}</p>
        <p><strong>Customer Address:</strong> {transaction.customerAddress}</p>
        <p><strong>Date:</strong> {transaction.date}</p>
        <p><strong>Sum:</strong> {transaction.sum}</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Flavor</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {transaction.orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.productFlavor}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionCard;
