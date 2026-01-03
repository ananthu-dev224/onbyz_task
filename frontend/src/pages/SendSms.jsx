import { useEffect, useState } from "react";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { fetchTemplates, sendSms } from "../services/smsService";


const sendSmsSchema = z.object({
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^\+?[0-9]{10,15}$/, "Phone number must contain only digits"),
  templateId: z.string().nonempty("Please select a template"),
});

export default function SendSms() {
  const [templates, setTemplates] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(sendSmsSchema),
  });

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates();
        setTemplates(data);
      } catch {
        toast.error("Failed to load templates");
      }
    };

    loadTemplates();
  }, []);

  const send = async (data) => {
    try {
      await sendSms({
        phoneNumber: data.phone,
        templateId: data.templateId,
        variables: {
          name: "User",
          shortUrl: "http://example.com",
        },
      });
      toast.success("SMS Sent!");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send SMS");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Send SMS
        </h2>

        <form
          onSubmit={handleSubmit(send)}
          className="flex flex-col gap-4"
        >
          {/* Phone Number */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Template Select */}
          <div className="flex flex-col">
            <select
              {...register("templateId")}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.templateId ? "border-red-500 focus:ring-red-200" : "border-gray-300"
              }`}
            >
              <option value="">Select Template</option>
              {templates.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.templateId && (
              <p className="text-xs text-red-500 mt-1">{errors.templateId.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send SMS"}
          </button>
        </form>
      </div>
    </div>
  );
}
