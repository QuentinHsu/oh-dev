import URL from "./url/route";
export default [
  {
    path: "text",
    meta: { title: "" },
    children: [...URL],
  },
];
