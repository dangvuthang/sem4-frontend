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
  return "";
};
