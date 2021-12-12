import { useState, useEffect } from 'react';
import { InputGroup, Button, FormControl, Form, Popover, Row } from 'react-bootstrap';
import axios from 'axios';

import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

const API_URL = 'http://localhost:3001/chat'

const MessageView = ({ socket, user1, user2, id }) => {

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [savedMessages, setSavedMessages] = useState([]);

  // useEffect(() => {
  //   axios.post(API_URL, {
  //     senderId: user1,
  //     receiverId: user2
  //   })
  //   .then((result) => {
  //     setSavedMessages(result.data);
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }, [])

  const getMessages = () => {
    socket.on('receive_msg', data => {
      setMessageList([...messageList, data])
    })
  }

  useEffect(getMessages, [socket]);

  const sendMsg = async (e) => {
    console.log('invoked', message);
    e.preventDefault();
    if (message !== '') {
      const messageData = {
        fakeConvoId: id,
        username: user1.username,
        message: message,
        // time: new Date(Date.now()).getHour() + ':' + new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_msg", messageData)

      setMessageList([...messageList, messageData])
      //clear out the input box
      setMessage('');
    }

    // axios.post('http://localhost:3001/chat', {claimantId: 1, message: message})
    // .then(() => console.log('MSG sent'))
    // .catch(err => console.log(err));
  }


   const testMsg = messageList.map((msg) => msg.message);


  return (
    <div>
      {/* <div>
        {messageList.map((msg, index) => <p>{msg.username}:{msg.message}</p>)}
      </div> */}

      <ChatMsg messages={testMsg} />

      {/* input bar */}
      <div>
        <Form
          style={{ position: 'absolute', bottom: '20px', width: '70%', left: '15%' }}
          onSubmit={sendMsg}>
          <InputGroup className="mb-3">
            <FormControl
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Messages"
              aria-label="Messages"
              aria-describedby="basic-addon2"
            />
            <Button type='submit' variant="outline-secondary" id="button-addon2">
              send
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}

export default MessageView;