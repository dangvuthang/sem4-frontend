export default ({ id, value }) => {
  if (id === "email") {
    if (value === "") return "Email is required";
    if (!/[^@]+@[^.]+\..+/.test(value))
      return "Email is incorrect. Try again!!!";
  }
  if (id === "password") {
    if (value === "") return "Password is required";
    if (value.length < 6) return "Password must contain at least 6 characters";
  }
  if (id === "name") {
    if (value === "") return "Name is required";
  }
  if (id === "phone") {
    if (value === "") return "Phone is required";
    if (!Number(value)) return "Phone must contain only digit";
    if (value.length < 9) return "Phone must contain at least 9 digits";
  }
  if (id === "oldPassword") {
    if (value === "") return "Old Password is required";
    if (value.length < 6)
      return "Old Password must contain at least 6 characters";
  }
  if (id === "newPassword") {
    if (value === "") return "New Password is required";
    if (value.length < 6)
      return "New Password must contain at least 6 characters";
  }
  if (id === "passwordConfirm") {
    if (value === "") return "Confirm Password is required";
    if (value.length < 6) return "Make sure your password matches";
  }
  if (id === "description") {
    if (value === "") return "Description is required";
    if (value.length < 6)
      return "Description must contain at least 6 characters";
  }
  return "";
};
