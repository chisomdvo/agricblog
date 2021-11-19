<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div class="max-w-5xl w-full space-y-8">
       <div>
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          EDIT POST
        </h2>
        <div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
          <p class="text-xl text-gray-500">
            Post daily articles in your blog.
          </p>
        </div>
      </div>
       <div v-if="isLoading">
          <base-spinner></base-spinner>
       </div>
      <div v-else-if="!isLoading" class="border-t-2 pt-6 mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="submitForm">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-2"> 
                  <label for="title" class="block text-sm font-medium text-gray-700">Post Title</label>
                  <input type="text"  @blur="clearValidity('title')" name="title" id="title" v-model.trim="title.val" autocomplete="title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <p v-if="!title.isValid" class="text-base font-semibold text-red-600 hover:text-red-500">Post title must not be empty.</p>
                </div>
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">
                  Post Content
                </label>
                <div class="mt-1">
                  <textarea id="description" name="description" rows="10" @blur="clearValidity('description')"
                    v-model.trim="description.val" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Write your content" />
                   <p v-if="!description.isValid" class="text-base font-semibold text-red-600 hover:text-red-500">Post Content must not be empty.</p>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                SAVE POST
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      title: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      selectedPost: null,
      formIsValid: true,
       error: null,
      isLoading:false,
    };
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
        this.validatecontent();
    },
    handleError() {
      this.error = null;
      this.$router.replace('/blog');
    },
   
    validatecontent() {
      if(this.error==null){
       this.selectedPost= this.$store.getters['blogposts'].find(
          (post) => post.postid === this.id);
     this.title.val=this.selectedPost.title;
    this.description.val=this.selectedPost.description;}
    },

    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      
      this.formIsValid = true;
       if (this.title.val === '') {
        this.title.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
       this.validateForm();

    if (!this.formIsValid) {
     return;
      }

      const formData = {
        postid: this.selectedPost.postid,
         title: this.title.val,
        description:this.description.val,
        date: this.selectedPost.date,
        datetime:  this.selectedPost.datetime,
        imageUrl: this.selectedPost.imageUrl,
        readingTime:  this.selectedPost.readingTime,
        author: {
         name:  this.selectedPost.author.name,
        imageUrl: this.selectedPost.author.imageUrl },
      };

      this.$store.dispatch('updatePost', formData);
      this.$router.replace('/blog');
    },
  },
  created() {
       this.loadPosts();  
  },
};
</script>
