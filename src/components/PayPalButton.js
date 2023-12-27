import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalButtonComponent({precio, onPaymentSuccess}) {
  const handleApprove = (data, actions) => {
    // Aquí puedes realizar acciones adicionales si es necesario
    console.log("Transaction approved:", data);
    onPaymentSuccess && onPaymentSuccess(data);
    // Una vez que tengas el orderID, puedes realizar una llamada a tu backend
    // para confirmar la transacción y realizar acciones adicionales, como eliminar un producto.
    // Por ejemplo:
    // axios.post("/confirmar-transaccion", { orderId: data.orderID });
  };
  return (
    <PayPalScriptProvider options={{ "client-id": "AR1QAEpyauNJRmp8xvqn_NibqK_0yYbKodvFPax4QaDQHShuBkmUkGkKj2TXHOblwaVAlBsIohGU5q-E", 
    currency: "EUR"}}>
      <PayPalButtons style={{ shape: "pill", layout: "horizontal"}} createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: precio,
                currency_code: "EUR", 
              },
            },
          ],
        });
      }} 
      onApprove={handleApprove}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButtonComponent;