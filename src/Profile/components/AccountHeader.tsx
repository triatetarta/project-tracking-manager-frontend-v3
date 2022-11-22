import { ChangeEvent, useEffect, useState } from "react";
import Avatar from "../../Avatar/components/Avatar";
import { CameraIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import {
  useGetUsersQuery,
  useUploadImageMutation,
} from "../../Auth/features/usersApiSlice";

const AccountHeader = () => {
  const [uploadImage, { isSuccess }] = useUploadImageMutation();
  const { name, id } = useAuth();
  const { user, refetch } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });
  const [image, setImage] = useState<string | null>(null);

  const onUpload = async () => {
    await uploadImage({ id, image });
  };

  useEffect(() => {
    if (!image) return;

    onUpload();
  }, [image]);

  useEffect(() => {
    if (!isSuccess) return;

    refetch();
  }, [isSuccess]);

  const previewFile = (file: File | Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result as string);
    };
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]!;

    previewFile(file);
  };

  return (
    <header className='h-32 md:h-48 w-full bg-gradient-to-l from-amber-600 to-amber-300'>
      <div className='container mx-auto relative h-full '>
        <div className={`absolute -bottom-8 left-0 group h-28 w-28`}>
          <div className='relative h-28 w-28 overflow-hidden'>
            <Avatar
              image={user?.image}
              name={name}
              classNames='h-28 w-28 absolute'
              spanClasses='text-4xl'
            />

            <>
              {image && (
                <img
                  src={image}
                  alt='preview avatar'
                  className='w-28 h-28 absolute rounded-full z-50 text-6xl'
                />
              )}
            </>

            <motion.form
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className='bg-black/40 h-28 w-28 flex items-center justify-center rounded-full z-50 absolute '
            >
              <label
                htmlFor='fileInput'
                className='h-20 w-20 inline-flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              >
                <CameraIcon className='h-8 w-8 text-white' />
              </label>
              <input
                type='file'
                id='fileInput'
                hidden
                onChange={(e) => handleChange(e)}
              />
            </motion.form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AccountHeader;
