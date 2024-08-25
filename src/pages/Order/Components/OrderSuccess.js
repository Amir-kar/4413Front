import { Link } from "react-router-dom"

export const OrderSuccess = ({ data }) => {
    console.log(data);
    return (
        <section className="text-xl text-center max-w-4xl mx-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700 rounded">
            <div className="my-5">
                <p className="bi bi-check-circle text-green-600 text-7xl mb-5"></p>
                <p>Thank you {data.name} for order!</p>
            </div>
            <div className="my-5">
                <p>Your order is confirmed.</p>
                <p className="font-bold">Billing Information</p>
                <div><p>Name: {data.name}</p></div>
                <div>
                    <p className="font-bold">Card Information: </p>
                    <p>Card Number: {data.wallet.card}</p>
                    <p>Card Expiration: {data.wallet.month}/{data.wallet.year}</p>
                    <p>Card CVV: {data.wallet.cvv}</p>
                </div>
                <div>
                    <p className="font-bold">Billing Location: </p>
                    <p>Address: {data.location.address}</p>
                    <p>city: {data.location.city}</p>
                    <p>Country: {data.location.country}</p>
                </div>

                <p className="my-5">Payment ID: xyz_123456789</p>
            </div>
            <Link to="/products" type="button" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Continue Shopping <i className="ml-2 bi bi-cart"></i></Link>
        </section>
    )
}