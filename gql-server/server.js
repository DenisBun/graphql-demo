var express = require('express');
var express_graphql = require('express-graphql');
var cors = require('cors');
var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type Mutation {
        removeCourse(id: Int!): [Course]
    },

    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JS: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

// reslovers
var getCourse = function(args) { 
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
};

var getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
};

var removeCourse = function(args) {
    if (args.id) {
        var id = args.id;
        var filteredData = coursesData.filter(course => course.id !== id);
        coursesData = filteredData;
        return coursesData;
    } else {
        return coursesData;
    }
}

var root = {
    course: getCourse,
    courses: getCourses,
    removeCourse: removeCourse,
};

// Create an express server and a GraphQL endpoint
var app = express();

app.use(cors());

app.use('/graphql', express_graphql({
    // The GraphQL schema which should be attached to the specific endpoint
    schema: schema,
    // The root resolver object
    rootValue: root,
    // Must be set to true to enable the GraphiQL tool when accessing the endpoint in the browser
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));