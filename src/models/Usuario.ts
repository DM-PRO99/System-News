import { Schema, model, models, type Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUsuario extends Document {
  email: string;
  password: string;
  nombre: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UsuarioSchema = new Schema<IUsuario>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password antes de guardar
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

export const Usuario = models.Usuario || model<IUsuario>("Usuario", UsuarioSchema);

