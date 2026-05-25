import { useOrders } from '../../context/OrdersContext'
import { useNavigate } from "react-router-dom"
import TitleBar from "../../componenets/TitleBar"

function OrderCard({ orderId, placedTime, items, status }) {

    const navigate = useNavigate()

    const totalPrice = items.reduce((total, item) =>
        total + item.unit_price * item.quantity, 0
    )

    const orderItems = items.map(item =>
        <div key={item.product_id} onClick={() => navigate(`/product/${item.product_id}`)} className="flex gap-2 cursor-pointer">
            <p className="text-xs text-secondary line-clamp-1 w-3/5">{item.title} x {item.quantity}</p>
            <p className="text-xs text-secondary ml-auto">{item.unit_price.toFixed(2)} LKR</p>
        </div>)

    let className = ''
    const orderStatus = status

    switch (orderStatus) {
        case 'delivered':
            className = 'text-green-600 border-green-300 bg-green-50';
            break;
        case 'pending':
            className = 'text-yellow-500 border-yellow-300 bg-yellow-50';
            break;
        case 'shipped':
            className = 'text-blue-500 border-blue-300 bg-blue-50';
            break;
        case 'cancelled':
            className = 'text-red-400 border-red-300 bg-red-50';
            break;
        default:
            className = 'text-neutral-500 border-neutral-400 bg-neutral-100'
            break;
    }

    return (
        <div className="flex flex-col px-5 py-3 outfit h-fit bg-accent/40 border border-secondary/20 rounded-[3px]">
            <div className="flex justify-between">
                <h6 className="text-sm font-medium text-primary">{orderId}</h6>
                <p className={`text-[10px] nunito font-bold border ${className} px-3 py-0.5 rounded-full select-none`}>{status.charAt(0).toUpperCase() + status.slice(1)}</p>
            </div>

            <p className="text-xs text-secondary/80">{placedTime}</p>

            <div className="flex flex-col mt-2">
                {orderItems}
            </div>

            <hr className="text-secondary/20 my-2" />

            <div className="flex justify-between">
                <label className="text-xs text-secondary">Total</label>
                <p className="text-xs text-primary">{totalPrice.toFixed(2)} LKR</p>
            </div>

        </div >
    )
}

function MyOrders() {

    const { orders, loading } = useOrders()

    const orderList = orders.map(order => (<OrderCard key={order.order_id} orderId={order.order_id} placedTime={order.placed_at} items={order.items} status={order.status} />))

    return (
        <div>
            <div>
                <TitleBar firstText={'Order'} secText={'History'} showLine />
            </div>

            <div className="flex flex-col gap-3 my-4">
                {orderList}
            </div>
        </div>
    )
}
export default MyOrders