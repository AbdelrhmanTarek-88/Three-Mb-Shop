import { Container, Table, Button } from "react-bootstrap";
import { useOrder } from "../../state/hooks";
const Orders = () => {
  const { orders } = useOrder();
  return (
    <Container>
      <h2 className="mb-4 fw-bold fs-3 text-dark">Orders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <Button variant="danger">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default Orders;
