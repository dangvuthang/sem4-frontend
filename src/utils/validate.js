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

  return "";
};
