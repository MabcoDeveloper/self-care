import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { UseAppContext } from '../context/AppContext';
import { dummyAddress } from '../assets/data';

const CartTotal = () =>
{
  
  const { navigate, currency, method, setMethod, delivery, cartCount, getCartAmount } = UseAppContext()

  const [ addresses, setAddresses ] = useState( dummyAddress )
  const [ showAddress, setShowAddress ] = useState( false )
  const [selectAdress, setSelectAdress ] = useState (dummyAddress[0])
  return (
    <div className='cartTotalSide pt-1'>
      <h3 className='bold-24'>Order Details
        <span className='regular-15 text-white bg-secondary rounded-full px-1 ml-1'>{cartCount()} Items</span>
      </h3>
      <hr className='border-gray-300 my-5' />
      {/* Payment and Addresses */}
      <div className='mb-5'>
        <div className='my-5'>
          <h4 className='h4 mb-3'>Where to ship you order?</h4>
          <div className='adress relative flex justify-between items-start mt-2'>
            {/* Show Address */}
            <p className='orederp'>{selectAdress ? `${ selectAdress.street }, ${ selectAdress.city }, ${ selectAdress.country }` : "No Address Found"}</p>

            {/* Change Address */}
            <button onClick={() => { setShowAddress(!showAddress)}} className='mt-0 btn-change-add bold-14 btn-secondary'>Change</button>
            {showAddress && (
              <div className='absolute top-11 py-2 bg-white ring-1 ring-slate-900/10 text-sm w-full mb-1'>
                {addresses.map( ( address, index ) =>
                  <p className='orederp cursor-pointer px-2 hover:bg-gray-100 medium-14 mb-1 ch-address' key={index}
                  onClick={() => { setSelectAdress( address ); setShowAddress( false ); }} >{address.street},{address.city},{address.country}</p>
                  )
                }
                <p onClick={() => { navigate( '/address-form' ); scrollTo(0,0)}} className='text-center orederp cursor-pointer ml-1 mt-1 hover:bg-gray-100 ch-address'>Add Address</p>
              </div>
            )}
          </div>
        </div>
        {/* Payment Methods */}
        <hr className='border-gray-300 mt-5' />
        <div className='payment method mt-5'>
          <h4 className='h4 mb-5'>payment method</h4>
          <div className='methods flex gap-3'>
            <div onClick={() => { setMethod( "COD" ); }} className={`${method === "COD" ? "btn-secondary" : "btn-outline"}`}>cash on delivery</div>
            <div onClick={() => { setMethod( "stripe" ); }} className={`${method === "stripe" ? "btn-secondary" : "btn-outline"}`}>Stripe</div>
          </div>
          <hr className='border-gray-300 mt-5' />
        </div>
        {/* Price */}
        <div className='total mt-4 space-y-2'>
          <div className='flex justify-between'>
            <h5 className='h5'>Price</h5>
            <p className="font-bold">{currency}{ getCartAmount()}</p>
          </div>
          <div className='flex justify-between'>
            <h5 className='h5'>Shipping  Fees</h5>
            <p className="font-bold">{currency}{ getCartAmount() === 0? "0.00" : `${delivery}.00`}</p>
          </div>
          <div className='flex justify-between'>
            <h5 className='h5'>Taxes</h5>
            <p className="font-bold">{currency}{getCartAmount() * 0.02}</p>
          </div>
          <div className='flex justify-between text-lg mt-3'>
            <h5 className='h4'>Total Amount:</h5>
            <p className="h4 font-bold text-secondary">{currency}{getCartAmount() === 0? "0.00" : getCartAmount() + delivery + getCartAmount() * 0.02}</p>
          </div>
        </div>
        <button className='btn-dark w-full mt-8 rounded-md'>procced to order</button>
      </div>
    </div>
  )
}

export default CartTotal
