import Sidebar from '../Sidebar'


function Editcustomer() {
  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className='mb-2'>
          <label htmlFor="username">Search Product: </label>
          <input
            type="search"
            id="username"
            placeholder='Enter product' />
        </div>
      </div>
    </>

  )
}

export default Editcustomer