// script.js

const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestionsList');
const DEBOUNCE_DELAY = 250; // Time (ms) to wait after typing stops
let timeoutId;

// 1. Debouncing Utility (Essential for performance)
// This function limits how often we send an AJAX request.
function debounce(func, delay) {
    return function(...args) {
        clearTimeout(timeoutId); // Clear any pending call
        timeoutId = setTimeout(() => {
            func.apply(this, args); // Schedule the function to run after the delay
        }, delay);
    };
}

// 2. AJAX Simulation and Data Fetching
// The 'async' keyword allows us to use 'await'
async function fetchSuggestions(query) {
    // Basic check: Don't send a request if the query is too short
    if (query.length < 2) {
        suggestionsList.innerHTML = ''; // Clear existing suggestions
        return;
    }

    // --- AJAX SIMULATION START ---
    // In a real project, you would use the Fetch API here:
    // const response = await fetch(`/api/suggestions?q=${query}`);
    // const data = await response.json();
    
    // We use mock data to simulate the server response
    const mockSuggestions = [
        `${query} tutorial`,
        `how to learn ${query}`,
        `top ${query} resources`,
        `${query} cheat sheet`
    ];
    
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // --- AJAX SIMULATION END ---

    displaySuggestions(mockSuggestions);
}

// 3. DOM Manipulation: Displaying the suggestions on screen
function displaySuggestions(suggestions) {
    suggestionsList.innerHTML = ''; // Clear previous list items
    
    if (suggestions && suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const listItem = document.createElement('li'); // Create a new list item
            listItem.textContent = suggestion;
            
            // Add click handler to each suggestion
            listItem.addEventListener('click', () => {
                searchInput.value = suggestion; // Fill the search box
                suggestionsList.innerHTML = ''; // Hide suggestions
                searchInput.closest('form').submit(); // Submit the form
            });
            
            suggestionsList.appendChild(listItem); // Add the new item to the list
        });
    }
}

// 4. Attach Event Listeners
const debouncedFetchSuggestions = debounce(fetchSuggestions, DEBOUNCE_DELAY);

// Listens for every change in the input box
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    // Calls the debounced function, starting the AJAX process after a pause
    debouncedFetchSuggestions(query);
});

// Hide the suggestions when the input loses focus (user clicks elsewhere)
searchInput.addEventListener('blur', () => {
    // Timeout prevents the list from disappearing before the click registers
    setTimeout(() => {
        suggestionsList.innerHTML = '';
    }, 150);
});