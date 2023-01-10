function onSubmit(e) {
    e.preventDefault();
    document.querySelector('#response').innerHTML = '';
    document.querySelector('#prompt-display').innerHTML = '';
    showSpinner();
    const prompt = document.querySelector('#prompt').value;

    if (prompt === '') {
        alert('Please add some text');
        return;
    }
    // generateImageRequest(prompt);
    if(AIMode){
        generateTextRequest(prompt)
    } else {
        document.querySelector('#prompt-display').innerHTML = prompt;
        document.querySelector('#response').textContent = "AI Mode is off. Press ALT to activate.";
        document.querySelector('#prompt').value = ""
        removeSpinner();
    };
}

async function generateImageRequest(prompt) {
    try {
        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt
            }),
        });

        if (!response.ok) {
            removeSpinner();
            throw new Error('That image could not be generated');
        }
        const data = await response.json();
        // console.log(data);
        const imageUrl = data.data;
        document.querySelector('#image').src = imageUrl;
        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

async function generateTextRequest(prompt) {
    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt
            }),
        });

        if (!response.ok) {
            removeSpinner();
            throw new Error('The server is overloaded. Sorry!');
        }
        const data = await response.json();
        // console.log(data);
        const responseText = data.data;
        document.querySelector('#prompt-display').innerHTML = prompt;
        document.querySelector('#response').innerHTML = responseText;
        document.querySelector('#prompt').value = ""
        removeSpinner();
    } catch (error) {
        document.querySelector('#response').textContent = error;
    }
}


function showSpinner() {
    document.querySelector('.spinner').style.display = "flex";
}

function removeSpinner() {
    document.querySelector('.spinner').style.display = "none";
}

let AIMode = false;

const toggleAIMode = () => {
    switch (AIMode) {
        case false:
            document.querySelector('#prompt').style.color = "red";
            document.querySelector('#prompt').placeholder = "AI Mode: ON";
            AIMode = true;
            break;

        case true:
            document.querySelector('#prompt').style.color = "";
            document.querySelector('#prompt').placeholder = "AI Mode: OFF";
            AIMode = false;
            break;
    }
}

const handleKeyPress = (e) => {
    if (e.altKey) {
        e.preventDefault();
        toggleAIMode();
    }
}

document.querySelector('#prompt-form').addEventListener('submit', onSubmit);
window.addEventListener('keydown', handleKeyPress);
