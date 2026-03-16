export const fetchQuestions = async (amount = 10, difficulty = "") => {
  // Sports category=21
  let url = `https://opentdb.com/api.php?amount=${amount}&category=21`;
  if (difficulty) url += `&difficulty=${difficulty}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch questions");

  const data = await res.json();
  if (data.response_code !== 0) throw new Error("No questions available");

  return data.results || [];
};