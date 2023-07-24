import { zodResolver } from '@hookform/resolvers/zod';
import type { ActionArgs } from "@remix-run/node";
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';
import { z } from 'zod';

const schema = z.object({
  content: z.string().nonempty('content is required')
});

type FormData = z.infer<typeof schema>;

const resolver = zodResolver(schema);

export const action = async ({ request }: ActionArgs) => {
  const { data } =
    await getValidatedFormData<FormData>(request, resolver);

  // Make DB call or similar here.

  return { result: 'success', transformed: `This was your content: ${JSON.stringify(data)}` }
};


export default function Index() {
  const { register, handleSubmit, formState } =
  useRemixForm<FormData>({
    resolver
  });
  
  return (
    <div>
      <p>Add a thing...</p>
      <p>Current Errors: { JSON.stringify(formState.errors) }</p>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            Content: <input type="text" {...register('content')} />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

