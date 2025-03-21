import { REG_EXP_URL } from "@/constants/regex";

export function parseURL(url: string): {
	raw: string;
	status: string;
	params: Record<string, string>;
	fullPath: string;
} {
	if (!REG_EXP_URL.isHttpURL.test(url)) {
		return { fullPath: "", params: {}, status: "error", raw: url };
	}

	const fullPath = url.split("?")[0] || "";
	const queryString = url.split("?")[1] || "";
	const equalsCount = queryString.split("=").length - 1;
	let paramsArr: string[] = [];
	switch (equalsCount) {
		case 0: {
			paramsArr = [`${queryString}=`];
			break;
		}
		case 1: {
			paramsArr = [queryString];
			break;
		}
		default: {
			if (equalsCount > 1) {
				paramsArr = queryString.split("&");
			}
			break;
		}
	}
	const paramsObj = paramsArr.reduce(
		(obj: Record<string, string>, param: string) => {
			const [key, value] = param.split("=");
			obj[key] = decodeURIComponent(value);

			return obj;
		},
		{},
	);

	return {
		fullPath,
		params: paramsObj,
		status: "success",
		raw: url,
	};
}
export function onDecodeURL(content: string): string {
	let decode = decodeURIComponent(content);
	while (decode !== content) {
		content = decode;
		decode = decodeURIComponent(content);
	}

	return decode;
}
