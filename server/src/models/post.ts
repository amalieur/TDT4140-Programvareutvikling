// Post modell, med typene:
interface IPost {
	title: string;
	description: string;
	price: string;
	timestamp: number;
	owner: string;
	categoryid: number;
	imageUrl: string;
}

// Eksporterer IPost til bruk i andre filer.
export default IPost;
