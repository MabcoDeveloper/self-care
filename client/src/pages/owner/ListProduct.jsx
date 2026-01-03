import React from 'react'
import toast from 'react-hot-toast'
import { UseAppContext } from '../../context/AppContext'


function ListProduct ()
{
  
  const { products, currency } = UseAppContext()
  
  return (
    <div className='px-2 sm:px-6 py-12 m-2 h-[97vh] bg-primary overflow-y-scroll lg:w-11/12 rounded-xl'>
      <div className='flex flex-col gap-2 lg:w-11/12'>
        <div className='grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr] items-center py-4 px-2 bg-secondary text-white bold-14 sm:bold-15 rounded-xl mb-2'>
          <h5 className="h5">Image</h5>
          <h5 className="h5">Title</h5>
          <h5 className="h5">Category</h5>
          <h5 className="h5">Price</h5>
          <h5 className="h5">InStock</h5>
        </div>
        {/*Product List*/}
        {products.map( ( pro ) => (
          <div key={pro._id} className='grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr] items-center gap-2 p-2 bg-white rounded-lg'>
            <img src={pro.image[ 0 ]} className='w-12 bg-primary rounded' alt="" />
            <h5 className='text-sm font-semibold'>{pro.title}</h5>
            <p className='text-sm font-semibold'>{pro.category }</p>
            <div className='text-sm font-semibold'>From {currency}{pro.price[pro.size[0]]}</div>
            <div>
              <label className='relative inline-flex items-flex items-center cursor-pointer text-gray-900 gap-3'>
                <input type="checkbox" className='sr-only peer' defaultChecked={pro.inStock} />
                <div className='w-10 h-6 bg-slate-300 rounded-full peer peer-checked:bg-secondary transition-colors duration-200'/>
                <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'/>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListProduct
