import { useEffect, useState } from "react";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import {
  fetchTemplates,
  createSmsTemplate,
} from "../services/smsService";


const templateSchema = z.object({
  name: z.string().min(2, "Template name must be at least 2 characters"),
  content: z.string().min(5, "Content must be at least 5 characters"),
});

export default function SmsTemplates() {
  const [templates, setTemplates] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(templateSchema),
  });

  const load = async () => {
    try {
      const data = await fetchTemplates();
      setTemplates(data);
    } catch (err) {
      toast.error("Failed to load templates");
    }
  };

  const create = async (data) => {
    try {
      await createSmsTemplate(data);
      toast.success("Template created!");
      reset();
      load();
    } catch (err) {
      toast.error("Failed to create template");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          SMS Templates
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit(create)}
          className="flex flex-col md:flex-row md:items-start md:space-x-4 gap-4 mb-6"
        >
          <div className="flex-1 flex flex-col">
            <input
              type="text"
              placeholder="Template Name"
              {...register("name")}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex-2 flex flex-col">
            <input
              type="text"
              placeholder="Template Content"
              {...register("content")}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.content ? "border-red-500 focus:ring-red-200" : "border-gray-300"
              }`}
            />
            {errors.content && (
              <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </form>

        {/* Template List */}
        <div className="grid md:grid-cols-2 gap-4">
          {templates.map((t) => (
            <div
              key={t._id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-800">{t.name}</p>
              <p className="text-gray-600 mt-1">{t.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
