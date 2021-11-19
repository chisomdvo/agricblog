export default {
    addPost(state, payload) {
      state.posts.push(payload);
    },
    deletePost(state, payload) {
      const deletedpost =state.posts.findIndex( post => post.postid=== payload)
      state.posts.splice(deletedpost,1)
    },
    updatePost(state, payload) {
      state.posts.push(payload);
    },
    setPosts(state, payload) {
        state.posts = payload;
      },
  };