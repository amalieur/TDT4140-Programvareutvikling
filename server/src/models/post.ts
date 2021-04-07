// Post modell, med typene:
interface IPost {
	title: string;
	description: string;
	price: string;
	timestamp: number;
	owner: number;
	categoryid: number;
	imageUrl: string;
	status?: number;
}

// Eksporterer IPost til bruk i andre filer.
export default IPost;
