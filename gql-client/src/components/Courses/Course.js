import React from 'react';

const Course = ({ course: { title, author, description, topic } }) => {
  return (
    <div>
      {title}
    </div>
  );
};

Course.propTypes = {
  
};

export default Course;