export interface CodeSnippet {
  id: string
  language: string
  code: string
  difficulty: "easy" | "medium" | "hard"
}

export const codeSnippets: CodeSnippet[] = [
  // Easy - JavaScript
  {
    id: "easy-js-1",
    language: "javascript",
    difficulty: "easy",
    code: `console.log('Hello, World!');`,
  },
  {
    id: "easy-js-2",
    language: "javascript",
    difficulty: "easy",
    code: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
  },
  {
    id: "easy-js-3",
    language: "javascript",
    difficulty: "easy",
    code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);`,
  },
  // Easy - Python
  {
    id: "easy-py-1",
    language: "python",
    difficulty: "easy",
    code: `print('Hello, World!')`,
  },
  {
    id: "easy-py-2",
    language: "python",
    difficulty: "easy",
    code: `for i in range(5):
    print(i)`,
  },
  {
    id: "easy-py-3",
    language: "python",
    difficulty: "easy",
    code: `numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]`,
  },
  // Easy - C++
  {
    id: "easy-cpp-1",
    language: "cpp",
    difficulty: "easy",
    code: `#include <iostream>
std::cout << "Hello, World!" << std::endl;`,
  },
  // Medium - JavaScript
  {
    id: "medium-js-1",
    language: "javascript",
    difficulty: "medium",
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  },
  {
    id: "medium-js-2",
    language: "javascript",
    difficulty: "medium",
    code: `const filterByType = (arr, type) => {
  return arr.filter(item => typeof item === type);
};`,
  },
  {
    id: "medium-js-3",
    language: "javascript",
    difficulty: "medium",
    code: `class Counter {
  constructor(initial = 0) {
    this.count = initial;
  }
  increment() {
    this.count++;
  }
}`,
  },
  // Medium - Python
  {
    id: "medium-py-1",
    language: "python",
    difficulty: "medium",
    code: `def is_palindrome(s):
    s = s.lower().replace(' ', '')
    return s == s[::-1]`,
  },
  {
    id: "medium-py-2",
    language: "python",
    difficulty: "medium",
    code: `def merge_dicts(*dicts):
    result = {}
    for d in dicts:
        result.update(d)
    return result`,
  },
  {
    id: "medium-py-3",
    language: "python",
    difficulty: "medium",
    code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def greet(self):
        return f"Hello, I'm {self.name}"`,
  },
  // Hard - JavaScript
  {
    id: "hard-js-1",
    language: "javascript",
    difficulty: "hard",
    code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
  },
  {
    id: "hard-js-2",
    language: "javascript",
    difficulty: "hard",
    code: `const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};`,
  },
  {
    id: "hard-js-3",
    language: "javascript",
    difficulty: "hard",
    code: `class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  append(data) {
    const newNode = new LinkedListNode(data);
    if (!this.head) this.head = newNode;
  }
}`,
  },
  // Hard - Python
  {
    id: "hard-py-1",
    language: "python",
    difficulty: "hard",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[0]
    left = [x for x in arr[1:] if x < pivot]
    right = [x for x in arr[1:] if x >= pivot]
    return quicksort(left) + [pivot] + quicksort(right)`,
  },
  {
    id: "hard-py-2",
    language: "python",
    difficulty: "hard",
    code: `def decorator_with_args(prefix):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print(f"{prefix}: Calling {func.__name__}")
            return func(*args, **kwargs)
        return wrapper
    return decorator`,
  },
  {
    id: "hard-py-3",
    language: "python",
    difficulty: "hard",
    code: `class BinarySearchTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
    def insert(self, value):
        if value < self.value:
            if self.left is None:
                self.left = BinarySearchTree(value)
            else:
                self.left.insert(value)`,
  },
]

export function getSnippetsByDifficulty(difficulty: "easy" | "medium" | "hard") {
  return codeSnippets.filter((s) => s.difficulty === difficulty)
}

export function getSnippetsByLanguage(language: string) {
  return codeSnippets.filter((s) => s.language === language)
}

export function getSnippetsByLanguageAndDifficulty(language: string, difficulty: "easy" | "medium" | "hard") {
  return codeSnippets.filter((s) => s.language === language && s.difficulty === difficulty)
}

export function getRandomSnippet(difficulty: "easy" | "medium" | "hard", language?: string) {
  let snippets = getSnippetsByDifficulty(difficulty)
  if (language) {
    snippets = snippets.filter((s) => s.language === language)
  }
  return snippets[Math.floor(Math.random() * snippets.length)]
}

export function getAvailableLanguages() {
  const languages = new Set(codeSnippets.map((s) => s.language))
  return Array.from(languages).sort()
}
