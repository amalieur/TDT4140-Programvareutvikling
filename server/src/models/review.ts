// Review' modell, med typene:
interface IReview {
	id: number;
	userId: number;
	stars: number;
	comment: string;
}

// Eksporterer IReview til bruk i andre filer.
export default IReview;
