import Sidebar from '../Sidebar'


function Deleteorder() {
  return (
    <>
      <Sidebar />
      <div className="Content">
        <div className='mb-2'>
          <label htmlFor="username">Search: </label>
          <input
            type="search"
            id="username"
            placeholder='Enter Customer or store' />
        </div>
      </div>
    </>
  )
}

export default Deleteorder