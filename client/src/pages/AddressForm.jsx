import React, {useState, useEffect, useContext} from 'react'
import CartTotal from '../components/CartTotal'
import Titel from '../components/Titel'
import toast from 'react-hot-toast'
import { UseAppContext } from '../context/AppContext'

const AddessForm = () =>
{
  const { navigate, user, isSignedIn, getToken ,axios } = UseAppContext()
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
    const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setAddress((data)=> ({...data, [name]: value}))
      //console.log(address)

    }

    const onSubmitHandler = async(e) => {
      e.preventDefault()
      if (!isSignedIn || !user) {
        toast.error("Please sign in to add an address");
        navigate('/cart');
        return;
      }
      try {
      // Build payload that matches server Address schema
      const payload = {
        name: `${address.firstName} ${address.lastName}`.trim(),
        phone: address.phone,
        street: address.street,
        city: address.city,
        pincode: address.zipcode,
        country: address.country || "",
      }

      // Basic client-side validation for required fields
      if (!payload.name || !payload.phone || !payload.street || !payload.city || !payload.pincode) {
        toast.error('Please fill all required fields');
        return;
      }

      // Only add Authorization header when token is available
      const headers = {};
      try {
        const token = await getToken();
        if (token) headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        // ignore: getToken will throw when unauthenticated, we already guard above
      }

      const { data } = await axios.post("/api/addresses/add", { address: payload },{ headers });
      if (data.success) {
        toast.success(data.message)
        navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {

      toast.error(error.message)
    }
    }

    useEffect(()=> {
      if(!isSignedIn) {
          navigate('/cart')
      }
    }, [isSignedIn,navigate])
  return (
    <div className='max-padd-container py-16 pt-28 bg-primary'>
      {/*Container*/}
      <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
        {/*Left Side*/}
        <form onSubmit={onSubmitHandler} action="" className='flex flex-[2] flex-col gap-3 text-[95%]'>
          <Titel titel1={"Delivery"} titel2={"Information"} titelStyles={"pb-6"} />
            <div className='flex gap-3'>
              <input onChange={onChangeHandler} value={address.firstName} name='firstName' type='text' placeholder='First Name'  className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input' />
              <input onChange={onChangeHandler} value={address.lastName} name='lastName' type='text' placeholder='Last Name'   className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input' />
            </div>
            <input onChange={onChangeHandler} value={address.email} name='email' type='Email' placeholder='Email' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-full add-input' />
            <input onChange={onChangeHandler} value={address.phone} name='phone' type='text' placeholder='Phone Number' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-full add-input' />
            <input onChange={onChangeHandler} value={address.street} name='street' type='text' placeholder='Street' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-full add-input' />
            <div className='flex gap-3'>
              <input onChange={onChangeHandler} value={address.city} name='city' type='text' placeholder='City' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input' />
              <input onChange={onChangeHandler} value={address.zipcode} name='zipcode' type='text' placeholder='Zip Code' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input' />
            <input onChange={onChangeHandler} value={address.country} name='country' type='text' placeholder='country' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm w-1/2 add-input' />
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
