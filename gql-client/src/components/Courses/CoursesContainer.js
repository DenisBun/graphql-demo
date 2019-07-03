import React, { Fragment } from 'react';
import { Query } from "react-apollo";
import { Course, CourseFinder } from '.';
import { ALL_COURSES_QUERY } from '../../graphql/queries';

const CoursesContainer = () => {
  return (
    <Fragment>
      <Query
        query={ALL_COURSES_QUERY}
      >
        {({ loading, error, data }) => {
          if (loading) return <span role="img" aria-label=''>Loading... 🐱‍👤</span>;
          if (error) return <span role="img" aria-label=''> 🤔</span>;

          return data.courses.map(course => (
            <Course key={course.id} course={course} />
          ));
        }}
      </Query>
      <CourseFinder />
    </Fragment>
  );
};

export default CoursesContainer;