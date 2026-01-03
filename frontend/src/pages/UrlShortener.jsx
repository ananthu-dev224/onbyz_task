import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import {
  createShortUrl,
  getUrlAnalytics,
} from "../services/urlService";

const urlSchema = z.object({
  url: z
    .string()
    .url("Enter a valid URL")
    .nonempty("URL is required"),
});

export default function UrlShortener() {
  const [result, setResult] = useState(null);
  const [clickCount, setClickCount] = useState(null);
  const [loadingCount, setLoadingCount] = useState(false);

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
      const res = await createShortUrl(data.url);
      setResult(res);
      setClickCount(null);
      toast.success("Short URL generated");
      reset();
    } catch (err) {
      toast.error("Failed to generate short URL");
    }
  };

  const fetchClickCount = async () => {
    try {
      setLoadingCount(true);
      const analytics = await getUrlAnalytics(result.shortCode);
      setClickCount(analytics.clickCount);
    } catch (err) {
      toast.error("Failed to fetch click count");
    } finally {
      setLoadingCount(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-12 bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-center mb-6">
          URL Shortener
        </h2>

        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <input
            type="text"
            placeholder="Enter long URL"
            {...register("url")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.url && (
            <p className="text-xs text-red-500">
              {errors.url.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            {isSubmitting ? "Generating..." : "Generate"}
          </button>
        </form>

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg space-y-3">
            <div>
              <p className="text-sm text-gray-600">Short Link</p>
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium"
              >
                {result.shortUrl}
              </a>
            </div>

            <button
              onClick={fetchClickCount}
              disabled={loadingCount}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              {loadingCount ? "Fetching..." : "Get Click Count"}
            </button>

            {clickCount !== null && (
              <p className="text-sm text-gray-700">
                Click Count:{" "}
                <span className="font-semibold">{clickCount}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
