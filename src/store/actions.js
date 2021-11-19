export default {
    async addPost(context, data) {
    const response = await fetch('https://vue-blog-51568-default-rtdb.firebaseio.com/blog.json',
        { method: 'POST',
          body: JSON.stringify(data)
        });
     const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

     context.commit('addPost',data);

    },

    async deletePost(context, data) {
      const postId =data;
      const response = await fetch(`https://vue-blog-51568-default-rtdb.firebaseio.com/blog/${postId}.json`,
          { method: 'DELETE',
            body: JSON.stringify(data)
          });
      const responseData = await response.json();
  
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }
  
       context.commit('deletePost',data);
  
      },

      async updatePost(context, data) {
       const postId =data.postid;
        
        const updateData = {
          postid:data.postid,
          title: data.title,
          description:data.description,
          date: data.date,
          datetime: data.datatime,
          imageUrl:data.imageUrl,
          readingTime: data.readingTime,
          author: { name: data.author.name, imageUrl:data.author.imageUrl },
        };
        const response = await fetch(`https://vue-blog-51568-default-rtdb.firebaseio.com/blog/${postId}.json`,
            { method: 'PUT',
              body: JSON.stringify(updateData)
            });
         const responseData = await response.json();
    
        if (!response.ok) {
          const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
    
         context.commit('deletePost',data);
         context.commit('updatePost',updateData);
    
        }, 

    async loadPosts(context) {
        const response = await fetch(
            `https://vue-blog-51568-default-rtdb.firebaseio.com/blog.json`
          );
          const responseData = await response.json();
      
          if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
          }
      
          const blogposts = [];
      
          for (const key in responseData) {
            const allposts = {
              postid: key,
              title: responseData[key].title,
              description:responseData[key].description,
              date: responseData[key].date,
              datetime: responseData[key].datatime,
              imageUrl:responseData[key].imageUrl,
              readingTime: responseData[key].readingTime,
              author: { name: responseData[key].author.name, imageUrl:responseData[key].author.imageUrl },
            };
            blogposts.push(allposts);
          }
      
          context.commit('setPosts', blogposts);
        },

  };
  