'use client';

import {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Form from '@components/form'

export default function EditPrompt() {
   const [submitting, setSubmitting] = useState(false);
   const [post, setPost] = useState({prompt: '', tag: ''});
   const router = useRouter();
   const searchParams = useSearchParams();
   const promptID = searchParams.get('id');

   useEffect(() => {
      (async function() {
         const response = await fetch(`/api/prompt/${promptID}`);
         const data = await response.json();
         setPost({prompt: data.prompt, tag: data.tag});
      }());
   },[]);

   async function updatePrompt(e) {
      e.preventDefault();

      if(!promptID) return alert('Prompt ID not found');

      try {
         setSubmitting(true);
         const response = await fetch(`/api/prompt/${promptID}`, {
            method: 'PATCH',
            body: JSON.stringify({
               prompt: post.prompt,
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
         type='Edit'
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={updatePrompt}
      />
   )
}