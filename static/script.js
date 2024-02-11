const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
function getAnswer(query, response_body) {
    var postData = {
      search_query: query,
    };

    // Fetch options for the POST request
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    };
    // Make a POST request using Fetch API
    fetch(URL, fetchOptions)
      .then(function(response) {
        if (!response.ok) {
          // Handle errors if the response is not OK (status 200-299)
          throw new Error('Network response was not ok');
        }
        // Parse the response JSON
        return response.text()
      })
      .then(function(data) {
        // Handle the data received
        console.log('Response:', data);
        response_body.textContent = data;
      })
      .catch(function(error) {
        // Handle any errors during the request or processing
        console.error('There was a problem with the request:', error);
      });

}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from submitting

  const message = document.getElementById('chat-message').value;

  // Create a new message element
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', 'outgoing');
  messageElement.textContent = message;

  // Add the message to the chat messages section
  chatMessages.appendChild(messageElement);


  const responseElement = document.createElement('div');
  responseElement.classList.add('chat-message', 'incoming');
  chatMessages.appendChild(responseElement);
  getAnswer(message, responseElement)
  //responseElement.textContent = answer;




  // Clear the input field
  chatForm.reset();

  // Scroll to the bottom of the chat messages
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

