import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../../appwrite/conf";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (file) service.deleteFile(post.featuredImage);

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        data.featuredImage = file.$id;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title")
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col lg:flex-row gap-6 bg-gray-50 p-6 rounded-xl"
    >
      {/* Left Section */}
      <div className="w-full lg:w-2/3 space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Input
            label="Title"
            placeholder="Enter post title"
            {...register("title")}
          />
          <Input
            label="Slug"
            placeholder="Slug auto-generated"
            {...register("slug")}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value))
            }
          />
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
          <Input
            label="Featured Image"
            type="file"
            {...register("image", { required: !post })}
          />
          {post && (
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg shadow-md"
            />
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            {...register("status")}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:opacity-90"
          >
            {post ? "Update Post" : "Submit Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
