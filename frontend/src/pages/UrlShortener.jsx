import { useState } from "react";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { createShortUrl } from "../services/urlService";

const urlSchema = z.object({
  url: z
    .string()
    .url("Enter a valid URL (e.g., https://example.com)")
    .nonempty("URL is required"),
});

export default function UrlShortener() {
  const [result, setResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(urlSchema),
  });

  const create = async (data) => {
    try {
      const result = await createShortUrl(data.url);
      setResult(result);
      toast.success("Short URL generated!");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create short URL");
    }
  };

  const copyToClipboard = () => {
    if (result?.shortUrl) {
      navigator.clipboard.writeText(result.shortUrl);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 pt-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          URL Shortener
        </h2>

        <form onSubmit={handleSubmit(create)} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Enter your long URL"
              {...register("url")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.url
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
            />
            {errors.url && (
              <p className="text-xs text-red-500 mt-1">{errors.url.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Generating..." : "Generate"}
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Short URL:</p>
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                {result.shortUrl}
              </a>
            </div>
            <button
              onClick={copyToClipboard}
              className="ml-4 px-3 py-1 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
