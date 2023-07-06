'use client';

import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Profile from '@components/profile';

export default function ProfilePage() {
   //   Return value of useSession() hook:
   //
   //    {
   //       "data": {
   //           "user": {
   //               "name": "first second",
   //               "email": "myemail@gmail.com",
   //               "image": "https://lh3.googleusercontent.com/...",
   //               "id": "SOMEIDTOKEN"
   //           },
   //           "expires": "YYYY-MM-DDTHH:MM:SS"
   //       },
   //       "status": "[un]authenticated"
   //   }
   const {data: session, status} = useSession();
   const [posts, setPosts] = useState([]);
   const router = useRouter();

   function handleEdit(post) {
      router.push(`/update-prompt?id=${post._id}`);
   }

   async function handleDelete(post) {
      const hasConfirmed = confirm(
         'Are you sure you want to delete this prompt?'
      );
      if(hasConfirmed) {
         try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
               method: 'DELETE',
            });
         } catch (error) {
            console.log(error);
         }
         setPosts(posts.filter(item => item._id !== post._id));
      }
   }

   useEffect(() => {
      async function fetchPosts() {
         const response = await fetch(`/api/users/${session.user.id}/posts`);
         const data = await response.json();
         setPosts(data);
      }
      status === 'authenticated' && fetchPosts();
   }, [status]);

   return (
      <Profile
         name='My'
         desc='Welcome to your personalized profile page'
         data={posts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
      />
   )
}