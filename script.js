//this line of code is a function to fetch and display details of a specific breed by its ID
function fetchBreedDetails(breedId) {
    //this line of code accesses the container for breed details
    const detailsContainer = document.getElementById('breedDetails');
    //this line of code clears existing breed details before displaying new ones
    detailsContainer.innerHTML = '';

    //this line of code fetches breed details from the API
    fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`)
        .then(response => {
            //this line of code checks if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //this line of code parses the response to JSON
            return response.json();
        })
        .then(data => {
            //this line of code accesses the breed data from the response
            const breed = data.data;
            const breedName = breed.attributes.name;
            const breedDescription = breed.attributes.description;
            //this line of code provides fallbacks if size or lifespan is not available
            const breedSize = breed.attributes.size || 'Not available';
            const breedLifespan = breed.attributes.lifespan || 'Not available';

            //this line of code creates a new div element to hold the breed details
            const breedDetailsElement = document.createElement('div');
            //this line of code sets the innerHTML of the div to include breed information
            breedDetailsElement.innerHTML = `
                <h2>${breedName}</h2>
                <p>${breedDescription}</p>
                <p>Size: ${breedSize}</p>
                <p>Lifespan: ${breedLifespan}</p>
            `;

            //this line of code appends the new div to the breed details container
            detailsContainer.appendChild(breedDetailsElement);
        })
        .catch(error => {
            //this line of code logs any errors to the console
            console.error('Error:', error);
        });
}

//this line of code creates a function to fetch and display random dog facts
function fetchDogFacts() {
    //this line of code accesses the container for dog facts
    const factsContainer = document.getElementById('dogFacts');
    //this line of code clears existing facts before displaying new ones
    factsContainer.innerHTML = '';

    //this line of code fetches random dog facts from the API
    fetch('https://dogapi.dog/api/v2/facts')
        .then(response => {
            //this line of code checks if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //this line of code parses the response to JSON
            return response.json();
        })
        .then(data => {
            //this line of code accesses the facts data from the response
            const facts = data.data;
            //this line of code creates a new unordered list element for the facts
            const factListElement = document.createElement('ul');
            //this line of code iterates over each fact and create list items
            facts.forEach(fact => {
                const factItem = document.createElement('li');
                factItem.textContent = fact.fact;
                //this line of code appends each fact to the list
                factListElement.appendChild(factItem);
            });
            //this line of code appends the list to the dog facts container
            factsContainer.appendChild(factListElement);
        })
        .catch(error => {
            //logs if there are any errors to the console
            console.error('Error:', error);
        });
}

//a function to fetch and display information about dog groups
function fetchDogGroups() {
    //to access the container for dog groups
    const groupsContainer = document.getElementById('dogGroups');
    //clears existing groups before displaying new ones
    // i implemented this to avoid reapeated displays of same breed details
    groupsContainer.innerHTML = '';

    //to fetch dog group information from the API
    fetch('https://dogapi.dog/api/v2/groups')
        .then(response => {
            //checks if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //parses the response to JSON
            return response.json();
        })
        .then(data => {
            //to access the groups data from the response
            const groups = data.data;
            //creates a new unordered list element for the groups
            const groupListElement = document.createElement('ul');
            //iterates over each group and create list items
            groups.forEach(group => {
                const groupItem = document.createElement('li');
                groupItem.textContent = group.name;
                //appends each group to the list
                groupListElement.appendChild(groupItem);
            });
            //appends the list to the dog groups container
            groupsContainer.appendChild(groupListElement);
        })
        .catch(error => {
            //logs if there are any errors to the console
            console.error('Error:', error);
        });
}

//adds event listener to DOMContentLoaded to ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    //fetching and rendering the list of breeds
    fetch('https://dogapi.dog/api/v2/breeds')
        .then(response => {
            
                        // Check if the response is successful
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        // Parse the response to JSON
                        return response.json();
                    })
                    .then(data => {
                        // Access the list of breeds from the response data
                        const breeds = data.data;
                        // Get the breed list element from the DOM
                        const breedList = document.getElementById('breedList');
            
                        // Iterate over each breed to create list items
                        breeds.forEach(breed => {
                            const breedItem = document.createElement('li');
                            breedItem.textContent = breed.attributes.name;
                            breedItem.style.cursor = 'pointer'; // Make items appear clickable
            
                            // Add an event listener to fetch and display breed details when clicked
                            breedItem.addEventListener('click', () => {
                                fetchBreedDetails(breed.id);
                                // Remove 'clicked-breed' class from any other item
                                const currentClicked = document.querySelector('.clicked-breed');
                                if (currentClicked) {
                                    currentClicked.classList.remove('clicked-breed');
                                }
                                // Add 'clicked-breed' class to the clicked item
                                breedItem.classList.add('clicked-breed');
                            });
            
                            // Append the breed item to the breed list in the DOM
                            breedList.appendChild(breedItem);
                        });
                    })
                    .catch(error => {
                        // Log any errors to the console
                        console.error('Error:', error);
                    });
            
                // Call the functions to fetch dog facts and groups
                fetchDogFacts();
                fetchDogGroups();
            });
            
