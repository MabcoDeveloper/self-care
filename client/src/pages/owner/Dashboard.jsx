import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../../context/AppContext'
import { assets } from '../../assets/data';
import toast from 'react-hot-toast'
import { Outlet } from 'react-router-dom';
function Dashboard() {
    const { user, currency, axios, getToken } = UseAppContext();
    const [dashboardData, setDashboardData] = useState({
        orders: [],
        totalOrders: 0,
        totalRevenue: 0,
    })

    const getDashboardData = async () => {
        try {
            const { data } = await axios.post('/api/orders/', {}, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            if (data.success) {
                setDashboardData(data.dashboardData);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const { data } = await axios.post('/api/orders/status', { orderId, status: event.target.value }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            if (data.success) {
                await getDashboardData()
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            getDashboardData()
        }
    }, [user])
    return (
        <div className='px-2 py-2 sm:px-6 m-2 h-[97vh] bg-primary overflow-y-scroll  lg:w-11/12 shadow rounded-xl'>
            <div className='grid grid-cols-2 gap-4'>
                <div className='gap-7 p-5 bg-[#eb8a9cbb] lg:min-w-56 rounded-xl ml-2 flexStart'>
                    <img src={assets.graph} alt="" className='hiddensm:flex w-8' />
                    <div className=''>
                        <h4 className='h4'>{dashboardData?.totalOrders?.toString().padStart(2, "0")}</h4>
                        <h5 className='h5 text secondary'>Total Sales</h5>
                    </div>
                </div>
                <div className='gap-7 p-5 bg-[#eb8a9cbb] lg:min-w-56 rounded-xl mr-2 flexStart'>
                    <img src={assets.dollar} alt="" className='lg:block sm:hidden  w-8' />
                    <div className=''>
                        <h4 className='h4 '>{currency}{dashboardData?.totalRevenue || 0}</h4>
                        <h5 className='h5 text secondary'>Total Earnings</h5>
                    </div>
                </div>
            </div>
            {/*All Sales And Orders */}
            <div className=' bg-primary mt-6'>
                {dashboardData.orders.map((order) => (
                    <div key={order._id} className='bg-white p-4 mb-4 rounded-2xl shadow-sm'>
                        {/*Products List*/}
                        {/*Order Items*/}
                        {order.items.map((item, idx) => (
                            <div key={idx} className='text-gray-700 flex flex-col lg:flex-row gap-4 mb-5 items-start'>
                                <div className='flex flex-[2] gap-x-3'>
                                    <div className='flexCenter bg-primary rounded-xl p-2'><img src={item.product?.image?.[0] || ''} alt="" className='max-h-20 max-w-20 object-contain' />
                                    </div>
                                    <div className='block w-full'>
                                        <h5 className="h5 uppercase text-secondary line-clamp-1">{item.product?.title}</h5>
                                        <div className='flex flex-wrap gap-3 max-sm:gap-y-1 mt-1'>
                                            <div className='Price flex items-center gap-x-2'>
                                                <h5 className='medium-14'>Price:</h5>
                                                <p className='orederp medium-14'>{currency}{(item.product?.price && (item.product.price[item.size] ?? item.product.price.get?.(item.size))) || 0}</p>
                                            </div>
                                            <div className='Quantity flex items-center gap-x-2'>
                                                <h5 className='medium-14'>Quantity:</h5>
                                                <p className='orederp medium-14'>{item.quantity}</p>
                                            </div>
                                            <div className='Size flex items-center gap-x-2'>
                                                <h5 className='medium-14'>Size:</h5>
                                                <p className='orederp medium-14'>{item.size}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-300 pt-3'>
                                <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-x-2'>
                                    <h5 className='medium-14'>Order ID:</h5>
                                        <p className="text-grey-400 text-xs break-all orederp">{order._id}</p>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='payment flex items-center gap-2'>
                                        <h5 className='medium-14'>Customer:</h5>
                                        <p className="text-grey-400 text-xs break-all orederp">{order.address?.name || `${order.address?.firstName || ''} ${order.address?.lastName || ''}`.trim()}</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <h5 className='medium-14'>Phone:</h5>
                                        <p className="text-grey-400 text-xs break-all orederp">{order.address?.phone}</p>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='date flex items-center gap-2'>
                                        <h5 className='medium-14'>Address:</h5>
                                        <p className="text-grey-400 text-xs break-all orederp">{order.address?.street}, {order.address?.city}, {order.address?.state || order.address?.state}, {order.address?.pincode || order.address?.zipCode || ''}</p>
                                    </div>
                                  
                                </div>
                                  <div className='flex items-center gap-2'>
                                        <h5 className='medium-14'>Payment Status:</h5>
                                        <p className="text-grey-400 text-xs break-all orederp">{order.isPaid ? "Done" : "Pending"}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <h5 className='medium-14'>Payment Method:</h5>
                                        <p className="text-grey-400 text-xs break-all orederp">{order.PaymentMethod || order.paymentMethod}</p>
                                    </div>
                            </div>
                            <div className='flex flex-col gap-2'>

                            <div className='flex gap-4'>
                                <div className='flex items-center gap-2'>
                                    <h5 className='medium-14'>Date:</h5>
                                    <p className="text-grey-400 text-xs break-all orederp">{new Date(order.createdAt).toDateString()}</p>
                                </div>
                            </div>
                            <div className='flex gap-4'>

                                <div className='flex items-center gap-2'>
                                    <h5 className='medium-14'>Amount:</h5>
                                    <p className="text-grey-400 text-xs break-all orederp">{currency}{order.amount}</p>
                                </div>
                            </div>
                            </div>

                            <div className='flex gap-3'>
                                <div className='flex items-center gap-2'>
                                    <h5 className='medium-14'>Status:</h5>
                                    {/* <div className='flex items-center gap-2'>
                                    <span className='min-w-2 h-2 rounded-full bg-green-500' />
                                    <p className='orederp medium-14'>{order.status}</p>
                                </div> */}
                                    <select className='border border-gray-300 rounded-sm' value={order.status} onChange={(event) => statusHandler(event, order._id)}>
                                        <option value="Order Placed">Order Placed</option>
                                        <option value="Packing">Packing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                                <button className='btn-secondary !py-1 !text-xs rounded-sm'>Track Order</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
