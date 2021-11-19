<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="relative bg-gray-50 pt-4 pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="relative max-w-7xl mx-auto">
      <div class="">
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          AGRIC BLOG
        </h2>
        <div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
          <p class="text-xl text-gray-500">
            Post daily articles in your blog.
          </p>
          <form class="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
            <div class="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
              <router-link to="/newpost" class="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex">
                CREATE POST
              </router-link>
            </div>
          </form>
        </div>
      </div>
       <div v-if="isLoading">
          <base-spinner></base-spinner>
       </div>
      <div v-else-if="hasposts" class="border-t-2 pt-6 mt-8 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        <div v-for="post in blogposts" :key="post.title" class="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div class="flex-shrink-0">
            <img class="h-48 w-full object-cover" :src="post.imageUrl" alt="" />
          </div>
          <div class="flex-1 bg-white p-6 flex flex-col justify-between">
            <div class="flex-1">
              <a class="block mt-2">
                <p class="text-xl font-semibold text-gray-900">
                  {{ post.title }}
                </p>
                <p class="mt-3 text-base text-gray-500">
                  {{ shortdescription(post.description) }}
                  <span class="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                    <router-link  :to="blogcontent(post.postid)">
                    Read full story
                    </router-link>
                 </span>
                </p>
                 <div class="pt-2 flex justify-between">
                  <span class="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                    <router-link  :to="updatepost(post.postid)">
                    Edit Post
                    </router-link>
                 </span>
                  <button @click="deletepost(post.postid)" class="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                  Delete Post
                 </button>
                 </div>

              </a>
            </div>
            <div class="mt-6 flex items-center">
              <div class="flex-shrink-0">
                <a :href="post.author.href">
                  <span class="sr-only">{{ post.author.name }}</span>
                  <img class="h-10 w-10 rounded-full" :src="post.author.imageUrl" alt="" />
                </a>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">
                  <a :href="post.author.href" class="hover:underline">
                    {{ post.author.name }}
                  </a>
                </p>
                <div class="flex space-x-1 text-sm text-gray-500">
                  <time :datetime="post.datetime">
                    {{ post.date }}
                  </time>
                  <span aria-hidden="true">
                    &middot;
                  </span>
                  <span> {{ post.readingTime }} read </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoading:false,
      
      error: null,
       posts : [],
    }
  },
  
  created() {
    this.loadPosts();
  },
  methods: {
    async loadPosts() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadPosts');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    deletepost(data){
      this.$store.dispatch('deletePost', data);
    },
    updatepost(data){
      return this.$route.path + '/' + data + '/editpost'; 
    },
    
    blogcontent(data){
      return this.$route.path + '/' + data; 
    },
    shortdescription(data){
      return data.substring(0,200);
    },

  },
  
  computed: {
    blogposts() {
      return this.$store.getters['blogposts'];
    },    
    hasposts() {
      return !this.isLoading &&this.$store.getters['hasblogposts'];
    },
  },
}
</script>