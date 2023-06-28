'use client';

import {useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Form from '@components/form'

export default function CreatePrompt() {
   const [submitting, setSubmitting] = useState(false);
   const [post, setPost] = useState({prompt: '', tag: ''});
   const router = useRouter();
   const {data: session} = useSession();

   async function createPrompt(e) {
      e.preventDefault();

      try {
         setSubmitting(true);
         const response = await fetch('/api/prompt/new', {
            method: 'POST',
            body: JSON.stringify({
               prompt: post.prompt,
               userID: session.user.id,
               tag: post.tag
            })
         });
         if (response.ok) {
            router.push('/');
         }
      } catch (error) {
         console.log(error);
      } finally {
         setSubmitting(false);
      }
   }

   return (
      <Form
         type='Create'
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={createPrompt}
      />
   )
}