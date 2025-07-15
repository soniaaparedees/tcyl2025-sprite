const gameData = {
    "1": {
        "text": "The TCYL Sprites and Mascots are on a mission to get to Houston to make it in time for 2025 US TCYL Humanitarian Leadership Conference.",
        "image" : "smaller_images/beach_disaster.png",
"choices": {
            "Continue": [2,[]]
        }
    },
    "2": {
        "text": "Okay, so I have my TC stuff, my ID, my phone, wallet, keys...hmmm am I missing anything?",
        "image" : "smaller_images/packing.png",
"choices": {
            "snacks": [3,["Tzu Bear"]],
            "first aid kit": [3,["Cardi O.", "Bo D. Sattva"]],
            "an extra shirt, can never have too little": [3,["MooMoo", "Dewy"]],
            "I'm not missing anything!": [3, ["Blaze", "Mr. Prickles"]]
        }
    },
    "3": {
        "text": "The sprites all meet up but for some reason their flight gets cancelled.OH NO! But the conference is in two days?! What should we do?",
        "image" : "smaller_images/airport.png",
"choices": {
            "phone a friend, ask an alum/auntie/uncle": [4, ["MooMoo", "Tzu Bear"]],
            "cry": [4,["Mr. Prickles", "Cardi O."]],
            "oh no, I guess I should take a nap": [4,["Dewy"]],
            "it's time for a road trip!": [4, ["Blaze", "Bo D. Sattva"]]
        }
    },
    "4": {
        "text": "It starts to downpour and a small river forms. The sprites and mascots are all washed away!! Dewy can't swim! But there are some trees around us. How do we get to them?",
        "image" : "smaller_images/river.png",
"choices": {
            "parkour up the trees": [5,["Mr. Prickles"]],
            "Give everyone a jetpack that you packed in your bag.": [5,["Tzu Bear", "Cardi O."]],
            "Let's just climb and help each other up.": [5,["MooMoo", "Bo D. Sattva"]],
            "We don't need the trees, let's go down the river!": [5,[ "Blaze", "Dewy"]],
        }
    },
    "5": {
        "text": "A magnificent bird swoops in, offering everyone a ride. The rain starts to make Blaze lose some of their flame. How do we help them?",
        "image" : "smaller_images/bird.png",
"choices": {
            "Try to offer cover from the rain": [7,["Bo D. Sattva", "MooMoo", "Mr. Prickles"]],
            "Offer words of encouragement, to keep Blaze's inner light going": [7,["Blaze"]],
            "Ask kindly if the bird can fly just a bit faster!": [7,["Dewy", "Tzu Bear"]],
            "Starts flapping arms to help the bird fly faster?": [7,["Cardi O."]],
        }
    },
    "7": {
        "text": "They come across a field of balloons. Spike is terrified!",
        "image" : "smaller_images/balloons.png",
"choices": {
            "Continue": [8,[]]
        }
    },
    "8": {
        "text": "How would you console Spike?",
        "image" : "smaller_images/cloudy.png",   
"choices": {
            "Tell them we can grow by facing our fears": [9,["MooMoo", "Blaze"]],
            "Suggest we can find another route": [9,["Dewy"]],
            "Asks Spike why they are afraid of balloons": [9, ["Bo D. Sattva"]],
            "Ask if Spike would like a hug (haha ouch)": [9, ["Cardi O.","Mr. Prickles","Tzu Bear"]],
        }
    },
    "9": {
        "text": "The party comes across a festival. \
                There's so much yummy vegetarian food and toys and games! \
                Suddenly, the squad comes across a lost, crying dog.\
                HOW SHALL WE PROCEED? WHAT IS THE DEED?",
        "image" : "smaller_images/festival.png",
"choices": {
            "Offer some of your food to the dog": [10, ["Tzu Bear", "Cardi O."]],
            "Distracts the dog by making goofy faces to stop it from crying": [10, ["Blaze", "Mr. Prickles"]],
            "Contact the festival runners to let them know someone's dog is missing": [10, ["MooMoo"]],
            "Speak gently with kind words to the dog to calm them down.": [10, ["Bo"]],
        }
    },
    "10" :{
        "text": "The dog then magically starts speaking. Turns out it was a test! AND YOU PASSED.",
        "image" : "smaller_images/window_jump.png",
"choices": {
            "Continue": [11,[]]
        }
    },
    "11" :{
        "text" : "By the magical power of the dog you and the squad are now transported to Houston. \
                  How do you celebrate?",
        "image" : "smaller_images/grocery_bag.png",
"choices": {
                    "food": [0, ["Tzu Bear"]],
                    "A k-pop dance cover performance": [0, ["Blaze", "Mr. Prickles","Cardi O."]],
                    "A soulful performance of TC songs with sign language": [0, ["Bo D. Sattva"]],
                    "A nice nap.": [0, ["Dewy","MooMoo"]],
                }
    }

};
const personalities = { 
    "Tzu Bear": 0,
    "Cardi O." : 0, 
    "Bo D. Sattva" : 0,
    "Blaze" : 0,
    "Mr. Prickles" : 0,
    "Dewy" : 0,
    "MooMoo" : 0
};

let currentState = 1;

function renderState(state) {
    const storyText = document.getElementById('story-text');
    const storyImage = document.getElementById('story-image');
    const choicesContainer = document.getElementById('choices');

    const img = new Image();
    img.src = gameData[state].image;

    img.onload = () => {
        storyImage.src = img.src;
        storyText.textContent = gameData[state].text;
        choicesContainer.innerHTML = '';

        for (const [choice, info] of Object.entries(gameData[state].choices)) {
            const button = document.createElement('button');
            button.textContent = choice;
            button.className = 'choice-button';
            let nextState = info[0];
            button.onclick = () => changeState(nextState, info[1]); //each time you change state you update the personalities dictionary
            choicesContainer.appendChild(button);
        }
    };
}


function changeState(newState, selectedPersonalities) { 
    // console.log(personalities); 
    selectedPersonalities.forEach(personality => {
        personalities[personality]++;
    });

    currentState = newState;

    if (currentState === 0) {
        revealMostSelectedVegetable();
    } else {
        renderState(currentState);
    }
}
function revealMostSelectedVegetable() {
    let maxCount = 0;
    let maxVeggie = '';

    for (const [vegetable, count] of Object.entries(personalities)) {
        if (count > maxCount) {
            maxCount = count;
            maxVeggie = vegetable;
        }
    }

    const storyImage = document.getElementById('story-image');
    const text = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices');
    const veggieImagePath = `smaller_images/id_cards/${maxVeggie}.png`;

    // Preload the image
    const img = new Image();
    img.src = veggieImagePath;
    img.className = 'responsive-image'; 

    // Create the share button
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share the game with Friends';
    shareButton.className = 'choice-button';

    // Once the image is loaded, update the DOM
    img.onload = () => {
        storyImage.style.display = 'none';
        choicesContainer.style.display = 'none';
    
        text.textContent = "Drumroll... you are (Right click or hold the image to save)";
        text.appendChild(img);

        // Share button functionality
        shareButton.onclick = () => {
            const shareMessage = `Check out my Veggie ID! You can create yours at https://soniaaparedees.github.io/tcyl2025-sprite/`;
            navigator.clipboard.writeText(shareMessage).then(() => {
                alert('Link copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy link. Please try again.');
            });
        };

        text.appendChild(shareButton);
    };
}


function startGame() {
    document.querySelector('.title').style.display = 'none';
    document.getElementById('homescreen').style.display = 'none';
    document.querySelector('.start-button').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    renderState(currentState);
}

window.onload = () => {
    renderState(currentState);
}
