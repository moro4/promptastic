import {connectToDB} from '@utils/database';
import Prompt from '@models/prompt';

export async function GET(reg, {params: {id}}) {
   try {
      await connectToDB();
      const prompts = await Prompt.find({creator: id}).populate('creator');
      return new Response(JSON.stringify(prompts), {status: 200});
   } catch (error) {
      return new Response(
         JSON.stringify('Failed to fetch prompts', {status: 500})
      );
   }
}