import Compared from "./compared/route";
import HTML from "./html/route";
import JSON from "./json/route";
import URL from "./url/route";

export default [
	{
		path: "text",
		meta: { title: "" },
		children: [...URL, ...HTML, ...JSON, ...Compared],
	},
];
