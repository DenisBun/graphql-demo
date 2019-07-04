import React, { Fragment } from 'react';
import { Query } from "react-apollo";
import { Course, CourseFinder } from '.';
import { ALL_COURSES_QUERY } from '../../graphql/queries';

import './CoursesContainer.css';

const CoursesContainer = () => {
  return (
    <Fragment>
      <div className="CoursesContainer">
        <Query
          query={ALL_COURSES_QUERY}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <span role="img" aria-label=''>Loading... 🐱‍👤</span>;
            if (error) return <span role="img" aria-label=''> 🤔</span>;

            return data.courses.map(course => (
              <Course key={course.id} course={course} onDelete={refetch} />
            ));
          }}
        </Query>      
      </div>
      <CourseFinder />
    </Fragment>
  );
};

export default CoursesContainer;