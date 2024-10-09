const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const config = require('config');
const { LLMChain } = require("langchain/chains");
const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
const axios = require('axios');

// @route     POST api/ai/resolve-dispute
// @desc      Resolve a family dispute
// @access    Private
router.post('/resolve-dispute', auth, async (req, res) => {
  try {
    const { dispute } = req.body;

    const template = "As a family mediator, help resolve the following dispute: {dispute}";
    const prompt = new PromptTemplate({ template, inputVariables: ["dispute"] });

    const model = new OpenAI({ temperature: 0.7 });
    const chain = new LLMChain({ llm: model, prompt });

    const result = await chain.call({ dispute });

    res.json({ resolution: result.text });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/ai/suggest-activity
// @desc      Suggest a family activity
// @access    Private
router.post('/suggest-activity', auth, async (req, res) => {
  try {
    const { interests, location } = req.body;

    // Get weather data
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${config.get('openWeatherMapApiKey')}`);
    const weather = weatherResponse.data.weather[0].main;

    const template = "Suggest a family activity based on the following interests: {interests}, and the current weather: {weather}";
    const prompt = new PromptTemplate({ template, inputVariables: ["interests", "weather"] });

    const model = new OpenAI({ temperature: 0.7 });
    const chain = new LLMChain({ llm: model, prompt });

    const result = await chain.call({ interests, weather });

    res.json({ suggestion: result.text });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add more AI-related routes as needed

module.exports = router;