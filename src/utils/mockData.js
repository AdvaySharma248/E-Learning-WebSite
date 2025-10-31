// Mock data for frontend testing

export const mockUsers = [
  {
    id: 1,
    email: 'admin@elearn.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'Admin'
  },
  {
    id: 2,
    email: 'learner@elearn.com',
    password: 'learner123',
    name: 'Student1',
    role: 'Learner'
  }
];

export const mockCourses = [
  {
    id: 101,
    title: 'Web Development Basics',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript',
    instructor: 'Dr. Jane Smith',
    duration: '8 weeks',
    level: 'Beginner',
    enrolledCount: 1250,
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    modules: [
      {
        id: 1,
        title: 'Introduction to HTML',
        description: 'Learn HTML basics and structure',
        materials: [
          { id: 1, type: 'pdf', title: 'HTML Fundamentals.pdf', url: '/sample.pdf' },
          { id: 2, type: 'video', title: 'HTML Introduction', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '15:30' }
        ]
      },
      {
        id: 2,
        title: 'CSS Styling',
        description: 'Master CSS styling and layouts',
        materials: [
          { id: 3, type: 'pdf', title: 'CSS Guide.pdf', url: '/sample.pdf' },
          { id: 4, type: 'video', title: 'CSS Basics', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '20:15' }
        ]
      },
      {
        id: 3,
        title: 'JavaScript Essentials',
        description: 'Introduction to JavaScript programming',
        materials: [
          { id: 5, type: 'pdf', title: 'JavaScript Primer.pdf', url: '/sample.pdf' },
          { id: 6, type: 'video', title: 'JS Fundamentals', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '25:45' }
        ]
      }
    ]
  },
  {
    id: 102,
    title: 'Data Science with Python',
    description: 'Complete guide to data science using Python, pandas, and machine learning',
    instructor: 'Prof. John Doe',
    duration: '12 weeks',
    level: 'Intermediate',
    enrolledCount: 980,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    modules: [
      {
        id: 4,
        title: 'Python Basics',
        description: 'Introduction to Python programming',
        materials: [
          { id: 7, type: 'pdf', title: 'Python Basics.pdf', url: '/sample.pdf' },
          { id: 8, type: 'video', title: 'Python Introduction', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '18:20' }
        ]
      },
      {
        id: 5,
        title: 'Data Analysis with Pandas',
        description: 'Learn data manipulation with pandas',
        materials: [
          { id: 9, type: 'pdf', title: 'Pandas Guide.pdf', url: '/sample.pdf' },
          { id: 10, type: 'video', title: 'Pandas Tutorial', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '30:10' }
        ]
      }
    ]
  },
  {
    id: 103,
    title: 'Digital Marketing Masterclass',
    description: 'Complete digital marketing course covering SEO, social media, and analytics',
    instructor: 'Sarah Williams',
    duration: '6 weeks',
    level: 'Beginner',
    enrolledCount: 2100,
    rating: 4.3,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    modules: [
      {
        id: 6,
        title: 'SEO Fundamentals',
        description: 'Learn search engine optimization',
        materials: [
          { id: 11, type: 'pdf', title: 'SEO Guide.pdf', url: '/sample.pdf' },
          { id: 12, type: 'video', title: 'SEO Basics', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '22:30' }
        ]
      }
    ]
  }
];

export const mockQuizzes = [
  {
    id: 1,
    courseId: 101,
    title: 'HTML Basics Quiz',
    description: 'Test your knowledge of HTML fundamentals',
    duration: 30, // minutes
    totalQuestions: 10,
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language'
        ],
        correctAnswer: 0,
        negativeMarks: 0.5 // 0.5 marks deducted for wrong answer
      },
      {
        id: 2,
        type: 'mcq',
        question: 'Which HTML tag is used for the largest heading?',
        options: ['<head>', '<h6>', '<heading>', '<h1>'],
        correctAnswer: 3,
        negativeMarks: 0.5
      },
      {
        id: 3,
        type: 'true-false',
        question: 'HTML is a programming language.',
        correctAnswer: false,
        negativeMarks: 0.5
      },
      {
        id: 4,
        type: 'mcq',
        question: 'Which tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correctAnswer: 1,
        negativeMarks: 0.5
      },
      {
        id: 5,
        type: 'short-answer',
        question: 'What is the purpose of the <div> tag in HTML?',
        correctAnswer: null // Descriptive answers not auto-graded
      },
      {
        id: 6,
        type: 'mcq',
        question: 'Which attribute is used to provide alternative text for an image?',
        options: ['title', 'alt', 'src', 'text'],
        correctAnswer: 1,
        negativeMarks: 0.5
      },
      {
        id: 7,
        type: 'true-false',
        question: 'CSS can be included directly in HTML files.',
        correctAnswer: true,
        negativeMarks: 0.5
      },
      {
        id: 8,
        type: 'mcq',
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<break>', '<lb>', '<br>', '<newline>'],
        correctAnswer: 2,
        negativeMarks: 0.5
      },
      {
        id: 9,
        type: 'short-answer',
        question: 'Explain the difference between <div> and <span> tags.',
        correctAnswer: null
      },
      {
        id: 10,
        type: 'mcq',
        question: 'Which HTML tag is used to define an unordered list?',
        options: ['<ol>', '<ul>', '<list>', '<li>'],
        correctAnswer: 1,
        negativeMarks: 0.5
      }
    ]
  },
  {
    id: 2,
    courseId: 102,
    title: 'Python Fundamentals Quiz',
    description: 'Test your Python programming skills',
    duration: 45,
    totalQuestions: 8,
    passingScore: 75,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'Which of the following is the correct way to declare a variable in Python?',
        options: ['var x = 5', 'int x = 5', 'x = 5', 'declare x = 5'],
        correctAnswer: 2,
        negativeMarks: 0.5
      },
      {
        id: 2,
        type: 'true-false',
        question: 'Python is a statically typed language.',
        correctAnswer: false,
        negativeMarks: 0.5
      },
      {
        id: 3,
        type: 'mcq',
        question: 'What is the output of: print(type([]))?',
        options: ['<class \'array\'>', '<class \'list\'>', '<class \'tuple\'>', '<class \'dict\'>'],
        correctAnswer: 1,
        negativeMarks: 0.5
      },
      {
        id: 4,
        type: 'short-answer',
        question: 'Explain the difference between a list and a tuple in Python.',
        correctAnswer: null // Descriptive answers not auto-graded
      },
      {
        id: 5,
        type: 'mcq',
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
        negativeMarks: 0.5
      },
      {
        id: 6,
        type: 'true-false',
        question: 'Python uses indentation to define code blocks.',
        correctAnswer: true,
        negativeMarks: 0.5
      },
      {
        id: 7,
        type: 'mcq',
        question: 'What does the len() function do?',
        options: ['Returns the length of an object', 'Deletes an object', 'Creates a list', 'Sorts a list'],
        correctAnswer: 0,
        negativeMarks: 0.5
      },
      {
        id: 8,
        type: 'short-answer',
        question: 'What is a dictionary in Python and when would you use it?',
        correctAnswer: null
      }
    ]
  }
];

export const mockDiscussions = [
  {
    id: 1,
    courseId: 101,
    title: 'Help with CSS Flexbox',
    author: 'Student1',
    authorId: 2,
    timestamp: '2025-10-28T10:30:00',
    content: 'I\'m having trouble understanding how to center items using flexbox. Can someone explain?',
    likes: 5,
    comments: [
      {
        id: 1,
        author: 'John Developer',
        authorId: 3,
        timestamp: '2025-10-28T11:00:00',
        content: 'Use justify-content: center and align-items: center on the parent container.',
        likes: 3
      },
      {
        id: 2,
        author: 'Sarah Designer',
        authorId: 4,
        timestamp: '2025-10-28T12:15:00',
        content: 'Also make sure to set display: flex on the parent element first!',
        likes: 2
      }
    ]
  },
  {
    id: 2,
    courseId: 101,
    title: 'Best practices for HTML semantic tags',
    author: 'Mike Johnson',
    authorId: 5,
    timestamp: '2025-10-27T14:20:00',
    content: 'What are the benefits of using semantic HTML tags like <article>, <section>, and <nav>?',
    likes: 8,
    comments: [
      {
        id: 3,
        author: 'Admin User',
        authorId: 1,
        timestamp: '2025-10-27T15:00:00',
        content: 'Semantic tags improve accessibility, SEO, and code readability. They give meaning to the structure of your content.',
        likes: 6
      }
    ]
  },
  {
    id: 3,
    courseId: 102,
    title: 'NumPy vs Pandas - When to use which?',
    author: 'Data Enthusiast',
    authorId: 6,
    timestamp: '2025-10-26T09:00:00',
    content: 'Can someone clarify when to use NumPy arrays vs Pandas DataFrames?',
    likes: 12,
    comments: [
      {
        id: 4,
        author: 'Prof. John Doe',
        authorId: 7,
        timestamp: '2025-10-26T10:30:00',
        content: 'Use NumPy for numerical computations and multi-dimensional arrays. Use Pandas when working with tabular data, time series, or need data manipulation features.',
        likes: 10
      },
      {
        id: 5,
        author: 'Python Expert',
        authorId: 8,
        timestamp: '2025-10-26T11:00:00',
        content: 'Pandas is built on top of NumPy, so it\'s great for data analysis. NumPy is faster for pure numerical operations.',
        likes: 7
      }
    ]
  }
];

export const mockEnrollments = [
  {
    userId: 2,
    courseId: 101,
    enrolledDate: '2025-10-01',
    progress: 65,
    completedModules: [1, 2]
  },
  {
    userId: 2,
    courseId: 102,
    enrolledDate: '2025-10-15',
    progress: 30,
    completedModules: [4]
  }
];

export const mockAnalytics = {
  totalUsers: 3420,
  totalCourses: 45,
  activeQuizzes: 120,
  totalEnrollments: 8950,
  monthlyEngagement: [
    { month: 'Jan', enrollments: 420, completions: 180 },
    { month: 'Feb', enrollments: 580, completions: 240 },
    { month: 'Mar', enrollments: 720, completions: 310 },
    { month: 'Apr', enrollments: 650, completions: 280 },
    { month: 'May', enrollments: 890, completions: 390 },
    { month: 'Jun', enrollments: 1020, completions: 450 }
  ],
  topCourses: [
    { title: 'Digital Marketing', enrollments: 2100 },
    { title: 'Web Development', enrollments: 1250 },
    { title: 'Data Science', enrollments: 980 }
  ]
};