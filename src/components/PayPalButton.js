import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalButtonComponent({precio,nombre}) {
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
      }} />
    </PayPalScriptProvider>
  );
}

export default PayPalButtonComponent;