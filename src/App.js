import { useState } from "react";

const initialItems = [
  // { id: 1, description: "Passports", quantity: 2, packed: false },
  // { id: 2, description: "Books", quantity: 10, packed: false },
];

export default function App() {
  const [items, setItems] = useState([...initialItems])

  function handleAddItems(item) {
    setItems(array => [...array, item])
  }

  function handleDeleteItems(id) {
    setItems(array => array.filter(item => item.id !== id))
  }

  function handleUpdateItems(id) {
    setItems(array => array.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAdditems={handleAddItems} />
      <PackingList items={items} onDeleteItems={handleDeleteItems} onUpdateItems={handleUpdateItems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <h1>
      🌴 Far Away 💼
    </h1>
  )
}

function Form({ onAdditems }) {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if(!description) return;

    const newItem = {description, quantity, packed: false, id: Date.now()}
    onAdditems(newItem)

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>
        What do you need for your 😍 trip?
      </h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
      >
        {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>)
        )}
      </select>
      <input 
        type="text" 
        placeholder="items..." 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItems, onUpdateItems }) {
  return (
    <div className='list'>
      <ul>
        {items.map((item, index) => (
          <Item item={item} key={index} onDeleteItems={onDeleteItems} onUpdateItems={onUpdateItems} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item, onDeleteItems, onUpdateItems }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onUpdateItems(item.id)} />
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {
  if(!items.length) return <p className="stats"><em>Start adding some items to your packing list 🚀</em></p>

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length
  const percentagePacked = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
      {percentagePacked !== 100 ? `👜 You have ${numItems} items on your list, and you already packed ${numPacked} item${numPacked > 1? 's' : ''} (${percentagePacked}%) .` : 'You got everthing! Ready to go ✈'}
      </em>
    </footer>
  )
}
