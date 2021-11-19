export default {
    blogposts(state) {
      return state.posts;
    },
    hasblogposts(state) {
        return state.posts && state.posts.length > 0;
      }
  };