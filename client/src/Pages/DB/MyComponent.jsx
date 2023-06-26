import React, { useState, useEffect, useRef } from 'react';

function MyComponent() {
  const [inputs, setInputs] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === ' ' && input.trim() !== '') {
      setInputs([...inputs, input.trim()]);
      setInput('');
    }
  };

  const handleRemoveInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && input === '') {
      setInputs((prevInputs) => prevInputs.slice(0, prevInputs.length - 1));
    }
  };

  return (
    <></> 
  );
}

// export default MyComponent;
