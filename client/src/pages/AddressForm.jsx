import React, {useState, useEffect, useContext} from 'react'
import CartTotal from '../components/CartTotal'
import Titel from '../components/Titel'
import toast from 'react-hot-toast'
import { UseAppContext } from '../context/AppContext'


const AddessForm = () =>
{
  const { navigate, method, setMethod } = UseAppContext()
  const [ address, setAddress ] =
    useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      zipcode: "",
      country: "",
      phone: "",
    }
  )

  return (
    <div className='max-padd-container py-16 pt-28 bg-primary'>
      {/*Container*/}
      <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
        {/*Left Side*/}
        <form action="" className='flex flex-[2] flex-col gap-3 text-[95%]'>
          <Titel titel1={"Delivery"} titel2={"Information"} titelStyles={"pb-6"} />
            <div className='flex gap-3'>
              <input value={address.firstName} name='firstName' type='text' placeholder='First Name'  className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input ms:block' />
              <input value={address.lastName} name='lastName' type='text' placeholder='Last Name'   className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input' />
            </div>
            <input value={address.email} name='email' type='Email' placeholder='Email' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-full add-input' />
            <input value={address.phone} name='Phone' type='text' placeholder='Phone Number' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-full add-input' />
            <input value={address.street} name='Street' type='text' placeholder='Street' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-full add-input' />
            <div className='flex gap-3'>
              <input value={address.city} name='City' type='text' placeholder='City' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input' />
              <input value={address.zipcode} name='Zipcode' type='text' placeholder='Zip Code' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input' />
            <input value={address.country} name='country' type='text' placeholder='country' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input' />
            </div>
            <button type='submit' className='btn-dark rounded-sm w-full mt-2' >Add Address</button>
          
        </form>
        {/*right side*/}
          <div className='right-side flex flex-1 flex-col'>
            <div className='p-4 bg-white rounded-xl'>
              <CartTotal />
            </div>
          </div>
      </div>
    </div>
  )
}

export default AddessForm
