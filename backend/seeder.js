const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');
const Quiz = require('./models/Quiz');
const Discussion = require('./models/Discussion');

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillnest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@elearn.com',
    password: 'admin123',
    role: 'Admin'
  },
  {
    name: 'Student1',
    email: 'learner@elearn.com',
    password: 'learner123',
    role: 'Learner'
  }
];

const courses = [
  {
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
        title: 'Introduction to HTML',
        description: 'Learn HTML basics and structure',
        materials: [
          { type: 'pdf', title: 'HTML Fundamentals.pdf', url: '/sample.pdf' },
          { type: 'video', title: 'HTML Introduction', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '15:30' }
        ]
      },
      {
        title: 'CSS Styling',
        description: 'Master CSS styling and layouts',
        materials: [
          { type: 'pdf', title: 'CSS Guide.pdf', url: '/sample.pdf' },
          { type: 'video', title: 'CSS Basics', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '20:15' }
        ]
      },
      {
        title: 'JavaScript Essentials',
        description: 'Introduction to JavaScript programming',
        materials: [
          { type: 'pdf', title: 'JavaScript Primer.pdf', url: '/sample.pdf' },
          { type: 'video', title: 'JS Fundamentals', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '25:45' }
        ]
      }
    ]
  },
  {
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
        title: 'Python Basics',
        description: 'Introduction to Python programming',
        materials: [
          { type: 'pdf', title: 'Python Basics.pdf', url: '/sample.pdf' },
          { type: 'video', title: 'Python Introduction', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '18:20' }
        ]
      },
      {
        title: 'Data Analysis with Pandas',
        description: 'Learn data manipulation with pandas',
        materials: [
          { type: 'pdf', title: 'Pandas Guide.pdf', url: '/sample.pdf' },
          { type: 'video', title: 'Pandas Tutorial', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '30:10' }
        ]
      }
    ]
  },
  {
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
        title: 'SEO Fundamentals',
        description: 'Learn search engine optimization',
        materials: [
          { type: 'pdf', title: 'SEO Guide.pdf', url: '/sample.pdf' },
          { type: 'video', title: 'SEO Basics', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '22:30' }
        ]
      }
    ]
  }
];

const quizzes = [
  {
    courseId: null, // Will be populated after courses are created
    title: 'HTML Basics Quiz',
    description: 'Test your knowledge of HTML fundamentals',
    duration: 30,
    totalQuestions: 10,
    passingScore: 70,
    questions: [
      {
        type: 'mcq',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language'
        ],
        correctAnswer: 0
      },
      {
        type: 'mcq',
        question: 'Which HTML tag is used for the largest heading?',
        options: ['<head>', '<h6>', '<heading>', '<h1>'],
        correctAnswer: 3
      },
      {
        type: 'true-false',
        question: 'HTML is a programming language.',
        correctAnswer: false
      },
      {
        type: 'mcq',
        question: 'Which tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correctAnswer: 1
      },
      {
        type: 'short-answer',
        question: 'What is the purpose of the <div> tag in HTML?',
        correctAnswer: null
      },
      {
        type: 'mcq',
        question: 'Which attribute is used to provide alternative text for an image?',
        options: ['title', 'alt', 'src', 'text'],
        correctAnswer: 1
      },
      {
        type: 'true-false',
        question: 'CSS can be included directly in HTML files.',
        correctAnswer: true
      },
      {
        type: 'mcq',
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<break>', '<lb>', '<br>', '<newline>'],
        correctAnswer: 2
      },
      {
        type: 'short-answer',
        question: 'Explain the difference between <div> and <span> tags.',
        correctAnswer: null
      },
      {
        type: 'mcq',
        question: 'Which HTML tag is used to define an unordered list?',
        options: ['<ol>', '<ul>', '<list>', '<li>'],
        correctAnswer: 1
      }
    ]
  },
  {
    courseId: null, // Will be populated after courses are created
    title: 'Python Fundamentals Quiz',
    description: 'Test your Python programming skills',
    duration: 45,
    totalQuestions: 8,
    passingScore: 75,
    questions: [
      {
        type: 'mcq',
        question: 'Which of the following is the correct way to declare a variable in Python?',
        options: ['var x = 5', 'int x = 5', 'x = 5', 'declare x = 5'],
        correctAnswer: 2
      },
      {
        type: 'true-false',
        question: 'Python is a statically typed language.',
        correctAnswer: false
      },
      {
        type: 'mcq',
        question: 'What is the output of: print(type([]))?',
        options: ['<class \'array\'>', '<class \'list\'>', '<class \'tuple\'>', '<class \'dict\'>'],
        correctAnswer: 1
      },
      {
        type: 'short-answer',
        question: 'Explain the difference between a list and a tuple in Python.',
        correctAnswer: null
      },
      {
        type: 'mcq',
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1
      },
      {
        type: 'true-false',
        question: 'Python uses indentation to define code blocks.',
        correctAnswer: true
      },
      {
        type: 'mcq',
        question: 'What does the len() function do?',
        options: ['Returns the length of an object', 'Deletes an object', 'Creates a list', 'Sorts a list'],
        correctAnswer: 0
      },
      {
        type: 'short-answer',
        question: 'What is a dictionary in Python and when would you use it?',
        correctAnswer: null
      }
    ]
  }
];

const discussions = [
  {
    courseId: null, // Will be populated after courses are created
    title: 'Help with CSS Flexbox',
    author: 'Student1',
    authorId: null, // Will be populated after users are created
    content: 'I\'m having trouble understanding how to center items using flexbox. Can someone explain?',
    likes: 5,
    comments: [
      {
        author: 'John Developer',
        authorId: null, // Will be populated after users are created
        content: 'Use justify-content: center and align-items: center on the parent container.',
        likes: 3
      },
      {
        author: 'Sarah Designer',
        authorId: null, // Will be populated after users are created
        content: 'Also make sure to set display: flex on the parent element first!',
        likes: 2
      }
    ]
  },
  {
    courseId: null, // Will be populated after courses are created
    title: 'Best practices for HTML semantic tags',
    author: 'Mike Johnson',
    authorId: null, // Will be populated after users are created
    content: 'What are the benefits of using semantic HTML tags like <article>, <section>, and <nav>?',
    likes: 8,
    comments: [
      {
        author: 'Admin User',
        authorId: null, // Will be populated after users are created
        content: 'Semantic tags improve accessibility, SEO, and code readability. They give meaning to the structure of your content.',
        likes: 6
      }
    ]
  },
  {
    courseId: null, // Will be populated after courses are created
    title: 'NumPy vs Pandas - When to use which?',
    author: 'Data Enthusiast',
    authorId: null, // Will be populated after users are created
    content: 'Can someone clarify when to use NumPy arrays vs Pandas DataFrames?',
    likes: 12,
    comments: [
      {
        author: 'Prof. John Doe',
        authorId: null, // Will be populated after users are created
        content: 'Use NumPy for numerical computations and multi-dimensional arrays. Use Pandas when working with tabular data, time series, or need data manipulation features.',
        likes: 10
      },
      {
        author: 'Python Expert',
        authorId: null, // Will be populated after users are created
        content: 'Pandas is built on top of NumPy, so it\'s great for data analysis. NumPy is faster for pure numerical operations.',
        likes: 7
      }
    ]
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Quiz.deleteMany();
    await Discussion.deleteMany();
    
    // Import users
    const createdUsers = await User.insertMany(users);
    console.log('Users imported successfully');
    
    // Import courses
    const createdCourses = await Course.insertMany(courses);
    console.log('Courses imported successfully');
    
    // Update quizzes with course IDs
    quizzes[0].courseId = createdCourses[0]._id;
    quizzes[1].courseId = createdCourses[1]._id;
    
    // Import quizzes
    const createdQuizzes = await Quiz.insertMany(quizzes);
    console.log('Quizzes imported successfully');
    
    // Update discussions with course IDs and user IDs
    discussions[0].courseId = createdCourses[0]._id;
    discussions[0].authorId = createdUsers[1]._id; // Student1
    discussions[0].comments[0].authorId = createdUsers[0]._id; // Admin User
    discussions[0].comments[1].authorId = createdUsers[0]._id; // Admin User
    
    discussions[1].courseId = createdCourses[0]._id;
    discussions[1].authorId = createdUsers[0]._id; // Admin User
    discussions[1].comments[0].authorId = createdUsers[0]._id; // Admin User
    
    discussions[2].courseId = createdCourses[1]._id;
    discussions[2].authorId = createdUsers[1]._id; // Student1
    discussions[2].comments[0].authorId = createdUsers[0]._id; // Admin User
    discussions[2].comments[1].authorId = createdUsers[0]._id; // Admin User
    
    // Import discussions
    await Discussion.insertMany(discussions);
    console.log('Discussions imported successfully');
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();
    await Quiz.deleteMany();
    await Discussion.deleteMany();
    
    console.log('Data deleted successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}