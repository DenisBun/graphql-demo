import { gql } from "apollo-boost";

export const DELETE_COURSE_QUERY = gql`
  mutation removeSingleCourse($id: Int!) {
    removeCourse(id: $id) {
      id
      title
      author
      description
      topic
      url
    }
  }
`;