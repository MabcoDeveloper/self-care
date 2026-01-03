import React, {useEffect, useState} from 'react'
import Titel from '../components/Titel';
import { UseAppContext } from '../context/AppContext'
import { dummyOrdersData } from '../assets/data';
const Orders = () =>
{
  const { user, currency } = UseAppContext();
  const [ orders, setOrders ] = useState( [] )
  
  const loadOrdersData = () =>
  {
    setOrders(dummyOrdersData)
  }

  useEffect( () =>
  {
    if ( user )
    {loadOrdersData()}
  },[user])
  return (
    <div className='mac-padd-container py-16 pt-25 bg-primary px-5'>
      <Titel titel1={"Delivery"} titel2={"Information"} titelStyles={"pb-10"} />
      {orders.map( ( order ) => (
        <div key={order._id} className='mb-5 bg-white p-2 rounded-2xl'>
          {/*Order Items*/}
          {order.items.map( ( item, idx ) => (
            <div key={idx} className='text-gray-700 flex flex-col lg:flex-row gap-4 mb-5'>
              <div className='flex flex-[2] gap-x-3'>
                <div className='flexCenter bg-primary rounded-xl'><img src={item.product.image[ 0 ]} alt="" className='max-h-20 max-w-20 object-contain' /></div>
                <div className='block w-full'>
                  <h5 className="h5 uppercase text-secondary line-clamp-1">{item.product.title}</h5>
                <div className='flex flex-wrap gap-3 max-sm:gap-y-1 mt-1'>
                  <div className='Price flex items-center gap-x-2'>
                    <h5 className='medium-14'>Price:</h5>
                    <p className='orederp medium-14'>{currency}{ item.product.price[item.size]}</p>
                  </div>
                  <div className='Quantity flex items-center gap-x-2'>
                    <h5 className='medium-14'>Quantity:</h5>
                    <p className='orederp medium-14'>{ item.quantity}</p>
                  </div>
                  <div className='Size flex items-center gap-x-2'>
                    <h5 className='medium-14'>Size:</h5>
                    <p className='orederp medium-14'>{item.size}</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          ) )}
          {/*Summary*/}
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-300 pt-3'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-x-2'>
                <h5 className='medium-14'>Order ID:</h5>
                <p className="text-grey-400 text-xs break-all orederp">{order._id}</p>
              </div>
              <div className='flex gap-4'>
                <div className='payment flex items-center gap-2'>
                  <h5 className='medium-14'>Payment Status:</h5>
                  <p className="text-grey-400 text-xs break-all orederp">{order.isPaid ? "Done" : "Pending"}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Method:</h5>
                  <p className="text-grey-400 text-xs break-all orederp">{order.paymentMethod}</p>
                </div>
              </div>
                <div className='flex gap-4'>
                  <div className='date flex items-center gap-2'>
                    <h5 className='medium-14'>Date:</h5>
                    <p className="text-grey-400 text-xs break-all orederp">{new Date(order.createdAt).toDateString()}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <h5 className='medium-14'>Amount:</h5>
                    <p className="text-grey-400 text-xs break-all orederp">{ currency}{order.amount}</p>
                  </div>
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex items-center gap-2'>
                <h5 className='medium-14'>Status:</h5>
                <div className='flex items-center gap-2'>
                  <span className='min-w-2 h-2 rounded-full bg-green-500' />
                  <p className='orederp medium-14'>{order.status}</p>
                </div>
              </div>
              <button className='btn-secondary !py-1 !text-xs rounded-sm'>Track Order</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
