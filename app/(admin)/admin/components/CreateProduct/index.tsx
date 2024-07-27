"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  image: z.string(),
  brand: z
    .string({
      required_error: "Brand is required",
    })
    .min(1),
  shortDesc: z.string(),
  longDesc: z.string(),
  price: z.number().positive(),
});
function CreateProduct() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      image: "",
      brand: "",
      shortDesc: "",
      longDesc: "",
      price: 0,
    },
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleUploadImage = (e: any) => {
    const file = e.target.files[0];
    TranformFile(file);
  };

  const TranformFile = (file: any) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        form.setValue("image", reader.result as string);
        setImagePreview(reader.result as string);
      };
    } else {
      form.setValue("image", "");
      setImagePreview("");
    }
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-row gap-x-3 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-[2_2_0%]"
        >
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/"
                    required
                    onChange={handleUploadImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="samsung">Samsung</SelectItem>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="xoami">Xoami</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortDesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longDesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Long description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="border border-gray-400 rounded-lg h-full flex-1">
        <div className="h-full flex justify-center items-center">
          {imagePreview ? (
            <>
              <img src={imagePreview} className="p-1" />
            </>
          ) : (
            <>image preview</>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
