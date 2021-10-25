import { graphql } from "react-apollo";
import { compose } from "recompose";

import { moviesQuery } from "../MoviesTable/queries";
import { deleteMovieMutation } from "./mutations";

const withGraphqlDelete = graphql(deleteMovieMutation, {
  props: ({ mutate }) => ({
    deleteMovie: (id) =>
      mutate({
        variables: id,
        refetchQueries: [{ query: moviesQuery }],
      }),
  }),
});

export default compose(withGraphqlDelete);
