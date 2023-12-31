import {connectToDB} from '@utils/database';
import Prompt from '@models/prompt';

export async function GET(req, {params: {id}}) {
   try {
      await connectToDB();
      const prompt = await Prompt.findById(id).populate('creator');
      if(!prompt) return new Response('Prompt not found', {status: 404});
      return new Response(JSON.stringify(prompt), {status: 200});
   } catch (error) {
      return new Response(
         JSON.stringify(`Failed to fetch a prompts with the id ${id}`),
         {status: 500}
      );
   }
}

export async function PATCH(req, {params: {id}}) {
   const {prompt, tag} = await req.json();
   try {
      await connectToDB();
      const existingPrompt = await Prompt.findById(id);
      if(!existingPrompt) {
         return new Response('Prompt not found', {status: 404});
      }
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      await existingPrompt.save();

      return new Response(JSON.stringify(existingPrompt), {status: 200});

   } catch (error) {
      return new Response(
         JSON.stringify('Failed to update prompt'), {status: 500}
      );
   }
}

export async function DELETE(req, {params: {id}}) {
   try {
      await connectToDB();
      await Prompt.findByIdAndRemove(id);
      return new Response('Prompt deleted successfully', {status: 200});
   } catch (error) {
      return new Response(
         JSON.stringify('Failed to delete prompt'), {status: 500}
      );
   }
}