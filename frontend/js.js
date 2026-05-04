// Weather API Configuration
const API_KEY = 'demo_key'; // Replace with actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatbotBody = document.getElementById('chatbotBody');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWidget = document.getElementById('chatbotWidget');

// Sample weather data for demo
const sampleWeatherData = {
    name: 'New York',
    main: {
        temp: 22,
        feels_like: 24,
        humidity: 65
    },
    weather: [{
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
    }],
    wind: {
        speed: 3.5
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add loading animation to search button
    const searchBtn = document.querySelector('.search-box button');
    searchBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-search"></i>';
        }, 2000);
    });

    // Display sample weather data initially
    displayWeather(sampleWeatherData);

    // Hide chatbot body initially
    chatbotBody.style.display = 'none';
});

// Get weather function
function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    // Show loading state
    weatherResult.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading weather data...</p>
        </div>
    `;

    // Simulate API call with sample data
    setTimeout(() => {
        displayWeather(sampleWeatherData);
    }, 1500);
}

// Display weather data
function displayWeather(data) {
    const weatherCard = document.getElementById('weatherResult');
    
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    
    weatherCard.innerHTML = `
        <div class="weather-header">
            <h2>${data.name}</h2>
            <div class="weather-icon">
                <i class="fas fa-sun"></i>
            </div>
        </div>
        
        <div class="weather-info">
            <div class="temperature">
                <span class="temp-value">${temperature}°C</span>
                <span class="temp-desc">${description}</span>
            </div>
            
            <div class="weather-details">
                <div class="detail">
                    <i class="fas fa-tint"></i>
                    <span>Humidity: ${humidity}%</span>
                </div>
                <div class="detail">
                    <i class="fas fa-wind"></i>
                    <span>Wind: ${windSpeed} m/s</span>
                </div>
            </div>
        </div>
    `;
}

// Chatbot toggle function
function toggleChat() {
    if (chatbotBody.style.display === 'none') {
        chatbotBody.style.display = 'flex';
        chatbotToggle.style.display = 'none';
    } else {
        chatbotBody.style.display = 'none';
        chatbotToggle.style.display = 'flex';
    }
}

// Sample AI responses
const aiResponses = {
    'weather': 'I can provide real-time weather updates for any city worldwide!',
    'forecast': 'I offer 7-day weather forecasts with detailed information.',
    'temperature': 'I can tell you current temperature, feels like, and humidity levels.',
    'rain': 'I can predict rainfall probability and intensity for any location.',
    'wind': 'I provide wind speed and direction information for accurate forecasts.',
    'hello': 'Hello! How can I help you with weather information today?',
    'help': 'I can help you with weather forecasts, temperature, humidity, wind, and more!',
    'thanks': "You're welcome! I'm always here to help with weather information."
};

// Get AI response based on user message
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    for (let key in aiResponses) {
        if (lowerMessage.includes(key)) {
            return aiResponses[key];
        }
    }
    return "I'm here to help with weather information! Try asking about temperature, forecast, or specific weather conditions.";
}

// Send message function
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Simulate AI response
    setTimeout(() => {
        const response = getAIResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    messageDiv.innerHTML = `
        <i class="fas ${sender === 'bot' ? 'fa-robot' : 'fa-user'}"></i>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Keyboard support for chat input
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
