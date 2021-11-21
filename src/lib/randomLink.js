const trolls = ["https://www.youtube.com/watch?v=U05BDwOTGp0"];

const randomLink = () => {
	return trolls[Math.floor(Math.random() * trolls.length)];
};

export default randomLink;
