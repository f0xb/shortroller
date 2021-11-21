const ogtagstemplate = (tags) => {
	return `
		<!DOCTYPE html>
		<html prefix="og: https://ogp.me/ns#">
			<head>
				${tags.ogTitle ? `<title>${tags.ogTitle}</title>` : ""}

				${tags.ogUrl ? `<meta http-equiv = "refresh" content = "0; url=${tags.ogUrl}" />` : ""}
				${tags.ogTitle ? `<meta property="og:title" content="${tags.ogTitle}" />` : ""}
				<meta property="og:type" content="${tags.ogType || "website"}" />
				${tags.ogUrl ? `<meta property="og:url" content="${tags.ogUrl}" />` : ""}
				${
					tags.ogImage
						? `<meta property="og:image" content="${
								typeof tags.ogImage !== "string" ? tags.ogImage.url : tags.ogImage
						  }" />`
						: ""
				}
				${tags.ogDescription ? `<meta property="og:description" content="${tags.ogDescription}" />` : ""}
			</head>
		</html>
	`;
};

export default ogtagstemplate;
