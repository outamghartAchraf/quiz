// Store the full API data
let cachedQuizData = null;

export const fetchQuestions = async (amount = 20, difficulty = '') => {
  try {
    // Build API URL
    let apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=21`;
    
    // Add difficulty if selected
    if (difficulty && difficulty !== '') {
      apiUrl += `&difficulty=${difficulty}`;
    }

    console.log('Fetching from:', apiUrl);
    
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch questions');
    
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error('لا توجد أسئلة متاحة');
    }

    // Cache the data
    cachedQuizData = data.results;
    return data.results;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getCachedData = () => cachedQuizData;

export const decodeHTML = (html) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};