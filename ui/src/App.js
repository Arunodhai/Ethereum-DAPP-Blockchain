import './App.css';
import { useState } from 'react';
import Modal from 'react-modal';


function App() {
  const [inputMsg, setinputMsg] = useState('');
  const [output, setOutput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  function msgHandler(event) {
    setinputMsg(event.target.value);
  }

  async function setValue() {
    const response = await fetch('http://localhost:8000/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputMsg }),
    });

    console.log(response);

    if (response.status === 201) {
      setModalContent('Success');
      setModalIsOpen(true);
    } else {
      setModalContent('Error');
      setModalIsOpen(true);
    }
  }

  async function getValue() {
    try {
      const response = await fetch('http://localhost:8000/read');

      if (response.status === 200) {
        const data = await response.json();
        setOutput(data);
      } else {
        setModalContent('Error');
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setModalContent('Error fetching data');
      setModalIsOpen(true);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-4xl font-bold mb-4'>Sample Dapp</h1>

      <div className='border border-gray-300 p-6 rounded-md mb-4 w-80 h-50 flex flex-col justify-between'>
        <div>
          <h2 className='text-xl mb-2'>Set Message</h2>
          <input
            onChange={msgHandler}
            type='text'
            className='block w-64 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4 transition-all duration-300 ease-in-out hover:shadow-md hover:border-indigo-500 focus:outline-none focus:ring focus:border-indigo-500'
            placeholder='Enter your Message'
          />
        </div>

        <button
          onClick={setValue}
          className='bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-green-500 hover:text-black focus:outline-none focus:ring focus:border-indigo-500'
        >
          Set
        </button>
      </div>

      <div className='border border-gray-300 p-6 rounded-md mb-4 w-80 h-50 flex flex-col justify-between'>
        <div>
          <h2 className='text-xl mb-2'>Get Message</h2>
          <p className="border border-gray-300 p-2 rounded-md text-center">
 {output}
</p>
<br></br>

        </div>

        
        
        <button
          onClick={getValue}
          className='bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-green-500 hover:text-black focus:outline-none focus:ring focus:border-indigo-500'
        >
          Get
        </button>
        
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel='Example Modal'
        style={{
          content: {
            width: '280px',
            height: '120px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          },
        }}
      >
        <div>
        <h2 className={`${modalContent === 'Success' ? 'text-green-500' : 'text-red-500'} text-lg`}>
  {modalContent}
</h2>
          <button
            className='mt-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-green-500 hover:text-black focus:outline-none focus:ring focus:border-indigo-500'
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
