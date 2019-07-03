import React, { useState } from 'react';
import client from '../../graphql/client';
import { ALL_COURSES_QUERY, COURSE_BY_TOPIC_QUERY } from '../../graphql/queries';

const COURSES_TOPICS = [
  'Node.js',
  'JavaScript',
];

const CourseFinder = () => {

  const [courseTopicValue, setCourseTopicValue] = useState('Node.js');

  const handleChange = e => {
    setCourseTopicValue(e.target.value);
  }
  
  // this is just for a testing purpose in order to show that GraphQL prevents over-fetching
  const handleTestSearch = () => {
    client
      .query({
        query: ALL_COURSES_QUERY
      })
      .then(result => console.log(result));
  };

  const handleCourseSearch = () => {
    client
      .query({
        query: COURSE_BY_TOPIC_QUERY,
        variables: {topic: courseTopicValue},
      })
      .then(result => console.log(result));
  }

  return (
    <div>
      <select onChange={handleChange}>
        {COURSES_TOPICS.map(topic => (
          <option key={topic} value={topic}>{topic}</option> 
        ))}
      </select>
      <button onClick={handleCourseSearch}>Fetch the detailed info</button>
      {/* Try to click this button multiple times and see the devTools network tab ✨ */}
      <button onClick={handleTestSearch}>Test fetch for all courses</button>
    </div>
  );
};


export default CourseFinder;