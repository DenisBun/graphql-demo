import { gql } from "apollo-boost";

export const ALL_COURSES_QUERY = gql`
  {
    courses {
      id
      title
      author
      description
      topic
    }
  }
`;

export const COURSE_BY_TOPIC_QUERY = gql`
  query getSingleCourse($topic: String) {
      courses(topic: $topic) {
        id
        title
        author
        description
        topic
      }
  }
`;