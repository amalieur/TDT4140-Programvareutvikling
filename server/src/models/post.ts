// Post modell, med typene:
interface IPost {
	title: string;
	description: string;
	timestamp: number;
	owner: string;
	category: string;
	imageUrl: string;
}

// Eksporterer IPost til bruk i andre filer.
export default IPost;
