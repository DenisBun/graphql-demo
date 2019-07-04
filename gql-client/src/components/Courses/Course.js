import React from 'react';
import { Mutation } from "react-apollo";
import { DELETE_COURSE_QUERY } from '../../graphql/mutations';

import './Course.css';

const Course = ({ 
  course: { 
    id, title, author, description, topic
  },
  onDelete
 }) => {
  return (    
    <Mutation mutation={DELETE_COURSE_QUERY}>
      {(removeSingleCourse) => (
        <div className="Course">        
          <span 
            className="CourseDeleteBtn"
            aria-label=""
            role="img"
            onClick={() => {
              removeSingleCourse({ variables: {id} })
              onDelete()
            }}
            >
              ❌
          </span>
            <div>
              <span className="CourseSectionHeadline">Title:</span> {title}
            </div>
            <div>
              <span className="CourseSectionHeadline">Author:</span> { author }
            </div>
            <div>
              <span className="CourseSectionHeadline">Description:</span> { description }
            </div>
            <div>
              <span className="CourseSectionHeadline">Topic:</span> { topic }
            </div>
        </div>
      )}
    </Mutation>
  );
};

export default Course;