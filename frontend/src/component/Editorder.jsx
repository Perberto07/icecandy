import Sidebar from '../Sidebar'


function Editorder() {
  return (
    <>
    <Sidebar/>
    <div className='Content'>
    <div className='mb-2'>
            <label htmlFor="username">Search: </label>
            <input
              type="search"
              id="product"
              placeholder='Enter store or Customer' />
          </div>
    </div>
    </>
  )
}

export default Editorder