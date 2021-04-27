const adjectives = [
  'bad', 'best', 'better', 'big', 'certain', 'clear', 'different', 'early', 'easy', 'economic', 'federal', 'free',
  'full', 'good', 'great', 'hard', 'high', 'human', 'important', 'international', 'large', 'late', 'little', 'local',
  'long', 'low', 'major', 'military', 'national', 'new', 'old', 'only', 'other', 'political', 'possible', 'public',
  'real', 'recent', 'right', 'small', 'social', 'special', 'strong', 'sure', 'true', 'white', 'whole', 'young',
  'crazy', 'helpful', 'mushy'
];

const colors = [
  'red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'
];

const nouns = [
  'area', 'book', 'business', 'case', 'child', 'company', 'country', 'day', 'eye', 'fact', 'family', 'government',
  'group', 'hand', 'home', 'job', 'life', 'lot', 'man', 'money', 'month', 'mother', 'Mr', 'night', 'number', 'part',
  'people', 'place', 'point', 'problem', 'program', 'question', 'right', 'room', 'school', 'state', 'story',
  'student', 'study', 'system', 'thing', 'time', 'water', 'way', 'week', 'woman', 'word', 'work', 'world', 'year'
];

const random = (max) => {
  return Math.round(Math.random() * 1000) % max;
}

export const buildData = (count) => {
  return Array(count).fill(1).map((_, index) => {
    return buildOneItem(index);
  });
}

export const buildOneItem = (id) => {
  const title = nouns[random(nouns.length)];
  const desc = `${adjectives[random(adjectives.length)]} ${colors[random(colors.length)]} ${nouns[random(nouns.length)]}`
  const completed = false;
  return {
    id,
    title,
    description: desc,
    completed
  }
}
