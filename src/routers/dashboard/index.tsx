import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { InputForm } from '@/shared/components/form/InputForm';
import { SelectForm } from '@/shared/components/form/SelectForm';

const schema: ObjectSchema<FieldValues> = yup.object().shape({
   first_name: yup.string().required('First name is required.'),
   last_name: yup.string().required('Last name is required.'),
   phones: yup.array().of(
      yup.object({
         type: yup.string().required(),
         number: yup
            .string()
            .length(10, 'Phone number must be exactly 10 characters')
            .required(),
      }),
   ),
});

const phoneTypes = [
   { value: 'tax', label: 'Tax' },
   { value: 'tel', label: 'Tel' },
];

export default function Dashboard() {
   const { control, handleSubmit } = useForm({
      resolver: yupResolver(schema),
      shouldFocusError: true,
   });
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'phones',
   });

   const onSubmit = (data: any) => {
      console.log(data);
   };

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm
               control={control}
               name="first_name"
               placeholder="First name"
            />
            <InputForm
               control={control}
               name="last_name"
               placeholder="Last name"
            />
            <button
               type="button"
               onClick={() => append({ type: 'tel', number: '' })}
            >
               + Phone
            </button>
            {fields.map((field, index) => (
               <div key={field.id} className="flex items-center gap-2">
                  <SelectForm
                     control={control}
                     name={`phones.${index}.type`}
                     options={phoneTypes}
                  />
                  <InputForm
                     control={control}
                     name={`phones.${index}.number`}
                  />
                  <button type="button" onClick={() => remove(index)}>
                     -
                  </button>
               </div>
            ))}

            <button type="submit">Submit</button>
         </form>
      </div>
   );
}
