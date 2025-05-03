import React, { useState } from 'react';
import { render, Text, Box, useInput } from 'ink';

const prefixes = [
  { value: 'feat', description: '新機能の追加' },
  { value: 'fix', description: 'バグ修正' },
];

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [isMessageInput, setIsMessageInput] = useState(false);

  useInput((input: string, key: { upArrow: boolean; downArrow: boolean; return: boolean; backspace: boolean }) => {
    if (isMessageInput) {
      if (key.return) {
        console.log(`${prefixes[selectedIndex].value}: ${message}`);
        process.exit(0);
      } else if (key.backspace) {
        setMessage(prev => prev.slice(0, -1));
      } else {
        setMessage(prev => prev + input);
      }
      return;
    }

    if (key.upArrow) {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prefixes.length - 1));
    } else if (key.downArrow) {
      setSelectedIndex(prev => (prev < prefixes.length - 1 ? prev + 1 : 0));
    } else if (key.return) {
      setIsMessageInput(true);
    }
  });

  return (
    <Box flexDirection="column">
      {!isMessageInput ? (
        <>
          <Text>プレフィックスを選択してください:</Text>
          {prefixes.map((prefix, index) => (
            <Text key={prefix.value} color={index === selectedIndex ? 'green' : 'white'}>
              {index === selectedIndex ? '> ' : '  '}
              {prefix.value}: {prefix.description}
            </Text>
          ))}
        </>
      ) : (
        <>
          <Text>コミットメッセージを入力してください:</Text>
          <Text>
            {prefixes[selectedIndex].value}: {message}
          </Text>
        </>
      )}
    </Box>
  );
};

render(<App />); 
