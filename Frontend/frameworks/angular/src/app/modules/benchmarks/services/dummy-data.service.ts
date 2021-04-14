import { Injectable } from '@angular/core';

export interface DummyData {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {
  adjectives: string[] = [
    'bad', 'best', 'better', 'big', 'certain', 'clear', 'different', 'early', 'easy', 'economic', 'federal', 'free',
    'full', 'good', 'great', 'hard', 'high', 'human', 'important', 'international', 'large', 'late', 'little', 'local',
    'long', 'low', 'major', 'military', 'national', 'new', 'old', 'only', 'other', 'political', 'possible', 'public',
    'real', 'recent', 'right', 'small', 'social', 'special', 'strong', 'sure', 'true', 'white', 'whole', 'young',
    'crazy', 'helpful', 'mushy'
  ];

  colors: string[] = [
    'red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'
  ];

  nouns = [
    'area', 'book', 'business', 'case', 'child', 'company', 'country', 'day', 'eye', 'fact', 'family', 'government',
    'group', 'hand', 'home', 'job', 'life', 'lot', 'man', 'money', 'month', 'mother', 'Mr', 'night', 'number', 'part',
    'people', 'place', 'point', 'problem', 'program', 'question', 'right', 'room', 'school', 'state', 'story',
    'student', 'study', 'system', 'thing', 'time', 'water', 'way', 'week', 'woman', 'word', 'work', 'world', 'year'
  ];

  random(max: number): number {
    return Math.round(Math.random() * 1000) % max;
  }

  buildData(count: number): DummyData[] {
    const data: DummyData[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        id: i,
        name: this.nouns[this.random(this.nouns.length)],
        description: `${this.adjectives[this.random(this.adjectives.length)]} ${this.colors[this.random(this.colors.length)]} ${this.nouns[this.random(this.nouns.length)]}`
      });
    }
    return data;
  }

  buildOneItem(id: number): DummyData {
    return {
      id,
      name: this.nouns[this.random(this.nouns.length)],
      description: `${this.adjectives[this.random(this.adjectives.length)]} ${this.colors[this.random(this.colors.length)]} ${this.nouns[this.random(this.nouns.length)]}`
    };
  }
}
