import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const user = useSelector((store) => store.user);
  const [shelfList, setShelfList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [image, setImage] = useState('');


  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });

  }

    const addToShelf = (e) => {
      e.preventDefault();
      axios.post('/api/shelf', { description: itemName, image_url: image})
        .then(response => fetchShelf())
        .catch(error => {
          console.error(error);
          alert('Something went wrong.');
        });

  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit={addToShelf}>
        Name: <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} />
        Image Url: <input type="text" value={image} onChange={e => setImage(e.target.value)} />
        
        <br />
        <button>Submit</button>
      </form>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
