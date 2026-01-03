import React, { useState } from 'react'
import Titel from '../components/Titel'
import CartTotal from '../components/CartTotal'
import { UseAppContext } from '../context/AppContext'
import { DummyProducts } from '../assets/data'
import { useEffect } from 'react';
const Cart = () =>
{
    const {navigate, products, currency, cartItems, updateQuantity, getCartAmount} = UseAppContext();
    const [ cartInfo, setCartInfo ] = useState( [] );
    useEffect( () =>
    {
        if ( products.length > 0 )
        {
            const proData = [];
            for ( const itemId in cartItems )
            {
                for ( const size in cartItems[ itemId ] )
                {
                    if ( cartItems[ itemId ][ size ] > 0  )
                    {
                        proData.push( {
                            _id: itemId,
                            size: size
                        } );
                    }
                }
            }
            setCartInfo( proData )
        }
    }, [products, cartItems] );

    /*increment and decrement buttns*/
    /*increment btn*/
    const increment = ( id, size ) =>
    {
        const currentQuantity = cartItems[ id ][ size ]
        updateQuantity(id,size,currentQuantity + 1)
    }

    /*decrement btn*/
    const decrement = ( id, size ) =>
    {
        let sizet = size
    const currentQuantity = cartItems[id][sizet]
        if ( currentQuantity > 1 )
        {   
            updateQuantity(id,size,currentQuantity - 1 )
        }
    }
    /*cart page content*/
    return products && cartItems ?(
        
        <div className='max-padd-container py-16 pt-8 bg-primary cat-items gap-x-3 mt-25 pl-8 '>
            <div className='left-side flex flex-col xl:flex-row gap-20 xl:gap-28'>
                
                {/*left side*/}
                <div className='flex flex-[2] flex-col gap-3 text-[95%]'>
                    <Titel titel1={"Cart"} titel2={"Details"} titelStyles={"pb-6"} />
                    <div className='product-details grid grid-cols-[6fr_2fr_1fr] font-medium bg-white p-2'>
                        <h5 className='h5 text-left'>Product details</h5>
                        <h5 className='h5 text-center'>Subtotal</h5>
                        <h5 className='h5 text-center'>Action</h5>
                    </div>
                    {cartInfo.map( ( item, i ) =>
                    {
                        // Find the product using the ID key
                        const product = products.find( ( product ) => product._id === item._id ) 
                        // Get quantity 
                        const quantity = cartItems[item._id][item.size]
                        return (
                        <div key={i} className='grid grid-cols-[6fr_2fr_1fr] items-center bg-white p-2'>
                            <div className='flex items-center md:gap-6 gap-3 '>
                                <div className='product-image flex bg-primary rounded-xl'>
                                    <img src={product.image[ 0 ]} alt="" width={120} />
                                </div>
                            <div>
                                <h5 className='sm:block hidden h5 line-clamp-1'>{product.title}</h5>
                                <div className='flexStart gap-2 mb-4'>
                                            <h5 className='bold-14'>Size:</h5>
                                            <p className='para bold-14'>{item.size}</p>
                                </div>
                                <div className='flexBetween'>
                                    <div className='flex items-center ring-1 ring-slate-900/15 rounded-full overflow-hidden bg-primary'>
                                        <button onClick={()=>{decrement(item._id, item.size)}} className='btn-cart'>-</button>
                                            <p className='px-2'>{ quantity}</p>
                                        <button onClick={()=>{increment(item._id, item.size)}} className='btn-cart'>+</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className='price text-center bold-16'>
                                {currency}{product.price[item.size] * quantity}.00 
                            </div>
                            <button onClick={() => updateQuantity( item._id, item.size, 0 )}                className='cart-remove cursor-pointer ml-5'>
                                <svg class="red-trash-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </div>)
                    })}
                </div>
                {/*right side*/}
                <div className='right-side flex flex-1 flex-col'>
                    <div className='p-4 bg-white rounded-xl'>
                        <CartTotal />
                    </div>
                </div>
            </div>
        </div>) : null;
}

export default Cart
