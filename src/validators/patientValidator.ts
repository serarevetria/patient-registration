import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is not valid"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  photo: z
    .string()
    .regex(
      /^data:image\/[a-zA-Z]+;base64,/,
      "Image must be a valid Base64 string"
    ),
});
